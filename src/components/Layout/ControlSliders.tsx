import React, { useState } from 'react';

import './ControlSliders.css';

interface ControlSlidersProps {
    isLocked?: boolean;
}

interface SliderConfig {
    id: string;
    label: string;
    tooltip: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    color: string;
    suffix?: string;
    displayMultiplier?: number;
}

const sliders: SliderConfig[] = [
    {
        id: 'moderation',
        label: 'Moderación',
        tooltip: 'Capacidad de curación',
        min: 0,
        max: 1,
        step: 0.05,
        defaultValue: 0.5,
        color: 'var(--accent-success)', // Verde
        displayMultiplier: 100,
        suffix: '%'
    },
    {
        id: 'polarization',
        label: 'Polarización',
        tooltip: 'Fragmentación de la red',
        min: 0,
        max: 1,
        step: 0.05,
        defaultValue: 0.5,
        color: 'var(--accent-tertiary)', // Púrpura
        displayMultiplier: 100,
        suffix: '%'
    },
    {
        id: 'delay',
        label: 'Días Fact-Check',
        tooltip: 'Tiempo de respuesta',
        min: 0,
        max: 30,
        step: 1,
        defaultValue: 5,
        color: 'var(--accent-cyan)', // Cyan
        displayMultiplier: 1,
        suffix: 'd'
    },
    {
        id: 'engagement',
        label: 'Engagement Rate',
        tooltip: 'Velocidad de propagación',
        min: 0,
        max: 1,
        step: 0.05,
        defaultValue: 0.5,
        color: 'var(--accent-primary)', // Azul
        displayMultiplier: 100,
        suffix: '%'
    },
    {
        id: 'controversy',
        label: 'Amplificación',
        tooltip: 'Probabilidad de infección',
        min: 0,
        max: 1,
        step: 0.05,
        defaultValue: 0.5,
        color: 'var(--accent-secondary)', // Fucsia
        displayMultiplier: 100,
        suffix: '%'
    },
];

const ControlSliders: React.FC<ControlSlidersProps> = ({
    isLocked = false,
}) => {
    const [values, setValues] = useState<Record<string, number>>(
        sliders.reduce((acc, slider) => {
            acc[slider.id] = slider.defaultValue;
            return acc;
        }, {} as Record<string, number>)
    );

    const handleSliderChange = (id: string, value: number) => {
        if (isLocked) return;
        setValues((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="control-sliders">
            <div className="sliders-header">
                <span className="power-ups-title" style={{ fontSize: 20 }}>Variables de Red</span>
                <span className="power-ups-subtitle" style={{ display: 'block', marginTop: 4 }}>Administra tus variables</span>
            </div>

            <div className="sliders-container-horizontal">
                {sliders.map((slider) => (
                    <div key={slider.id} className="slider-group-horizontal">
                        <div className="slider-label-row-horizontal">
                            <span className="slider-label-horizontal">{slider.label}</span>
                            <span className="slider-value-display" style={{ color: slider.color }}>
                                {(values[slider.id] * (slider.displayMultiplier || 1)).toFixed(0)}{slider.suffix}
                            </span>
                        </div>

                        <input
                            type="range"
                            min={slider.min}
                            max={slider.max}
                            step={slider.step}
                            value={values[slider.id]}
                            onChange={(e) =>
                                handleSliderChange(slider.id, parseFloat(e.target.value))
                            }
                            className="slider-input-horizontal"
                            disabled={isLocked}
                            style={{ '--slider-color': slider.color } as React.CSSProperties}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ControlSliders;
