import { useEffect, useRef, useState, useCallback } from 'react';
import type { GameState, PlayerControls, NewsParams } from '../engine/types';
import { processTick } from '../engine/seiz';
import { SIMULATION_CONSTANTS } from '../config/GameConfig';

export const useGameLoop = (
    initialState: GameState,
    controls: PlayerControls,
    levelId: number,
    news: NewsParams,
    isRunning: boolean
) => {
    const [gameState, setGameState] = useState<GameState>(initialState);

    // Refs for mutable state without triggering re-renders in the loop
    const stateRef = useRef<GameState>(initialState);
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const accumulatorRef = useRef<number>(0);

    // Sync ref with external updates (if any)
    useEffect(() => {
        // Only if not running, we might want to reset or update ref?
        // Usually best to let the loop own the state when running.
    }, [initialState]);

    const tick = useCallback((time: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;
        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;

        accumulatorRef.current += deltaTime;

        const msPerFrame = 1000 / SIMULATION_CONSTANTS.FRAME_RATE;

        // Fixed Time Step Loop
        let updated = false;
        while (accumulatorRef.current >= msPerFrame) {
            stateRef.current = processTick(stateRef.current, controls, levelId, news);
            accumulatorRef.current -= msPerFrame;
            updated = true;
        }

        if (updated) {
            setGameState(stateRef.current);
        }

        if (isRunning) {
            requestRef.current = requestAnimationFrame(tick);
        }
    }, [controls, levelId, news, isRunning]);

    useEffect(() => {
        if (isRunning) {
            lastTimeRef.current = 0;
            accumulatorRef.current = 0;
            requestRef.current = requestAnimationFrame(tick);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isRunning, tick]);

    const reset = useCallback((newState: GameState) => {
        setGameState(newState);
        stateRef.current = newState;
        lastTimeRef.current = 0;
        accumulatorRef.current = 0;
    }, []);

    const triggerPowerUp = useCallback((type: 'friction' | 'campaign') => {
        if (type === 'friction') {
            stateRef.current = {
                ...stateRef.current,
                powerUps: {
                    ...stateRef.current.powerUps,
                    friction: { active: true, timeLeft: 300 } // ~10 seconds at 30fps
                }
            };
        } else if (type === 'campaign') {
            stateRef.current = {
                ...stateRef.current,
                powerUps: {
                    ...stateRef.current.powerUps,
                    campaign: { active: true, ready: false, progress: 0 }
                }
            };
        }
        setGameState(stateRef.current);
    }, []);

    return { gameState, reset, triggerPowerUp };
};
