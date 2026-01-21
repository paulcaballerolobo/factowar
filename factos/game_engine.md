 * MOTOR LÓGICO CENTRAL (v2.0 Final)
 * By Paul Caballero
 * Este documento describe todas las instancias lógicas de funcionamiento del juego. Integra: Modelo SEIZ, Sistema CRA (Resistencia), Tags de Noticia y Power-Ups.

 ## Nota de alcance
Este documento describe la visión conceptual y las mecánicas de FactoWar.
No define una arquitectura técnica ni una implementación cerrada.
Las decisiones técnicas deben surgir de la interpretación de este diseño.
   
### 📂 Game Engine

```javascript

// --- CONSTANTES DE NIVELES (RESISTENCIA) ---
const LEVEL_CONFIG = {
  1: { cra: 0.9, floor: 0.1, mult: 1.0 }, // Ágora
  2: { cra: 0.7, floor: 0.3, mult: 1.2 }, // Plaza
  3: { cra: 0.5, floor: 0.5, mult: 1.5 }, // Eco
  4: { cra: 0.3, floor: 0.7, mult: 2.0 }, // Laberinto
  5: { cra: 0.1, floor: 0.9, mult: 3.5 }  // Zona Zero
};

// --- REGLAS DE CICLO Y SCORING ---
/**
 * REGLA: CONCEPTOS DE TIEMPO
 * 1. JUGADA: Es cada ciclo individual de simulación. Empieza al presionar 'PLAY' (EJECUTAR) 
 *    y termina cuando el tiempo se agota (Victoria por Salud > 50%) o la red colapsa (Derrota).
 * 2. PARTIDA: Es la sesión completa del usuario en el navegador. Acumula los puntos de todas 
 *    las jugadas realizadas desde que el usuario ingresó hasta que abandona la aplicación.
 * 
 * REGLA: TIPOS DE SCORE
 * 1. SCORE DE LA JUGADA (Current): Puntos obtenidos en la simulación activa.
 * 2. SCORE PARTIDA (Total): Suma total de puntos de todas las jugadas de la partida actual.
 */

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
  
  // -------------------------------------------------------
  // 1. CÁLCULO DE VARIABLES REALES (SISTEMA CRA)
  // -------------------------------------------------------
  // Fórmula: ValorReal = Piso + (ValorJugador * (1 - CRA))
  // NOTA: El jugador intenta BAJAR engagement/controversia y SUBIR moderación.
  
  // A. Engagement (Velocidad Beta): Jugador quiere 0.
  // Valor base viene de la noticia + Tag #BrechaCuriosidad
  let baseEng = activeNews.params.base_engagement;
  if (activeNews.tags.includes('#BrechaDeCuriosidad')) baseEng *= 1.3;
  
  // Aplicamos Input Jugador (Slider) vs Resistencia
  // Si el jugador pone slider en 0.2, el sistema resiste.
  let realEngagement = level.floor + (playerControls.engagement * (1 - level.cra));
  // Ajuste base por noticia
  realEngagement = (realEngagement + baseEng) / 2; 

  // B. Controversia (Probabilidad P): Jugador quiere 0.
  let baseCont = activeNews.params.base_controversy;
  if (activeNews.tags.includes('#IndignaciónMoral')) baseCont *= 1.5;
  
  let realControversy = level.floor + (playerControls.controversy * (1 - level.cra));
  realControversy = (realControversy + baseCont) / 2;

  // C. Moderación (Cura): Jugador quiere 1.
  // Aquí la resistencia actúa como TECHO.
  let realModeration = playerControls.moderation * level.cra; 
  if (activeNews.tags.includes('#AlertaEmocional')) realModeration *= 0.5; // Nerf por miedo

  // D. Propagación (Radio): Jugador quiere 0.
  let realPropagation = level.floor + (playerControls.propagation * (1 - level.cra));
  if (activeNews.tags.includes('#LíderDeOpinión')) realPropagation *= 2.0;

  // -------------------------------------------------------
  // 2. APLICACIÓN DE POWER-UPS (ESTRATEGIA)
  // -------------------------------------------------------
  
  // Campaña (Escudo): Divide la probabilidad de infección
  if (powerUps.campaign.active && powerUps.campaign.ready) {
    realControversy /= 5; 
  }

  // Fricción (Freno): Reduce velocidad
  if (powerUps.friction.active && powerUps.friction.timeLeft > 0) {
    realEngagement *= 0.3;
  }
  
  // Esto recarga los tiempos de Campaña y fricción
  
  {
  "campaign": { "status": "READY", "charge": 100 }, // o "CHARGING", charge: 33
  "friction": { "status": "CHARGING", "charge": 50 }
}

  // -------------------------------------------------------
  // 3. MOTOR SEIZ (SIMULACIÓN DE NODOS)
  // -------------------------------------------------------
  
  let infectedCount = 0;
  let exposedCount = 0;
  let curedCount = 0;

  // Radio de contacto (en px) basado en Propagación
  const contactRadius = 20 + (realPropagation * 50); 
  const contactRadiusSq = contactRadius * contactRadius;

  const nextNodes = nodes.map(node => {
    const newNode = { ...node };

    // A. MOVIMIENTO (Física)
    // La velocidad depende del Engagement real
    const speed = (realEngagement * 2.0) + 0.2; 
    
    // Calcular nueva posición (rebote simple en bordes)
    newNode.x += newNode.vx * speed;
    newNode.y += newNode.vy * speed;
    
    if (newNode.x <= 0 || newNode.x >= 800) newNode.vx *= -1;
    if (newNode.y <= 0 || newNode.y >= 500) newNode.vy *= -1;

    // B. CONTAGIO (Lógica SEIZ)
    // Contamos vecinos infectados
    let infectedNeighbors = 0;
    nodes.forEach(other => {
      if (node.id !== other.id && other.state === 'I') {
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        if ((dx*dx + dy*dy) < contactRadiusSq) {
          infectedNeighbors++;
        }
      }
    });

    // Transiciones de Estado
    if (newNode.state === 'S') {
      // S -> I (Infección directa por Controversia)
      // Tag #ContenidoCaliente aumenta chance directo
      let pChance = realControversy * 0.01; 
      if (activeNews.tags.includes('#ContenidoCaliente')) pChance += 0.05;

      // S -> E (Exposición por Engagement)
      let betaChance = realEngagement * 0.02;

      // Probabilidad acumulada por vecinos
      if (Math.random() < (pChance * infectedNeighbors)) {
        newNode.state = 'I';
      } else if (Math.random() < (betaChance * infectedNeighbors)) {
        newNode.state = 'E';
      }
    } 
    else if (newNode.state === 'E') {
      // E -> I (Incubación)
      newNode.incubation++;
      // Si #ContenidoCaliente, incubación es instantánea (bypass)
      const incubationLimit = activeNews.tags.includes('#ContenidoCaliente') ? 10 : 100;
      
      if (newNode.incubation > incubationLimit) {
        newNode.state = 'I';
      }
    }
    else if (newNode.state === 'I') {
      // I -> Z (Cura / Moderación)
      // Solo posible si ya pasó el Fact-Check Delay
      if (isFactChecked && gameTime.day >= playerControls.delay) {
        if (Math.random() < (realModeration * 0.05)) {
          newNode.state = 'Z';
        }
      }
    }

    // Contadores para métricas
    if (newNode.state === 'I') infectedCount++;
    if (newNode.state === 'E') exposedCount++;
    if (newNode.state === 'Z') curedCount++;

    return newNode;
  });

  // -------------------------------------------------------
  // 4. MÉTRICAS DE SALUD (SALIDA)
  // -------------------------------------------------------

  // Fórmula de Daño Acumulado (Tu fórmula 3.2 normalizada)
  const damageScore = (realEngagement * 0.3) + 
                      (realControversy * 0.1) + 
                      ((1 - realModeration) * 0.2) + 
                      (realPropagation * 0.4);
  
  // Salud base (100) menos daño por configuración menos daño por infectados reales
  let currentHealth = 100 - (damageScore * 30) - (infectedCount * 0.5);
  if (currentHealth < 0) currentHealth = 0;
  if (currentHealth > 100) currentHealth = 100;

  // Estado del juego (Win/Loss conditions)
  let nextStatus = currentState.status;
  
  // A. Explosión Inmediata
  if (infectedCount > 90 && gameTime.day < 5) nextStatus = 'GAME_OVER_EXPLOSION';
  
  // B. Red Sofocada (Aburrimiento)
  if (realEngagement < 0.1 && realPropagation < 0.1) nextStatus = 'GAME_OVER_BOREDOM';
  
  // C. Fin de Tiempo (Victoria o Derrota según Salud)
  if (gameTime.day >= 30) {
    nextStatus = currentHealth > 50 ? 'VICTORY' : 'GAME_OVER_COLLAPSE';
  }
  if (currentHealth <= 0) nextStatus = 'GAME_OVER_COLLAPSE';

  return {
    nodes: nextNodes,
    health: currentHealth,
    metrics: { infected: infectedCount, exposed: exposedCount, cured: curedCount },
    status: nextStatus
  };
};

/**
 * Calcula el puntaje final (Solo se llama al terminar).
 */
export const calculateFinalScore = (health, daysLeft, difficultyId, strategies) => {
  const levelMult = LEVEL_CONFIG[difficultyId].mult;
  
  let baseScore = (health * SCORE_CONSTANTS.HEALTH_POINT) + 
                  (daysLeft * SCORE_CONSTANTS.SECOND_LEFT);

  if (strategies.campaign) baseScore += SCORE_CONSTANTS.BONUS_CAMPAIGN;
  if (strategies.friction) baseScore += SCORE_CONSTANTS.BONUS_FRICTION;

  return Math.floor(baseScore * levelMult);
};
```
