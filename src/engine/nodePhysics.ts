import type { Node } from './types';
import { SIMULATION_CONSTANTS } from '../config/GameConfig';

/**
 * Applies physics forces to nodes based on social dynamics:
 * - Brownian motion (base movement)
 * - Homofilia (same ideology attracts)
 * - Polarización (opposite ideologies repel when polarization is high)
 * - KOL gravity (leaders attract susceptible nodes)
 */

export interface PhysicsConfig {
    polarization: number; // 0-100
    baseSpeed: number; // General movement multiplier
}

const FORCE_CONSTANTS = {
    BROWNIAN_STRENGTH: 0.3,
    HOMOFILIA_STRENGTH: 0.015,
    POLARIZATION_THRESHOLD: 60,
    REPULSION_STRENGTH: 0.025,
    KOL_GRAVITY: 0.02,
    KOL_RANGE: 80,
    FRICTION: 0.98 // Velocity damping
};

export const applyPhysics = (nodes: Node[], config: PhysicsConfig): Node[] => {
    const { polarization, baseSpeed } = config;
    const isPolarized = polarization > FORCE_CONSTANTS.POLARIZATION_THRESHOLD;

    return nodes.map((node, i) => {
        let fx = 0;
        let fy = 0;

        // 1. Brownian Motion (Organic Float)
        fx += (Math.random() - 0.5) * FORCE_CONSTANTS.BROWNIAN_STRENGTH;
        fy += (Math.random() - 0.5) * FORCE_CONSTANTS.BROWNIAN_STRENGTH;

        // 2. Homofilia & Polarización
        nodes.forEach((other, j) => {
            if (i === j) return;

            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist < 1) return; // Avoid division by zero

            // Homofilia: Same ideology attracts
            if (node.type === other.type && node.type !== 'neutral') {
                const attractionForce = FORCE_CONSTANTS.HOMOFILIA_STRENGTH / dist;
                fx += (dx / dist) * attractionForce;
                fy += (dy / dist) * attractionForce;
            }

            // Polarización: Opposite ideologies repel
            if (isPolarized &&
                node.type !== 'neutral' &&
                other.type !== 'neutral' &&
                node.type !== other.type) {
                const repulsionForce = FORCE_CONSTANTS.REPULSION_STRENGTH / dist;
                fx -= (dx / dist) * repulsionForce;
                fy -= (dy / dist) * repulsionForce;
            }
        });

        // 3. KOL Gravity (Leaders attract Susceptibles)
        if (node.state === 'S') {
            nodes.forEach(other => {
                if (!other.isKOL) return;

                const dx = other.x - node.x;
                const dy = other.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < FORCE_CONSTANTS.KOL_RANGE && dist > 1) {
                    const gravityForce = FORCE_CONSTANTS.KOL_GRAVITY / dist;
                    fx += (dx / dist) * gravityForce;
                    fy += (dy / dist) * gravityForce;
                }
            });
        }

        // Apply forces to velocity
        const newVx = (node.vx + fx * baseSpeed) * FORCE_CONSTANTS.FRICTION;
        const newVy = (node.vy + fy * baseSpeed) * FORCE_CONSTANTS.FRICTION;

        // Update position
        let newX = node.x + newVx;
        let newY = node.y + newVy;

        // Boundary collision (bounce)
        let finalVx = newVx;
        let finalVy = newVy;

        if (newX <= 0 || newX >= SIMULATION_CONSTANTS.CANVAS_WIDTH) {
            finalVx *= -0.8;
            newX = Math.max(0, Math.min(SIMULATION_CONSTANTS.CANVAS_WIDTH, newX));
        }
        if (newY <= 0 || newY >= SIMULATION_CONSTANTS.CANVAS_HEIGHT) {
            finalVy *= -0.8;
            newY = Math.max(0, Math.min(SIMULATION_CONSTANTS.CANVAS_HEIGHT, newY));
        }

        return {
            ...node,
            x: newX,
            y: newY,
            vx: finalVx,
            vy: finalVy
        };
    });
};
