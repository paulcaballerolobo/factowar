import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import type { NewsStory } from '../../engine/types';
import './IntelligenceCard.css';

interface Props {
    story: NewsStory | null;
    isScanning: boolean;
    onReveal: () => void;
    selectedTheme: string;
    onThemeChange: (theme: string) => void;
}

const THEMES = ['Feminismo', 'LGBTIQ+', 'Género', 'Sexualidad', 'Discriminación'];

export const IntelligenceCard: React.FC<Props> = ({ story, isScanning, onReveal, selectedTheme, onThemeChange }) => {
    const [displayHeadline, setDisplayHeadline] = useState('');
    const [displayStory, setDisplayStory] = useState('');
    const [isDeciphering, setIsDeciphering] = useState(false);

    // Matrix Scramble Effect
    const scramble = (targetText: string, setter: (s: string) => void, onComplete?: () => void) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
        let iterations = 0;
        const interval = setInterval(() => {
            setter(
                targetText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) return char;
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iterations >= targetText.length) {
                clearInterval(interval);
                onComplete?.();
            }
            iterations += 1;
        }, 30);
    };

    const handleStartDecipher = () => {
        if (!story || isDeciphering) return;
        setIsDeciphering(true);
        onReveal();
        scramble(story.headline, setDisplayHeadline, () => {
            scramble(story.storytelling, setDisplayStory, () => {
                setIsDeciphering(false);
            });
        });
    };

    if (isScanning || !story) {
        return (
            <div className="intel-card scanning">
                <div className="matrix-bg"></div>
                <div className="scanning-text">ALGUIEN ESTÁ INTENTANDO DIVULGAR UNA NUEVA FAKENEWS...</div>

                <div className="theme-selector-container">
                    <label>Elegir contexto:</label>
                    <select
                        value={selectedTheme}
                        onChange={(e) => onThemeChange(e.target.value)}
                        className="theme-select"
                    >
                        {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <button className="decipher-btn" onClick={handleStartDecipher}>DESCRIPTAR AMENAZA</button>
            </div>
        );
    }

    return (
        <div className="intel-card active">
            <div className="intel-header">
                <span className="theme-tag">{story.theme}</span>
                <HelpCircle size={14} className="intel-info" />
            </div>

            <div className="intel-body">
                <h3 className="matrix-text">{displayHeadline || '#####'}</h3>
                <p className="story-text">{displayStory || '.....'}</p>

                <div className="tags-row">
                    {story.tags.map(tag => (
                        <span key={tag} className="news-tag">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="status-badge">AMENAZA ACTIVA</div>
        </div>
    );
};
