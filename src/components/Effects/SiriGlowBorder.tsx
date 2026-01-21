import React, { useEffect, useState } from 'react';
import './SiriGlowBorder.css';

interface SiriGlowBorderProps {
    gameState?: 'IDLE' | 'ALERT' | 'CRITICAL';
}

const SiriGlowBorder: React.FC<SiriGlowBorderProps> = ({ gameState = 'IDLE' }) => {
    const [currentState, setCurrentState] = useState(gameState);

    useEffect(() => {
        setCurrentState(gameState);
    }, [gameState]);

    return (
        <div className={`siri-glow-border siri-glow-${currentState.toLowerCase()}`} />
    );
};

export default SiriGlowBorder;
