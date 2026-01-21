import React, { useRef, useEffect, useState } from 'react';
import type { GameState, Node } from '../../engine/types';
import { SIMULATION_CONSTANTS } from '../../config/GameConfig';
import { ChatBubbleSystem } from './chatBubbleSystem';

// State colors (SEIZ)
const STATE_COLORS = {
    S: '#D0D0D0', // Susceptible (Light Gray)
    E: '#FFD700', // Exposed (Gold)
    I: '#FF0055', // Infected (Vibrant Red)
    Z: '#00C853'  // Recovered (Green)
};

// Ideology colors (Borders)
const IDEOLOGY_COLORS = {
    blue: '#0066FF',
    fuchsia: '#FF00FF',
    neutral: '#E0E0E0'
};

interface Props {
    gameState: GameState;
}

export const NodeCanvas: React.FC<Props> = ({ gameState }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [bubbleSystem] = useState(() => new ChatBubbleSystem());

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Update chat bubbles
        bubbleSystem.update(gameState.nodes.map(n => ({ id: n.id, state: n.state })));

        // 1. CLEAR & BACKGROUND
        ctx.fillStyle = '#FFFFFF'; // Pure white
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. DRAW INFECTION AURAS (Heat Map Layer)
        gameState.nodes.forEach(node => {
            if (node.state === 'I') {
                const size = node.isKOL ? 60 : 40; // KOL auras are larger
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size);
                gradient.addColorStop(0, 'rgba(255, 0, 85, 0.15)');
                gradient.addColorStop(0.5, 'rgba(255, 0, 85, 0.05)');
                gradient.addColorStop(1, 'rgba(255, 0, 85, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(node.x - size, node.y - size, size * 2, size * 2);
            }
        });

        // 3. DRAW NODES (Icons)
        gameState.nodes.forEach(node => {
            drawNodeIcon(ctx, node);
        });

        // 4. DRAW CHAT BUBBLES
        const bubbles = bubbleSystem.getBubbles();
        bubbles.forEach(bubble => {
            const node = gameState.nodes.find(n => n.id === bubble.nodeId);
            if (!node) return;

            drawChatBubble(ctx, node.x, node.y - 30, bubble.text, bubble.opacity);
        });

    }, [gameState, bubbleSystem]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '20px',
            background: '#FFFFFF'
        }}>
            <canvas
                ref={canvasRef}
                width={SIMULATION_CONSTANTS.CANVAS_WIDTH}
                height={SIMULATION_CONSTANTS.CANVAS_HEIGHT}
                style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #E0E0E0',
                    width: '100%',
                    height: 'auto',
                    maxWidth: '800px'
                }}
            />
        </div>
    );
};

/**
 * Draws a node as a simple human icon (head + shoulders)
 * Visual Hierarchy:
 * - Shape: Archetype (man/woman/neutral)
 * - Fill Color: SEIZ State
 * - Border: Ideology
 */
function drawNodeIcon(ctx: CanvasRenderingContext2D, node: Node): void {
    const baseSize = node.isKOL ? 9 : 6; // KOL 50% larger
    const fillColor = STATE_COLORS[node.state as keyof typeof STATE_COLORS] || '#999';
    const borderColor = IDEOLOGY_COLORS[node.type as keyof typeof IDEOLOGY_COLORS] || '#DDD';

    ctx.save();
    ctx.translate(node.x, node.y);

    // Draw icon based on archetype
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.5;

    if (node.archetype === 'man') {
        // Head (circle)
        ctx.beginPath();
        ctx.arc(0, -baseSize, baseSize * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Shoulders (trapezoid)
        ctx.beginPath();
        ctx.moveTo(-baseSize, baseSize);
        ctx.lineTo(-baseSize * 0.5, -baseSize * 0.3);
        ctx.lineTo(baseSize * 0.5, -baseSize * 0.3);
        ctx.lineTo(baseSize, baseSize);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (node.archetype === 'woman') {
        // Head (circle)
        ctx.beginPath();
        ctx.arc(0, -baseSize, baseSize * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Shoulders (curved, more narrow)
        ctx.beginPath();
        ctx.moveTo(-baseSize * 0.7, baseSize);
        ctx.quadraticCurveTo(-baseSize * 0.4, -baseSize * 0.3, 0, -baseSize * 0.3);
        ctx.quadraticCurveTo(baseSize * 0.4, -baseSize * 0.3, baseSize * 0.7, baseSize);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else {
        // Neutral: Simple circle
        ctx.beginPath();
        ctx.arc(0, 0, baseSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();
}

/**
 * Draws a chat bubble above a node
 */
function drawChatBubble(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, opacity: number): void {
    if (opacity <= 0) return;

    ctx.save();
    ctx.globalAlpha = opacity;

    // Measure text
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    const metrics = ctx.measureText(text);
    const padding = 8;
    const bubbleWidth = metrics.width + padding * 2;
    const bubbleHeight = 20;

    const bubbleX = x - bubbleWidth / 2;
    const bubbleY = y;

    // Draw bubble background
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;

    const radius = 10;
    ctx.beginPath();
    ctx.moveTo(bubbleX + radius, bubbleY);
    ctx.lineTo(bubbleX + bubbleWidth - radius, bubbleY);
    ctx.arcTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + radius, radius);
    ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - radius);
    ctx.arcTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX + bubbleWidth - radius, bubbleY + bubbleHeight, radius);
    ctx.lineTo(bubbleX + radius, bubbleY + bubbleHeight);
    ctx.arcTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight - radius, radius);
    ctx.lineTo(bubbleX, bubbleY + radius);
    ctx.arcTo(bubbleX, bubbleY, bubbleX + radius, bubbleY, radius);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Draw border
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw text
    ctx.fillStyle = '#333';
    ctx.fillText(text, bubbleX + padding, bubbleY + bubbleHeight / 2 + 4);

    ctx.restore();
}
