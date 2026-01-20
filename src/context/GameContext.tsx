import React, { createContext, useContext, useState, useEffect } from 'react';
import type { GameState, PlayerControls, NewsParams } from '../engine/types';
import { useGameLoop } from '../hooks/useGameLoop';
import { initializeNodes } from '../engine/initializers';
import { SIMULATION_CONSTANTS, LEVEL_CONFIG } from '../config/GameConfig';

interface GameContextType {
    gameState: GameState;
    controls: PlayerControls;
    news: NewsParams;
    levelId: number;
    isPlaying: boolean;
    cumulativeScore: number;

    // Actions
    setControls: (c: PlayerControls) => void;
    startLevel: (id: number) => void;
    stopLevel: () => void;
    updateNewsParams: (params: NewsParams) => void;
    activatePowerUp: (type: 'friction' | 'campaign') => void;
    nextLevel: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_CONTROLS: PlayerControls = {
    engagement: 0.5,
    controversy: 0.5,
    moderation: 0.5,
    propagation: 0.5,
    delay: 3
};

const INITIAL_NEWS: NewsParams = {
    baseEngagement: 0.5,
    baseControversy: 0.5,
    tags: {
        moralOutrage: false,
        hotContent: false,
        curiosityGap: false,
        emotionalAlert: false,
        kolImpact: false
    },
    headline: "",
    context: ""
};

const INITIAL_STATE: GameState = {
    nodes: [],
    time: { day: 0, ticks: 0, isRunning: false },
    stats: { health: 100, infectedCount: 0, exposedCount: 0, recoveredCount: 0 },
    powerUps: {
        campaign: { active: false, ready: false, progress: 0 },
        friction: { active: false, timeLeft: 0 }
    },
    status: 'IDLE',
    isFactChecked: false
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [levelId, setLevelId] = useState<number>(1);
    const [controls, setControls] = useState<PlayerControls>(INITIAL_CONTROLS);
    const [news, setNews] = useState<NewsParams>(INITIAL_NEWS);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [cumulativeScore, setCumulativeScore] = useState<number>(0);

    // The Loop
    const { gameState, reset } = useGameLoop(
        INITIAL_STATE,
        controls,
        levelId,
        news,
        isPlaying
    );

    // Watch for Win/Loss to stop loop
    useEffect(() => {
        if (gameState.status === 'VICTORY' || gameState.status === 'DEFEAT') {
            setIsPlaying(false);
        }
    }, [gameState.status]);

    const startLevel = (id: number) => {
        setLevelId(id);
        setControls(INITIAL_CONTROLS); // Reset controls on new level? Or keep?

        // Initialize Nodes
        const nodes = initializeNodes(
            SIMULATION_CONSTANTS.NODE_COUNT,
            SIMULATION_CONSTANTS.CANVAS_WIDTH,
            SIMULATION_CONSTANTS.CANVAS_HEIGHT
        );

        // Infect Patient Zero
        if (nodes.length > 0) {
            nodes[0].state = 'I';
            nodes[0].infectionTime = 0;
        }

        const startState: GameState = {
            ...INITIAL_STATE,
            nodes,
            status: 'RUNNING'
        };

        reset(startState);
        setIsPlaying(true);
    };

    const stopLevel = () => {
        setIsPlaying(false);
    };

    const nextLevel = () => {
        // Logic for score accumulation
        const levelScore = 1500; // Mock score calc
        setCumulativeScore(prev => prev + levelScore);

        const nextId = levelId + 1;
        if (LEVEL_CONFIG[nextId as keyof typeof LEVEL_CONFIG]) {
            startLevel(nextId);
        } else {
            // Game Completed
            console.log("Game Complete!");
        }
    };

    const updateNewsParams = (params: NewsParams) => {
        setNews(params);
    };

    const activatePowerUp = (type: 'friction' | 'campaign') => {
        // In a real implementation, we'd check if specific conditions are met
        // For now, we modify the CURRENT STATE, but wait.
        // gameState updates are handled in useGameLoop via processTick OR via reset.
        // But we can't easily injection into the loop state from here without a setter exposed by useGameLoop
        // which we didn't expose (processTick owns the logic).
        // However, we passed `controls` and `news` into useGameLoop.
        // PowerUps are part of `gameState.powerUps`.
        // We need a way to trigger them.

        // Solution: passing "actions" or "events" to useGameLoop? 
        // Or just a quick dirty reset with modified state?
        // Resetting interrupts the loop.

        // Best approach for this prototype: 
        // We can have a `powerUpRequests` state passed into useGameLoop, 
        // similar to `controls`.
        // Let's defer this complexity. For now, we will assume Power Ups are triggered via controls mechanism 
        // or we accept we need to update `useGameLoop` to accept an `actionQueue`.

        // Alternative: Just mutate the stateRef in useGameLoop via a exposed method?
        // Unclean.

        // Let's skip direct implementation of PowerUp activation for this strict step 
        // OR implement `triggerPowerUp` in useGameLoop.
        // I'll leave it empty for now and fix it in specific task.
        console.log("Activate PowerUp", type);
    };

    return (
        <GameContext.Provider value={{
            gameState,
            controls,
            news,
            levelId,
            isPlaying,
            cumulativeScore,
            setControls,
            startLevel,
            stopLevel,
            updateNewsParams,
            activatePowerUp,
            nextLevel
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGame must be used within GameProvider");
    return context;
};
