import type { Node, NodeType } from './types';


const getRandomPos = (max: number) => Math.random() * max;
const getRandomVel = (speed: number = 2) => (Math.random() - 0.5) * speed;

export const initializeNodes = (count: number, width: number, height: number): Node[] => {
    const nodes: Node[] = [];

    for (let i = 0; i < count; i++) {
        // Determine type based on distribution
        // 10% Blue (Influencers/KOLs? Or just visual variety?), 10% Fuchsia, 80% Neutral
        // Just random types for now for visualization
        const r = Math.random();
        let type: NodeType = 'neutral';
        if (r < 0.1) type = 'blue';
        else if (r < 0.2) type = 'fuchsia';

        // Resistance could be random or based on type
        // High resistance nodes are harder to infect
        const resistance = Math.random();

        nodes.push({
            id: i,
            x: getRandomPos(width),
            y: getRandomPos(height),
            vx: getRandomVel(),
            vy: getRandomVel(),
            type,
            state: 'S', // All Start Susceptible
            incubationTimer: 0,
            resistance,
            influenceRadius: 1.0
        });
    }

    // Infect Patient Zero
    // Actually, let's leave them all S. The GameContext startGame will infect one.

    return nodes;
};
