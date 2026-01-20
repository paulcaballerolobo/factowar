export type NodeType = 'blue' | 'fuchsia' | 'neutral';
export type NodeState = 'S' | 'E' | 'I' | 'Z';

export interface Vector2 {
    x: number;
    y: number;
}

export interface Node {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: NodeType;
    state: NodeState;

    // SEIZ Internal Counters
    incubationTimer: number; // ticks in 'E'
    infectionTime?: number;  // tick when became 'I'

    // Individual Traits
    resistance: number;      // 0.0-1.0 (Stubbornness)
    influenceRadius: number; // Multiplier for base radius
}

export interface NewsParams {
    baseEngagement: number;
    baseControversy: number;
    tags: {
        moralOutrage: boolean;     // Increases P (Infection chance)
        hotContent: boolean;       // Bypasses E (Incubation)
        curiosityGap: boolean;     // Increases Beta (Contact) but lowers Incubation speed
        emotionalAlert: boolean;   // Reduces Moderation effectiveness
        kolImpact: boolean;        // Increases Propagation Radius
    };
    headline: string;
    context: string;
}

export interface PlayerControls {
    engagement: number;
    controversy: number;
    moderation: number;
    propagation: number;
    delay: number;
}

export interface GameState {
    nodes: Node[];
    time: {
        day: number;
        ticks: number;
        isRunning: boolean;
    };
    stats: {
        health: number;
        infectedCount: number;
        exposedCount: number;
        recoveredCount: number;
    };
    powerUps: {
        campaign: { active: boolean; ready: boolean; progress: number }; // ready=true when progress=100
        friction: { active: boolean; timeLeft: number };
    };
    status: 'IDLE' | 'RUNNING' | 'PAUSED' | 'VICTORY' | 'DEFEAT';
    isFactChecked: boolean;
}
