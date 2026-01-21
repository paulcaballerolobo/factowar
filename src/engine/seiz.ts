import type { PlayerControls, NewsParams, GameState } from './types';
import { LEVEL_CONFIG, SIMULATION_CONSTANTS } from '../config/GameConfig';
import { applyPhysics } from './nodePhysics';

// -------------------------------------------------------------
// 1. RESISTANCE MODEL (THE FILTER)
// -------------------------------------------------------------
interface RealValues {
    realEngagement: number;
    realControversy: number;
    realModeration: number;
    realPropagation: number;
}

export const calculateRealValues = (
    controls: PlayerControls,
    levelId: number,
    news: NewsParams,
    powerUps: GameState['powerUps']
): RealValues => {
    const level = LEVEL_CONFIG[levelId as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG[1];

    // Base Formula: Real = Floor + (Input * (1 - CRA))

    // Engagement (Speed)
    let eng = level.floor + (controls.engagement * (1 - level.cra));
    if (news.tags.curiosityGap) eng *= 1.3;
    // Friction PowerUp: Reduces Speed
    if (powerUps.friction.active && powerUps.friction.timeLeft > 0) {
        eng *= 0.3;
    }

    // Controversy (Infection Prob)
    let cont = level.floor + (controls.controversy * (1 - level.cra));
    if (news.tags.moralOutrage) cont *= 1.5;
    // Campaign PowerUp: Shield
    if (powerUps.campaign.active && powerUps.campaign.ready) {
        cont /= 5;
    }

    // Moderation (Cure Prob) - Resistance acts as a CAP/Ceiling here
    let mod = controls.moderation * level.cra;
    if (news.tags.emotionalAlert) mod *= 0.5;

    // Propagation (Radius)
    let prop = level.floor + (controls.propagation * (1 - level.cra));
    if (news.tags.kolImpact) prop *= 2.0;

    return {
        realEngagement: Math.min(eng, 1.0),
        realControversy: Math.min(cont, 1.0),
        realModeration: Math.min(mod, 1.0),
        realPropagation: Math.min(prop, 1.0)
    };
};


// -------------------------------------------------------------
// 3. SEIZ LOGIC ENGINE (EPIDEMIOLOGY)
// -------------------------------------------------------------
export const processTick = (
    currentState: GameState,
    controls: PlayerControls,
    levelId: number,
    news: NewsParams
): GameState => {
    const { nodes, time, powerUps } = currentState;
    const metrics = calculateRealValues(controls, levelId, news, powerUps);
    const { realEngagement, realControversy, realModeration, realPropagation } = metrics;

    // Physics Speed derived from Engagement
    const moveSpeed = (realEngagement * 2.0) + 0.2;

    // Influence Radius
    const baseRadius = SIMULATION_CONSTANTS.INFLUENCE_RADIUS_BASE;
    const radiusSq = (baseRadius * (1 + realPropagation)) ** 2;

    let newInfected = 0;
    let newExposed = 0;
    let newRecovered = 0;

    // Update PowerUps
    const nextPowerUps = { ...powerUps };

    // Campaign Progress (Takes time to load)
    if (nextPowerUps.campaign.active && !nextPowerUps.campaign.ready) {
        nextPowerUps.campaign.progress += 0.5; // Load speed
        if (nextPowerUps.campaign.progress >= 100) nextPowerUps.campaign.ready = true;
    }

    // Friction Timer (Lasts 5 seconds -> 150 ticks)
    if (nextPowerUps.friction.active && nextPowerUps.friction.timeLeft > 0) {
        nextPowerUps.friction.timeLeft--;
        if (nextPowerUps.friction.timeLeft <= 0) nextPowerUps.friction.active = false;
    }

    // Apply social dynamics physics (replaces simple kinematics)
    const nodesWithPhysics = applyPhysics(nodes, {
        polarization: currentState.stats.polarization,
        baseSpeed: moveSpeed
    });

    // We map to new array to avoid mutating previous state directly (React purity)
    const nextNodes = nodesWithPhysics.map(node => {
        const nextNode = { ...node };

        // --- B. SEIZ TRANSITIONS ---

        // Neighbor Check
        if (nextNode.state === 'S') {
            let infectedNeighbors = 0;

            for (const other of nodes) {
                if (other.id === nextNode.id) continue;
                if (other.state === 'I') {
                    const dx = nextNode.x - other.x;
                    const dy = nextNode.y - other.y;
                    if ((dx * dx + dy * dy) < radiusSq) {
                        infectedNeighbors++;
                    }
                }
            }

            if (infectedNeighbors > 0) {
                // Direct Infection (P)
                let pChance = realControversy * 0.05; // Base per tick
                if (news.tags.hotContent) pChance += 0.05;

                // Exposure (Beta)
                let betaChance = realEngagement * 0.02;

                // Roll
                const totalP = 1 - Math.pow(1 - pChance, infectedNeighbors);
                const totalBeta = 1 - Math.pow(1 - betaChance, infectedNeighbors);

                if (Math.random() < totalP) {
                    nextNode.state = 'I';
                    nextNode.infectionTime = time.ticks;
                } else if (Math.random() < totalBeta) {
                    nextNode.state = 'E';
                    nextNode.incubationTimer = 0;
                }
            }
        }
        else if (nextNode.state === 'E') {
            nextNode.incubationTimer++;
            // Incubation Period
            const incubationLimit = news.tags.hotContent ? 10 : 60; // Ticks
            const adjustedLimit = news.tags.curiosityGap ? incubationLimit * 1.5 : incubationLimit;

            if (nextNode.incubationTimer > adjustedLimit) {
                nextNode.state = 'I';
                nextNode.infectionTime = time.ticks;
            }
        }
        else if (nextNode.state === 'I') {
            // Possible transition to Z (Recovery)
            if (currentState.isFactChecked) {
                let cureChance = realModeration * 0.02;
                if (news.tags.emotionalAlert) cureChance *= 0.5;

                // Stubbornness effect could be added here

                if (Math.random() < cureChance) {
                    nextNode.state = 'Z';
                }
            }
        }

        // --- C. STATS UPDATE ---
        if (nextNode.state === 'I') newInfected++;
        else if (nextNode.state === 'E') newExposed++;
        else if (nextNode.state === 'Z') newRecovered++;

        return nextNode;
    });

    // --- 4. NETWORK HEALTH ---
    const damageScore = (realEngagement * 0.3) +
        (realControversy * 0.1) +
        ((1 - realModeration) * 0.2) +
        (realPropagation * 0.4);

    // Health starts at 100
    let currentHealth = 100 - (damageScore * 20) - (newInfected * 0.5);
    currentHealth = Math.max(0, Math.min(100, currentHealth));

    // Game Over Conditions
    let nextStatus = currentState.status;

    // Explosion
    if (newInfected > 90 && time.day < 5) nextStatus = 'DEFEAT';

    // Boredom (Total Disengagement)
    if (realEngagement < 0.05 && realPropagation < 0.05) {
        // Could add a timer for boredom, for now instant
        // nextStatus = 'DEFEAT'; // Disbled for now to be kind
    }

    // Time limit
    if (time.day >= SIMULATION_CONSTANTS.MAX_DAYS) {
        nextStatus = currentHealth > 50 ? 'VICTORY' : 'DEFEAT';
    }
    if (currentHealth <= 0) nextStatus = 'DEFEAT';

    // --- 5. DETAILED METRICS ---
    const totalNodes = SIMULATION_CONSTANTS.NODE_COUNT;
    const exposureVal = (newExposed / totalNodes) * 100;
    const impactVal = (newInfected / totalNodes) * 100;
    const skepticismVal = (newRecovered / totalNodes) * 100;

    // Polarization: Difference in infection levels between clusters + general tension
    const blueNodes = nextNodes.filter(n => n.type === 'blue');
    const fuchsiaNodes = nextNodes.filter(n => n.type === 'fuchsia');
    const blueInfected = blueNodes.filter(n => n.state === 'I').length;
    const fuchsiaInfected = fuchsiaNodes.filter(n => n.state === 'I').length;

    const bRatio = blueInfected / (blueNodes.length || 1);
    const fRatio = fuchsiaInfected / (fuchsiaNodes.length || 1);
    const polBase = Math.abs(bRatio - fRatio) * 100;
    const polarizationVal = Math.min(100, polBase + (newInfected * 0.2));

    const isNowChecked = time.day >= controls.delay;

    return {
        ...currentState,
        nodes: nextNodes,
        time: {
            ...time,
            ticks: time.ticks + 1,
            day: Math.floor(time.ticks / (SIMULATION_CONSTANTS.FRAME_RATE * SIMULATION_CONSTANTS.SECONDS_PER_DAY))
        },
        powerUps: nextPowerUps,
        stats: {
            health: currentHealth,
            infectedCount: newInfected,
            exposedCount: newExposed,
            recoveredCount: newRecovered,
            polarization: Math.floor(polarizationVal),
            impact: Math.floor(impactVal),
            exposure: Math.floor(exposureVal),
            skepticism: Math.floor(skepticismVal)
        },
        status: nextStatus,
        isFactChecked: isNowChecked
    };
};
