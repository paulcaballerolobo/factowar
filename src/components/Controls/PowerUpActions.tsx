import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { TEXT_ASSETS } from '../../config/TextAssets';
import './PowerUpActions.css';

interface Props {
    powerUps: {
        campaign: { active: boolean; ready: boolean; progress: number };
        friction: { active: boolean; timeLeft: number };
    };
    onActivate: (type: 'friction' | 'campaign') => void;
    isPlaying: boolean;
}

export const PowerUpActions: React.FC<Props> = ({ powerUps, onActivate, isPlaying }) => {
    return (
        <div className="powerups-container">
            {/* Campaign / Inoculación */}
            <button
                className={`powerup-btn ${powerUps.campaign.active ? 'active' : ''}`}
                onClick={() => onActivate('campaign')}
                disabled={!isPlaying || powerUps.campaign.active}
            >
                <div className="powerup-header">
                    <span className="powerup-title">{TEXT_ASSETS.TACTICAL.INOCULATION.TITLE}</span>
                    <Shield size={16} className="powerup-icon" />
                </div>
                <div className="powerup-description">
                    {TEXT_ASSETS.TACTICAL.INOCULATION.DESC}
                </div>
                {powerUps.campaign.active && (
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${powerUps.campaign.progress}%` }}
                        ></div>
                        <div className="powerup-status">
                            {powerUps.campaign.ready ? 'INMUNIZACIÓN ACTIVA' : 'CARGANDO PROTOCOLO...'}
                        </div>
                    </div>
                )}
            </button>

            {/* Friction / Ralentización */}
            <button
                className={`powerup-btn ${powerUps.friction.active ? 'active' : ''}`}
                onClick={() => onActivate('friction')}
                disabled={!isPlaying || powerUps.friction.active}
            >
                <div className="powerup-header">
                    <span className="powerup-title">{TEXT_ASSETS.TACTICAL.FRICTION.TITLE}</span>
                    <Zap size={16} className="powerup-icon" />
                </div>
                <div className="powerup-description">
                    {TEXT_ASSETS.TACTICAL.FRICTION.DESC}
                </div>
                {powerUps.friction.active && (
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: `${(powerUps.friction.timeLeft / 300) * 100}%`,
                                background: '#0FF'
                            }}
                        ></div>
                        <div className="powerup-status" style={{ color: '#0FF' }}>
                            CONTRA-MEDIDA ACTIVA
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
};
