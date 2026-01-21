import React, { useEffect, useState } from 'react';
import { WelcomeConfig } from '../../config/TextConfig';
import './WelcomeModal.css';

interface WelcomeModalProps {
    onStart: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStart }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Verificar si el usuario ya vio el modal
        const hasSeenWelcome = localStorage.getItem('factowar_welcome_seen');
        if (!hasSeenWelcome) {
            setIsVisible(true);
        }
    }, []);

    const handleStart = () => {
        localStorage.setItem('factowar_welcome_seen', 'true');
        setIsVisible(false);
        onStart();
    };

    if (!isVisible) return null;

    return (
        <div className="welcome-modal-overlay">
            <div className="welcome-modal-card">
                <div className="welcome-logo">
                    <span className="logo-text">FACTOWAR</span>
                </div>

                <h1 className="welcome-title">{WelcomeConfig.title}</h1>
                <h2 className="welcome-subtitle">{WelcomeConfig.subtitle}</h2>
                <p className="welcome-description">{WelcomeConfig.description}</p>

                <button className="welcome-button" onClick={handleStart}>
                    {WelcomeConfig.buttonText}
                </button>
            </div>
        </div>
    );
};

export default WelcomeModal;
