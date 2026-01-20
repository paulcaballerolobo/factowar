export const LEVEL_CONFIG = {
    1: { id: 1, name: "El Ágora", cra: 0.9, floor: 0.1, mult: 1.0 },    // Low resistance, high control
    2: { id: 2, name: "La Plaza", cra: 0.7, floor: 0.3, mult: 1.2 },    // Moderate
    3: { id: 3, name: "Eco", cra: 0.5, floor: 0.5, mult: 1.5 },         // Echo Chamber
    4: { id: 4, name: "Laberinto", cra: 0.3, floor: 0.7, mult: 2.0 },   // High resistance
    5: { id: 5, name: "Zona Zero", cra: 0.1, floor: 0.9, mult: 3.5 }    // Very high resistance
} as const;

export const SCORE_CONSTANTS = {
    HEALTH_POINT: 127,
    SECOND_LEFT: 43,
    BONUS_CAMPAIGN: 1850,
    BONUS_FRICTION: 925
};

export const SIMULATION_CONSTANTS = {
    MAX_DAYS: 30,
    SECONDS_PER_DAY: 1,
    FRAME_RATE: 30, // Logic updates per second
    NODE_COUNT: 100,
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 500,
    COLLISION_RADIUS: 5, // Visual radius
    INFLUENCE_RADIUS_BASE: 25 // Base interaction radius
};

// Avatar definitions for Sovereign Identity
export const AVATARS = [
    { id: 1, name: "GHOST", icon: "Ghost" },
    { id: 2, name: "ANALISTA", icon: "Glasses" },
    { id: 3, name: "CENTINELA", icon: "Shield" },
    { id: 4, name: "ACTIVISTA", icon: "Megaphone" },
    { id: 5, name: "OPERADOR", icon: "Headset" }
];
