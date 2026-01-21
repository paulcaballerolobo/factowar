import React, { useEffect, useState } from 'react';
import './FakeNewsBox.css';

interface FakeNewsBoxProps {
    gameState: 'IDLE' | 'RUNNING';
    activeNews?: {
        theme: string;
        storytelling: string;
        headline: string;
        tags: string[];
    };
}

const FakeNewsBox: React.FC<FakeNewsBoxProps> = ({ gameState, activeNews }) => {
    // Matriz de caracteres individuais para poder animar independientemente
    const rows = 6;
    const cols = 30;
    const [noiseMatrix, setNoiseMatrix] = useState<string[][]>(
        Array(rows).fill(null).map(() => Array(cols).fill(''))
    );

    // Initial fill
    useEffect(() => {
        if (gameState === 'IDLE') {
            const fillingMatrix = Array(rows).fill(null).map(() =>
                Array(cols).fill(null).map(() => getRandomChar())
            );
            setNoiseMatrix(fillingMatrix);
        }
    }, [gameState]);


    // Animación Staggered (Uno por uno o grupos pequeños)
    useEffect(() => {
        if (gameState !== 'IDLE') return;

        const interval = setInterval(() => {
            setNoiseMatrix(prevMatrix => {
                const newMatrix = [...prevMatrix.map(row => [...row])];
                // Cambiar solo un 10% de los caracteres en cada tick para efecto "lluvia/glitch" suave
                // en lugar de refrescar todo de golpe.
                for (let i = 0; i < 20; i++) { // 20 cambios por tick
                    const r = Math.floor(Math.random() * rows);
                    const c = Math.floor(Math.random() * cols);
                    newMatrix[r][c] = getRandomChar();
                }
                return newMatrix;
            });
        }, 100); // Velocidad rápida

        return () => clearInterval(interval);
    }, [gameState]);

    function getRandomChar() {
        // Incluir minúsculas como pedido
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    if (gameState === 'IDLE') {
        return (
            <div className="fakenews-box fakenews-box-idle">
                <div className="fakenews-noise">
                    {noiseMatrix.map((row, i) => (
                        <div key={i} className="noise-row">
                            {row.map((char, j) => (
                                <span key={j} className="noise-char">
                                    {char}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!activeNews) return null;

    return (
        <div className="fakenews-box fakenews-box-running">
            <div className="fakenews-context">
                {activeNews.theme.toLowerCase()}
            </div>
            <div className="fakenews-storytelling">{activeNews.storytelling}</div>
            <div className="fakenews-headline">{activeNews.headline}</div>
            <div className="fakenews-tags">
                {activeNews.tags.map((tag, index) => (
                    <span key={index} className="fakenews-tag">
                        {tag.toLowerCase()}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FakeNewsBox;
