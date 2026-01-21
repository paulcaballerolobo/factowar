import React, { useState, useEffect } from 'react';
import { Shield, Zap } from 'lucide-react';
import './PowerUps.css';

interface PowerUpState {
    status: 'READY' | 'CHARGING' | 'ACTIVE';
    charge: number; // 0-100
    timeLeft?: number;
}

const PowerUps: React.FC = () => {
    const [campaign, setCampaign] = useState<PowerUpState>({
        status: 'READY',
        charge: 100,
    });

    const [friction, setFriction] = useState<PowerUpState>({
        status: 'READY',
        charge: 100,
    });

    useEffect(() => {
        const saved = localStorage.getItem('factowar_powerup_cooldowns');
        if (saved) {
            const cooldowns = JSON.parse(saved);
            if (cooldowns.campaign) setCampaign(cooldowns.campaign);
            if (cooldowns.friction) setFriction(cooldowns.friction);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            'factowar_powerup_cooldowns',
            JSON.stringify({ campaign, friction })
        );
    }, [campaign, friction]);

    const handleCampaignClick = () => {
        if (campaign.status === 'READY') {
            setCampaign({ status: 'ACTIVE', charge: 100 });
            setTimeout(() => {
                setCampaign({ status: 'CHARGING', charge: 0 });
            }, 3000);
        }
    };

    const handleFrictionClick = () => {
        if (friction.status === 'READY') {
            setFriction({ status: 'ACTIVE', charge: 100, timeLeft: 5 });
            let timeLeft = 5;
            const interval = setInterval(() => {
                timeLeft--;
                setFriction((prev) => ({ ...prev, timeLeft, charge: (timeLeft / 5) * 100 }));
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    setFriction({ status: 'CHARGING', charge: 0 });
                }
            }, 1000);
        }
    };

    return (
        <div className="power-ups">
            <div className="power-ups-header">
                <h3 className="power-ups-title">Power-Up</h3>
                <p className="power-ups-subtitle">Acciones Tácticas</p>
            </div>

            <div className="power-ups-container">
                {/* Campaña */}
                <button
                    className={`power-up power-up-${campaign.status.toLowerCase()}`}
                    onClick={handleCampaignClick}
                    disabled={campaign.status !== 'READY'}
                >
                    <div className="power-up-header-row">
                        <div className="power-up-icon campaign-icon">
                            <Shield size={28} />
                        </div>
                        <div className="power-up-info">
                            <div className="power-up-name">CAMPAÑA</div>
                            <div className="power-up-description">Reduce viralidad x5</div>
                        </div>
                    </div>

                    {/* Barra de poder PROTAGONISTA */}
                    <div className="power-bar-container">
                        <div
                            className="power-bar campaign-bar"
                            style={{ width: `${campaign.charge}%` }}
                        >
                            <span className="power-bar-label">
                                {campaign.status === 'READY' && 'LISTA'}
                                {campaign.status === 'CHARGING' && 'RECARGANDO...'}
                                {campaign.status === 'ACTIVE' && 'ACTIVA'}
                            </span>
                        </div>
                    </div>
                </button>

                {/* Fricción */}
                <button
                    className={`power-up power-up-${friction.status.toLowerCase()}`}
                    onClick={handleFrictionClick}
                    disabled={friction.status !== 'READY'}
                >
                    <div className="power-up-header-row">
                        <div className="power-up-icon friction-icon">
                            <Zap size={28} />
                        </div>
                        <div className="power-up-info">
                            <div className="power-up-name">FRICCIÓN</div>
                            <div className="power-up-description">Frena propagación 70%</div>
                        </div>
                    </div>

                    {/* Barra de poder PROTAGONISTA */}
                    <div className="power-bar-container">
                        <div
                            className="power-bar friction-bar"
                            style={{ width: `${friction.charge}%` }}
                        >
                            <span className="power-bar-label">
                                {friction.status === 'READY' && 'LISTA'}
                                {friction.status === 'CHARGING' && 'ENFRIANDO...'}
                                {friction.status === 'ACTIVE' && `${friction.timeLeft}s`}
                            </span>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PowerUps;
