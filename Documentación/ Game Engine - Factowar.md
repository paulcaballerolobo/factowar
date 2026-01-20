/**
 * FACTOWAR: MOTOR LÓGICO CENTRAL (v2.0 Final)
 * Integra: Modelo SEIZ, Sistema CRA (Resistencia), Tags de Noticia y Power-Ups.
 * By Paul Caballero 
 */

// --- CONSTANTES DE NIVELES (RESISTENCIA) ---
const LEVEL_CONFIG = {
  1: { cra: 0.9, floor: 0.1, mult: 1.0 }, // Ágora
  2: { cra: 0.7, floor: 0.3, mult: 1.2 }, // Plaza
  3: { cra: 0.5, floor: 0.5, mult: 1.5 }, // Eco
  4: { cra: 0.3, floor: 0.7, mult: 2.0 }, // Laberinto
  5: { cra: 0.1, floor: 0.9, mult: 3.5 }  // Zona Zero
};

// --- CONSTANTES DE SCORING ---
const SCORE_CONSTANTS = {
  HEALTH_POINT: 127,
  SECOND_LEFT: 43,
  BONUS_CAMPAIGN: 1850,
  BONUS_FRICTION: 925
};

/**
 * Calcula el estado del siguiente frame del juego.
 * Se ejecuta 10-30 veces por segundo.
 */
export const calculateNextFrame = (currentState) => {
  const {
    nodes,            // Array de 100 nodos
    gameTime,         // Objeto { day, frameCount }
    playerControls,   // { engagement, controversy, moderation, propagation, delay }
    difficultyId,     // 1-5
    activeNews,       // Objeto de la noticia con Tags
    powerUps,         // { campaign: {active, progress}, friction: {active, timeLeft} }
    isFactChecked     // Boolean
  } = currentState;

  const level = LEVEL_CONFIG[difficultyId];
  
  // 1. CÁLCULO DE VARIABLES REALES (SISTEMA CRA)
  let baseEng = activeNews.params.base_engagement;
  if (activeNews.tags.includes('#BrechaDeCuriosidad')) baseEng *= 1.3;
  
  let realEngagement = level.floor + (playerControls.engagement * (1 - level.cra));
  realEngagement = (realEngagement + baseEng) / 2; 

  let baseCont = activeNews.params.base_controversy;
  if (activeNews.tags.includes('#IndignaciónMoral')) baseCont *= 1.5;
  
  let realControversy = level.floor + (playerControls.controversy * (1 - level.cra));
  realControversy = (realControversy + baseCont) / 2;

  let realModeration = playerControls.moderation * level.cra; 
  if (activeNews.tags.includes('#AlertaEmocional')) realModeration *= 0.5;

  let realPropagation = level.floor + (playerControls.propagation * (1 - level.cra));
  if (activeNews.tags.includes('#LíderDeOpinión')) realPropagation *= 2.0;

  // 2. APLICACIÓN DE POWER-UPS
  if (powerUps.campaign.active && powerUps.campaign.ready) {
    realControversy /= 5; 
  }
  if (powerUps.friction.active && powerUps.friction.timeLeft > 0) {
    realEngagement *= 0.3;
  }

  // 3. MOTOR SEIZ (SIMULACIÓN DE NODOS)
  const contactRadius = 20 + (realPropagation * 50); 
  const contactRadiusSq = contactRadius * contactRadius;
  
  let infectedCount = 0;
  let exposedCount = 0;
  let curedCount = 0;

  const nextNodes = nodes.map(node => {
    const newNode = { ...node };
    const speed = (realEngagement * 2.0) + 0.2; 
    
    newNode.x += newNode.vx * speed;
    newNode.y += newNode.vy * speed;
    
    if (newNode.x <= 0 || newNode.x >= 800) newNode.vx *= -1;
    if (newNode.y <= 0 || newNode.y >= 500) newNode.vy *= -1;

    let infectedNeighbors = 0;
    nodes.forEach(other => {
      if (node.id !== other.id && other.state === 'I') {
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        if ((dx*dx + dy*dy) < contactRadiusSq) infectedNeighbors++;
      }
    });

    if (newNode.state === 'S') {
      let pChance = realControversy * 0.01; 
      if (activeNews.tags.includes('#ContenidoCaliente')) pChance += 0.05;
      let betaChance = realEngagement * 0.02;

      if (Math.random() < (pChance * infectedNeighbors)) {
        newNode.state = 'I';
      } else if (Math.random() < (betaChance * infectedNeighbors)) {
        newNode.state = 'E';
      }
    } 
    else if (newNode.state === 'E') {
      newNode.incubation++;
      const incubationLimit = activeNews.tags.includes('#ContenidoCaliente') ? 10 : 100;
      if (newNode.incubation > incubationLimit) newNode.state = 'I';
    }
    else if (newNode.state === 'I') {
      if (isFactChecked && gameTime.day >= playerControls.delay) {
        if (Math.random() < (realModeration * 0.05)) newNode.state = 'Z';
      }
    }

    if (newNode.state === 'I') infectedCount++;
    if (newNode.state === 'E') exposedCount++;
    if (newNode.state === 'Z') curedCount++;
    return newNode;
  });

  // 4. MÉTRICAS DE SALUD
  const damageScore = (realEngagement * 0.3) + 
                      (realControversy * 0.1) + 
                      ((1 - realModeration) * 0.2) + 
                      (realPropagation * 0.4);
  
  let currentHealth = 100 - (damageScore * 30) - (infectedCount * 0.5);
  if (currentHealth < 0) currentHealth = 0;
  
  let nextStatus = currentState.status;
  if (infectedCount > 90 && gameTime.day < 5) nextStatus = 'GAME_OVER_EXPLOSION';
  if (realEngagement < 0.1 && realPropagation < 0.1) nextStatus = 'GAME_OVER_BOREDOM';
  if (gameTime.day >= 30) nextStatus = currentHealth > 50 ? 'VICTORY' : 'GAME_OVER_COLLAPSE';
  if (currentHealth <= 0) nextStatus = 'GAME_OVER_COLLAPSE';

  return {
    nodes: nextNodes,
    health: currentHealth,
    metrics: { infected: infectedCount, exposed: exposedCount, cured: curedCount },
    status: nextStatus
  };
};

export const calculateFinalScore = (health, daysLeft, difficultyId, strategies) => {
  const levelMult = LEVEL_CONFIG[difficultyId].mult;
  let baseScore = (health * SCORE_CONSTANTS.HEALTH_POINT) + 
                  (daysLeft * SCORE_CONSTANTS.SECOND_LEFT);
  if (strategies.campaign) baseScore += SCORE_CONSTANTS.BONUS_CAMPAIGN;
  if (strategies.friction) baseScore += SCORE_CONSTANTS.BONUS_FRICTION;
  return Math.floor(baseScore * levelMult);
};
