import React from 'react';
import { useUser } from '../../context/UserContext';
import { useGame } from '../../context/GameContext';
import {
    Ghost as GhostIcon,
    Glasses as AnalistaIcon,
    Shield as CentinelaIcon,
    Zap as ActivistaIcon,
    Headset as OperadorIcon,
    Eye,
    Zap,
    GitBranch,
    HelpCircle
} from 'lucide-react';
import './TopHUD.css';

const AVATAR_ICONS: Record<number, React.ElementType> = {
    1: GhostIcon,
    2: AnalistaIcon,
    3: CentinelaIcon,
    4: ActivistaIcon,
    5: OperadorIcon
};

export const TopHUD: React.FC = () => {
    const { identity } = useUser();
    const { gameState, cumulativeScore, currentJugadaScore } = useGame();
    const { stats, time } = gameState;

    if (!identity) return null;

    const AvatarIcon = AVATAR_ICONS[identity.avatarId] || GhostIcon;

    const healthPercent = stats.health;
    const healthClass = healthPercent < 30 ? 'critical' : healthPercent < 70 ? 'warning' : 'normal';

    return (
        <div className="top-hud">
            {/* Operator Info */}
            <div className="sidebar-identity">
                <div className="hud-profile">
                    <div className="hud-avatar-container">
                        <AvatarIcon className="hud-avatar-icon" size={20} />
                    </div>
                    <div className="hud-user-info">
                        <span className="hud-user-name">{identity.alias.toUpperCase()}</span>
                        <span className="hud-user-id">#{identity.shortId || 'INVITADO'}</span>
                    </div>
                </div>
            </div>

            {/* Tactical Metrics Bar (Ref Image Inspired) */}
            <div className="hud-metrics-bar">
                <div className="hud-day-compact">
                    <span className="day-text">Día {time.day}/30</span>
                    <div className="day-progress-bg">
                        <div className="day-progress-fill" style={{ width: `${(time.day / 30) * 100}%` }} />
                    </div>
                </div>

                <div className="metric-item exposition">
                    <div className="metric-icon-box"><Eye size={14} /></div>
                    <div className="metric-data">
                        <span className="metric-label">EXPOSICIÓN</span>
                        <span className="metric-value">{stats.exposure?.toFixed(0) || 0}%</span>
                    </div>
                </div>

                <div className="metric-item impact">
                    <div className="metric-icon-box"><Zap size={14} /></div>
                    <div className="metric-data">
                        <span className="metric-label">IMPACTO</span>
                        <span className="metric-value">{stats.impact?.toFixed(0) || 0}%</span>
                    </div>
                </div>

                <div className="metric-item polarization">
                    <div className="metric-icon-box"><GitBranch size={14} /></div>
                    <div className="metric-data">
                        <span className="metric-label">POLARIZACIÓN</span>
                        <span className="metric-value">{stats.polarization?.toFixed(0) || 0}%</span>
                    </div>
                </div>

                <div className="metric-item skepticism">
                    <div className="metric-icon-box"><HelpCircle size={14} /></div>
                    <div className="metric-data">
                        <span className="metric-label">ESCEPTICISMO</span>
                        <span className="metric-value">{stats.skepticism?.toFixed(0) || 0}%</span>
                    </div>
                </div>
            </div>

            {/* Scores & Health Section */}
            <div className="hud-end-section">
                <div className="hud-scores-compact">
                    <div className="score-mini">
                        <span className="mini-label">JUGADA</span>
                        <span className="mini-value">{currentJugadaScore.toLocaleString()}</span>
                    </div>
                    <div className="score-mini">
                        <span className="mini-label">PARTIDA</span>
                        <span className="mini-value total">{cumulativeScore.toLocaleString()}</span>
                    </div>
                </div>

                <div className="hud-health-mini">
                    <div className="health-label-mini">INTEGRIDAD</div>
                    <div className="health-bar-mini">
                        <div className={`health-fill-mini ${healthClass}`} style={{ width: `${healthPercent}%` }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
