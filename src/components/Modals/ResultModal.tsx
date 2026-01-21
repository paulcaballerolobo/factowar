import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { useUser } from '../../context/UserContext';
import { useAudioFeedback } from '../../hooks/useAudioFeedback';
import { TEXT_ASSETS } from '../../config/TextAssets';
import { Trophy, Skull, Activity, Shield, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import './ResultModal.css';

// Simple lightweight confetti component
const Confetti: React.FC = () => {
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

    useEffect(() => {
        const colors = ['#00FF88', '#00FFFF', '#FF00FF', '#FFD700'];
        const p = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * -100, // % start above
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
        setParticles(p);
    }, []);

    return (
        <div className="confetti-container">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="confetti-piece"
                    initial={{ top: "-10%", left: `${p.x}%` }}
                    animate={{ top: "110%", rotate: 360 }}
                    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: 'linear' }}
                    style={{ background: p.color }}
                />
            ))}
        </div>
    );
};

export const ResultModal: React.FC = () => {
    const {
        gameState,
        currentJugadaScore,
        cumulativeScore,
        activeStory,
        startLevel,
        nextLevel,
        levelId,
        stopLevel
    } = useGame();
    const { identity } = useUser();
    const { playTone } = useAudioFeedback();

    useEffect(() => {
        if (gameState.status === 'VICTORY') {
            playTone('success');
        } else if (gameState.status === 'DEFEAT') {
            playTone('failure');
        }
    }, [gameState.status, playTone]);

    if (gameState.status !== 'VICTORY' && gameState.status !== 'DEFEAT') return null;

    const isVictory = gameState.status === 'VICTORY';
    const postMortem = TEXT_ASSETS.MODALS.POST_MORTEM;
    const resultText = isVictory ? TEXT_ASSETS.MODALS.VICTORY : TEXT_ASSETS.MODALS.DEFEAT;

    // In a real scenario, this would be dynamic per story
    const lessonText = "La desinformación aprovecha los sesgos de confirmación. Detener el contagio requiere moderación activa y verificación cruzada antes de compartir.";

    const handleNext = () => {
        if (isVictory) {
            nextLevel();
        } else {
            stopLevel();
        }
    };

    const handleRetry = () => {
        startLevel(levelId);
    };

    return (
        <div className="modal-overlay">
            {isVictory && <Confetti />}

            <motion.div
                className={`result-modal ${isVictory ? 'victory' : 'defeat'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="modal-glitch-border"></div>

                <header className="modal-header">
                    <div className="result-icon-container">
                        {isVictory ? <Trophy className="result-icon" /> : <Skull className="result-icon" />}
                    </div>
                    <div className="header-text">
                        <span className="operator-badge">OPERADOR ID: {identity?.shortId || '---'}</span>
                        <h1>{resultText.TITLE}</h1>
                        <p className="subtitle">{isVictory ? postMortem.MOTIVATION_SUCCESS : postMortem.MOTIVATION_FAILURE}</p>
                    </div>
                </header>

                <div className="modal-body">
                    <section className="facto-reveal">
                        <div className="section-label">
                            <Activity size={14} />
                            <span>{postMortem.FACTO_LABEL}</span>
                        </div>
                        <div className="facto-content">
                            <h3>{activeStory?.headline}</h3>
                            <p className="facto-reality">{activeStory?.facto}</p>
                        </div>
                    </section>

                    <section className="lesson-learned">
                        <div className="section-label">
                            <Lightbulb size={14} />
                            <span>{postMortem.LESSON_LABEL}</span>
                        </div>
                        <p className="lesson-text">{lessonText}</p>
                    </section>

                    <div className="metrics-grid">
                        <div className="metric-box">
                            <span className="metric-label">{postMortem.SCORE_JUGADA_LABEL}</span>
                            <span className="metric-value">{currentJugadaScore.toLocaleString()}</span>
                        </div>
                        <div className="metric-box highlighted">
                            <span className="metric-label">{postMortem.SCORE_PARTIDA_LABEL}</span>
                            <span className="metric-value">{cumulativeScore.toLocaleString()}</span>
                        </div>
                        <div className="metric-box">
                            <span className="metric-label">INTEGRIDAD FINAL</span>
                            <div className="health-box">
                                <Shield size={16} />
                                <span>{Math.round(gameState.stats.health)}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="modal-footer">
                    <button className="btn-secondary" onClick={handleRetry}>
                        <RotateCcw size={18} />
                        <span>{postMortem.RETRY}</span>
                    </button>
                    <button className="btn-primary" onClick={handleNext}>
                        <span>{isVictory && levelId < 5 ? postMortem.CONTINUE : postMortem.MENU}</span>
                        <ArrowRight size={18} />
                    </button>
                </footer>
            </motion.div>
        </div>
    );
};
