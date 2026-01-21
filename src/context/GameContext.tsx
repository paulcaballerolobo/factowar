import React, { createContext, useContext, useState, useEffect } from 'react';
import type { GameState, PlayerControls, NewsParams, NewsStory } from '../engine/types';
import { useGameLoop } from '../hooks/useGameLoop';
import { initializeNodes } from '../engine/initializers';
import { SIMULATION_CONSTANTS, LEVEL_CONFIG, SCORE_CONSTANTS } from '../config/GameConfig';
import { FAKE_NEWS_POOL } from '../config/GameContent';

interface GameContextType {
    gameState: GameState;
    controls: PlayerControls;
    news: NewsParams;
    activeStory: NewsStory | null;
    isStoryRevealed: boolean;
    activeAlert: string | null;
    levelId: number;
    isPlaying: boolean;
    cumulativeScore: number;    // Score PARTIDA (Total Partida)
    currentJugadaScore: number; // Score de la Jugada

    // Actions
    setControls: (c: PlayerControls) => void;
    startLevel: (id: number) => void;
    stopLevel: () => void;
    updateNewsParams: (params: NewsParams) => void;
    activatePowerUp: (type: 'friction' | 'campaign') => void;
    nextLevel: () => void;
    revealStory: () => void;
    setTheme: (theme: string) => void;
    currentTheme: string;
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
    stats: {
        health: 100,
        infectedCount: 0,
        exposedCount: 0,
        recoveredCount: 0,
        polarization: 0,
        impact: 0,
        exposure: 0,
        skepticism: 0
    },
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
    const [activeStory, setActiveStory] = useState<NewsStory | null>(null);
    const [isStoryRevealed, setIsStoryRevealed] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<string>('LGBTIQ+');
    const [activeAlert, setActiveAlert] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [cumulativeScore, setCumulativeScore] = useState<number>(0);
    const [currentJugadaScore, setCurrentJugadaScore] = useState<number>(0);

    // The Loop
    const { gameState, reset, triggerPowerUp } = useGameLoop(
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
            if (gameState.status === 'DEFEAT') {
                setActiveAlert("fallo crítico del sistema. la red ha colapsado.");
            }
        }
    }, [gameState.status]);

    // Ticker Logic Monitor
    useEffect(() => {
        if (!isPlaying) return;

        const { stats, powerUps } = gameState;

        // Critical Health
        if (stats.health < 25) {
            setActiveAlert("salud de la red por debajo del 25%. integridad estructural comprometida.");
        }
        // Peak Outrage
        else if (news.tags.moralOutrage && stats.infectedCount > 20) {
            setActiveAlert("alerta: pico de #indignación detectado en sector neutro.");
        }
        // Friction Powerup
        else if (powerUps.friction.active) {
            setActiveAlert("fricción activada. reduciendo la velocidad de los nodos en un 70%.");
        }
        // Fact Check
        else if (gameState.isFactChecked) {
            setActiveAlert("boletín: verificación oficial publicada. iniciando recuperación.");
        }
        else {
            setActiveAlert(null);
        }

        // Live Scoring (Current Jugada)
        const liveScore = Math.floor(
            (stats.health * (SCORE_CONSTANTS.HEALTH_POINT / 10)) +
            (stats.recoveredCount * 50)
        );
        setCurrentJugadaScore(liveScore);

    }, [gameState.stats, isPlaying, news.tags]);

    const startLevel = (id: number) => {
        setLevelId(id);

        // Filter pool by chosen theme
        const filteredPool = FAKE_NEWS_POOL.filter(s => s.theme === currentTheme);
        const finalPool = filteredPool.length > 0 ? filteredPool : FAKE_NEWS_POOL;
        const randomStory = finalPool[Math.floor(Math.random() * finalPool.length)];

        setActiveStory(randomStory);
        setIsStoryRevealed(false);
        setActiveAlert(null);
        setCurrentJugadaScore(0);

        // Map Tags to NewsParams
        const mappedNews: NewsParams = {
            baseEngagement: randomStory.params.base_engagement,
            baseControversy: randomStory.params.base_controversy,
            tags: {
                moralOutrage: randomStory.tags.includes('#IndignaciónMoral'),
                hotContent: randomStory.tags.includes('#ContenidoCaliente'),
                curiosityGap: randomStory.tags.includes('#BrechaDeCuriosidad'),
                emotionalAlert: randomStory.tags.includes('#AlertaEmocional'),
                kolImpact: randomStory.tags.includes('#LíderDeOpinión')
            },
            headline: randomStory.headline,
            context: randomStory.theme,
            facto: randomStory.facto
        };
        setNews(mappedNews);
        setControls(INITIAL_CONTROLS);

        // Initialize Nodes
        const nodes = initializeNodes(
            SIMULATION_CONSTANTS.NODE_COUNT,
            SIMULATION_CONSTANTS.CANVAS_WIDTH,
            SIMULATION_CONSTANTS.CANVAS_HEIGHT
        );


        if (nodes.length > 0) {
            nodes[0].state = 'I';
            nodes[0].infectionTime = 0;

            // Mark KOL (Leader of Opinion) if story has the tag
            if (randomStory.tags.includes('#LíderDeOpinión')) {
                // Choose 1-2 random nodes to be KOLs
                const kolCount = Math.floor(Math.random() * 2) + 1; // 1 or 2
                const kolIndices = new Set<number>();

                while (kolIndices.size < kolCount) {
                    const randomIndex = Math.floor(Math.random() * nodes.length);
                    kolIndices.add(randomIndex);
                }

                kolIndices.forEach(idx => {
                    nodes[idx].isKOL = true;
                    nodes[idx].influenceRadius = 2.0; // Double radius per modelo_de_propagacion.md
                });
            }
        }

        const startState: GameState = {
            ...INITIAL_STATE,
            nodes,
            status: 'RUNNING'
        };

        reset(startState);
        setIsPlaying(true);
    };

    const revealStory = () => {
        setIsStoryRevealed(true);
    };

    const stopLevel = () => {
        setIsPlaying(false);
    };

    const nextLevel = () => {
        // Logic for score accumulation (Total Partida)
        setCumulativeScore(prev => prev + currentJugadaScore);

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
        triggerPowerUp(type);
    };

    return (
        <GameContext.Provider value={{
            gameState,
            controls,
            news,
            activeStory,
            isStoryRevealed,
            activeAlert,
            levelId,
            isPlaying,
            cumulativeScore,
            currentJugadaScore,
            setControls,
            startLevel,
            stopLevel,
            updateNewsParams,
            activatePowerUp,
            nextLevel,
            revealStory,
            setTheme: setCurrentTheme,
            currentTheme
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
