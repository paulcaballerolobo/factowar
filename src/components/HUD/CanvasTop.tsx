import React from 'react';
import { User, Trophy, Clock, Target, Shield, Activity } from 'lucide-react';
import './CanvasTop.css';

interface CanvasTopProps {
    scoreTotal?: number;
    scoreJugada?: number;
    partidasJugadas?: number;
    dia?: number;
    maxDias?: number;
    playerName?: string;
    playerToken?: string;
}

const CanvasTop: React.FC<CanvasTopProps> = ({
    scoreTotal = 12450, // Default simulando la ref
    scoreJugada = 0,
    partidasJugadas = 3,
    dia = 1,
    maxDias = 7,
    playerName = 'Operador',
    playerToken = '#8921',
}) => {
    const progreso = (dia / maxDias) * 100;

    // Frase fija de la referencia para este diseño
    const mainTitle = "Toma el control de la red.";
    const subTitle = "¿Puedes detener esta noticia falsa antes de que explote?";

    return (
        <div className="hud-container">
            <div className="hud-content">

                {/* IZQUIERDA: Score Principal */}
                <div className="hud-metric-group primary-score-group">
                    <div className="metric-icon-box bg-accent-soft">
                        <Shield size={24} color="var(--accent-secondary)" />
                    </div>
                    <div className="metric-data">
                        <div className="metric-label">TU DESEMPEÑO FRENANDO LA DESINFORMACIÓN</div>
                        <div className="metric-value-huge text-gradient">
                            {scoreTotal.toLocaleString()} <span className="pts-suffix">PTS</span>
                        </div>
                    </div>
                </div>

                {/* CENTRO: Mensaje de Misión */}
                <div className="hud-mission-center">
                    <h2 className="mission-title">{mainTitle}</h2>
                    <p className="mission-subtitle">{subTitle}</p>
                </div>

                {/* DERECHA: Tiempo */}
                <div className="hud-metric-group time-group">
                    <div className="metric-label right-align">TIEMPO DE SIMULACIÓN</div>
                    <div className="metric-value-large mono-font">14:32:05</div>
                </div>
            </div>

            {/* BARRA INFERIOR DE ESTADO (Ref 1 style) */}
            <div className="hud-bottom-bar">

                {/* Controles Play/Pause (Simulados visualmente) */}
                <div className="sim-controls">
                    <button className="control-btn active"><div className="icon-play"></div></button>
                    <button className="control-btn"><div className="icon-pause"></div></button>
                    <button className="control-btn"><div className="icon-forward"></div></button>
                </div>

                <div className="divider-vertical"></div>

                {/* Barra de Progreso Días */}
                <div className="day-progress-section">
                    <span className="day-label">Día {dia}/{maxDias}</span>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progreso}%` }}></div>
                    </div>
                </div>

                {/* Métricas Secundarias */}
                <div className="secondary-metrics">
                    <div className="mini-metric">
                        <div className="icon-circle bg-blue-soft"><Activity size={16} className="text-blue" /></div>
                        <div className="mini-metric-info">
                            <span className="mini-label">EXPOSICIÓN</span>
                            <span className="mini-value text-blue">88%</span>
                        </div>
                    </div>

                    <div className="mini-metric">
                        <div className="icon-circle bg-rose-soft"><Target size={16} className="text-rose" /></div>
                        <div className="mini-metric-info">
                            <span className="mini-label">IMPACTO</span>
                            <span className="mini-value text-rose">62%</span>
                        </div>
                    </div>

                    <div className="mini-metric">
                        <div className="icon-circle bg-purple-soft"><NetworkIcon size={16} className="text-purple" /></div>
                        <div className="mini-metric-info">
                            <span className="mini-label">POLARIZACIÓN</span>
                            <span className="mini-value text-purple">44%</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Icono auxiliar
const NetworkIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" /></svg>
)

export default CanvasTop;
