import React, { useState, useEffect } from 'react';
import { useAudioFeedback } from '../../hooks/useAudioFeedback';
import { HelpCircle } from 'lucide-react';
import './ResistanceSlider.css';

interface Props {
    label: string;
    value: number; // 0.0 - 1.0 (User Intention)
    resistance: number; // 0.0 - 1.0 (CRA: System Resistance)
    onChange: (val: number) => void;
    tooltipText: string;
    min?: number;
    max?: number;
}

export const ResistanceSlider: React.FC<Props> = ({
    label,
    value,
    resistance,
    onChange,
    tooltipText,
    min = 0,
    max = 1
}) => {
    const { playStatic, stopStatic } = useAudioFeedback();
    const [isDragging, setIsDragging] = useState(false);

    // Calculate "Glitch Intensity" based on Resistance
    // Higher resistance = More Glitch
    const glitchIntensity = resistance > 0.3 ? resistance : 0;

    // Calculate Real Value manually here just for visualization difference if we needed it?
    // Actually, the engine calculates the real effect.
    // Here we just visualize the "Friction" between User Input vs System.
    // If Resistance is high, the slider shakes.

    useEffect(() => {
        if (isDragging && glitchIntensity > 0.4) {
            playStatic(glitchIntensity);
        } else {
            stopStatic();
        }
    }, [isDragging, glitchIntensity, playStatic, stopStatic]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseFloat(e.target.value));
    };

    return (
        <div className={`slider-container ${isDragging && glitchIntensity > 0.5 ? 'glitching' : ''}`}>
            <div className="slider-label-row">
                <span>{label}</span>
                <div style={{ position: 'relative' }}>
                    <HelpCircle size={14} className="help-icon" />
                    <div className="tooltip-content">
                        {tooltipText}
                    </div>
                </div>
            </div>

            <div className="slider-input-wrapper">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={0.01}
                    value={value}
                    className="facto-slider"
                    onChange={handleChange}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => { setIsDragging(false); stopStatic(); }}
                    onMouseLeave={() => { setIsDragging(false); stopStatic(); }}
                />
            </div>

            {/* Resistance Indicator (Optional numeric debug?) */}
            {/* <div style={{ fontSize: '0.7em', color: '#555' }}>RES: {(resistance * 100).toFixed(0)}%</div> */}
        </div>
    );
};
