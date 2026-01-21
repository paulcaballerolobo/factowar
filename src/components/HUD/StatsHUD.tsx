import React from 'react';
import { ShieldCheck, Globe, Users, GitBranch } from 'lucide-react';
import './StatsHUD.css';

interface StatsHUDProps {
    // Métricas calculadas
    exposure?: number; // Porcentaje de nodos expuestos (E)
    impact?: number; // Alcance total (infectados + expuestos)
    polarization?: number; // Nivel de polarización
    clusters?: number; // Número de clusters formados

    // Tiempo
    day?: number;
    maxDays?: number;
}

const StatsHUD: React.FC<StatsHUDProps> = ({
    exposure = 0,
    impact = 0,
    polarization = 0,
    clusters = 0,
    day = 0,
    maxDays = 30,
}) => {
    // Calcular color dinámico para exposición (verde → rojo)
    const getExposureColor = (value: number) => {
        if (value < 30) return 'var(--color-cure-green)';
        if (value < 60) return 'var(--color-warning-amber)';
        return 'var(--color-infection-red)';
    };

    return (
        <div className="stats-hud">
            {/* HUD 1: Exposición */}
            <div className="hud-card">
                <div className="hud-icon" style={{ color: getExposureColor(exposure) }}>
                    <ShieldCheck size={20} />
                </div>
                <div className="hud-content">
                    <div className="hud-value" style={{ color: getExposureColor(exposure) }}>
                        {exposure.toFixed(0)}%
                    </div>
                    <div className="hud-label">EXPOSICIÓN</div>
                </div>
            </div>

            {/* HUD 2: Impacto */}
            <div className="hud-card">
                <div className="hud-icon" style={{ color: 'var(--color-fuchsia)' }}>
                    <Globe size={20} />
                </div>
                <div className="hud-content">
                    <div className="hud-value">{impact.toFixed(0)}</div>
                    <div className="hud-label">IMPACTO</div>
                </div>
            </div>

            {/* HUD 3: Polarización */}
            <div className="hud-card">
                <div className="hud-icon" style={{ color: 'var(--color-warning-amber)' }}>
                    <GitBranch size={20} />
                </div>
                <div className="hud-content">
                    <div className="hud-value">{polarization.toFixed(0)}%</div>
                    <div className="hud-label">POLARIZACIÓN</div>
                </div>
            </div>

            {/* HUD 4: Clusters */}
            <div className="hud-card">
                <div className="hud-icon" style={{ color: 'var(--color-electric-blue)' }}>
                    <Users size={20} />
                </div>
                <div className="hud-content">
                    <div className="hud-value">{clusters}</div>
                    <div className="hud-label">CLUSTERS</div>
                </div>
            </div>

            {/* HUD 5: Tiempo */}
            <div className="hud-card">
                <div className="hud-content">
                    <div className="hud-value">
                        {day.toString().padStart(2, '0')} / {maxDays}
                    </div>
                    <div className="hud-label">DÍA</div>
                </div>
            </div>
        </div>
    );
};

export default StatsHUD;
