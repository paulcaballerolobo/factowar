import React, { useState, useEffect, useRef } from 'react';
import './LevelsSelector.css';

interface LevelsSelectorProps {
    currentLevel: number;
    onLevelChange?: (level: number) => void;
}

interface LevelInfo {
    id: number;
    name: string;
    tagline: string;
    description: string;
    resistance: string;
    bgGradient: string;
    color: string; // Color plano principal
}

const levels: LevelInfo[] = [
    {
        id: 1,
        name: 'El Ágora',
        tagline: 'La Verdad Importa',
        description: 'Ecosistema digital saludable donde la verificación es prioridad.',
        resistance: 'BAJA',
        bgGradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', // Verde Intenso
        color: '#10B981'
    },
    {
        id: 2,
        name: 'La Plaza',
        tagline: 'Ruido de Fondo',
        description: 'Espacio público con desinformación ocasional pero controlable.',
        resistance: 'MEDIA',
        bgGradient: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)', // Ámbar Intenso
        color: '#F59E0B'
    },
    {
        id: 3,
        name: 'Cámara de Eco',
        tagline: 'Amistades Peligrosas',
        description: 'Burbujas de filtro donde la verdad compite con la narrativa.',
        resistance: 'ALTA',
        bgGradient: 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)', // Naranja Quemado
        color: '#F97316'
    },
    {
        id: 4,
        name: 'El Laberinto',
        tagline: 'Terreno Hostil',
        description: 'Entorno polarizado donde la desinformación domina el algoritmo.',
        resistance: 'MUY ALTA',
        bgGradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)', // Rojo Sangre
        color: '#EF4444'
    },
    {
        id: 5,
        name: 'Zona Zero',
        tagline: 'Viralidad Total',
        description: 'Caos informativo. El algoritmo prioriza la indignación sobre la verdad.',
        resistance: 'CRÍTICA',
        bgGradient: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)', // Púrpura Profundo
        color: '#A855F7'
    },
];

const LevelsSelector: React.FC<LevelsSelectorProps> = ({
    currentLevel,
    onLevelChange,
}) => {
    const [selectedLevel, setSelectedLevel] = useState(currentLevel);
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    const intervalRef = useRef<number | undefined>(undefined);

    // Auto-rotation effect
    useEffect(() => {
        if (!isAutoRotating) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = window.setInterval(() => {
            setSelectedLevel(prev => (prev < 5 ? prev + 1 : 1));
        }, 3000); // 3 seconds rotation

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isAutoRotating]);


    const handleLevelClick = (levelId: number) => {
        setSelectedLevel(levelId);
        setIsAutoRotating(false); // Stop rotation on manual selection
        if (onLevelChange) {
            onLevelChange(levelId);
        }
    };

    const handleNext = () => {
        const newLevel = selectedLevel < 5 ? selectedLevel + 1 : 1;
        handleLevelClick(newLevel);
    };

    const currentLevelInfo = levels.find((l) => l.id === selectedLevel) || levels[0];

    return (
        <div className="levels-selector">
            <div className="levels-header">
                <span className="levels-title">Nivel de Amenaza</span>
                <span className="levels-subtitle">Elige la complejidad de tu red</span>
            </div>

            <div className="levels-navigation" style={{ justifyContent: 'center' }}>
                <div className="level-card-container">
                    <div
                        className="level-card"
                        style={{ background: currentLevelInfo.bgGradient }}
                        onClick={handleNext}
                        role="button"
                        tabIndex={0}
                    >
                        {/* TAG LATERAL */}
                        <div className="level-resistance-tag">
                            resistencia {currentLevelInfo.resistance.toLowerCase()}
                        </div>

                        <div className="level-content">
                            <div className="level-number">NIVEL 0{currentLevelInfo.id}</div>
                            <h3 className="level-name">{currentLevelInfo.name}</h3>
                            <p className="level-tagline">{currentLevelInfo.tagline}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="levels-dots">
                {levels.map((level) => (
                    <button
                        key={level.id}
                        className={`level-dot ${selectedLevel === level.id ? 'active' : ''}`}
                        onClick={() => handleLevelClick(level.id)}
                        aria-label={`Nivel ${level.id}`}
                        style={{
                            background: selectedLevel === level.id ? level.color : undefined
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default LevelsSelector;
