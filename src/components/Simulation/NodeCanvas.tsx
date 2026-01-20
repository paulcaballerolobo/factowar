import React, { useRef, useEffect } from 'react';
import type { GameState } from '../../engine/types';
import { SIMULATION_CONSTANTS } from '../../config/GameConfig';

// Colors (Polarizor Style)
const NODE_COLORS = {
    S: '#808080', // Neutral Gray
    E: '#FFFF00', // Yellow (Exp)
    I: '#FF0000', // Red (Inf)
    Z: '#00FFFF'  // Cyan (Rec)
};

const GLOW_COLORS = {
    I: 'rgba(255, 0, 0, 0.5)',
    Z: 'rgba(0, 255, 255, 0.5)'
};

interface Props {
    gameState: GameState;
}

export const NodeCanvas: React.FC<Props> = ({ gameState }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Background Grid (Optional)
        // ctx.fillStyle = '#0a0a0a';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Nodes
        gameState.nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, SIMULATION_CONSTANTS.COLLISION_RADIUS, 0, Math.PI * 2);

            const color = NODE_COLORS[node.state as keyof typeof NODE_COLORS] || '#fff';
            ctx.fillStyle = color;
            ctx.fill();

            // Glow for I and Z
            if (node.state === 'I' || node.state === 'Z') {
                ctx.shadowBlur = 10;
                ctx.shadowColor = GLOW_COLORS[node.state as 'I' | 'Z'];
                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            }

            // Ring for E
            if (node.state === 'E') {
                ctx.strokeStyle = '#FFFF00';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });

    }, [gameState]);

    return (
        <canvas
            ref={canvasRef}
            width={SIMULATION_CONSTANTS.CANVAS_WIDTH}
            height={SIMULATION_CONSTANTS.CANVAS_HEIGHT}
            style={{
                border: '1px solid #333',
                background: '#111',
                width: '100%',
                maxWidth: '800px'
            }}
        />
    );
};
