import React, { useEffect, useState } from 'react';
import './Marquee.css';
import { CheckCircle, AlertTriangle, Lock } from 'lucide-react';

interface MarqueeProps {
    gameState?: 'IDLE' | 'ALERT' | 'CRITICAL' | 'RUNNING';
}

const Marquee: React.FC<MarqueeProps> = ({ gameState = 'IDLE' }) => {
    const [message, setMessage] = useState('');
    const [icon, setIcon] = useState<React.ReactNode>(null);
    const [stateClass, setStateClass] = useState('idle');

    useEffect(() => {
        switch (gameState) {
            case 'IDLE':
                setMessage('SISTEMA SINCRONIZADO // MONITOREO ACTIVO // SIN AMENAZAS');
                setIcon(<CheckCircle size={16} />);
                setStateClass('idle');
                break;
            case 'RUNNING':
            case 'ALERT':
                setMessage('⚠️ ANOMALÍA DETECTADA // INYECCIÓN DE DATOS NO VERIFICADOS // ACTIVAR FILTROS');
                setIcon(<AlertTriangle size={16} />);
                setStateClass('alert');
                break;
            case 'CRITICAL':
                setMessage('⛔ SISTEMA COMPROMETIDO // CONTROLES DESHABILITADOS // PROTOCOLOS DE EMERGENCIA');
                setIcon(<Lock size={16} />);
                setStateClass('critical');
                break;
        }
    }, [gameState]);

    return (
        <div className={`marquee marquee-${stateClass}`}>
            <div className="marquee-content">
                <span className="marquee-icon">{icon}</span>
                <span className="marquee-text">{message}</span>
                <span className="marquee-separator">•</span>
                <span className="marquee-icon">{icon}</span>
                <span className="marquee-text">{message}</span>
                <span className="marquee-separator">•</span>
            </div>
        </div>
    );
};

export default Marquee;
