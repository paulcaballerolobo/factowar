import React, { useState, useEffect } from 'react';
import './NewsTicker.css';
import type { TickerMessage } from '../../engine/types';

interface Props {
    messages: TickerMessage[];
    activeAlert: string | null;
}

export const NewsTicker: React.FC<Props> = ({ messages, activeAlert }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedAlert, setDisplayedAlert] = useState<string | null>(null);
    const [alertStartTime, setAlertStartTime] = useState<number | null>(null);

    useEffect(() => {
        const checkAlert = () => {
            const now = Date.now();

            if (activeAlert) {
                if (!displayedAlert) {
                    setDisplayedAlert(activeAlert);
                    setAlertStartTime(now);
                } else if (displayedAlert !== activeAlert) {
                    if (alertStartTime && now - alertStartTime > 10000) {
                        setDisplayedAlert(activeAlert);
                        setAlertStartTime(now);
                    }
                }
            } else {
                if (displayedAlert && alertStartTime && now - alertStartTime > 10000) {
                    setDisplayedAlert(null);
                    setAlertStartTime(null);
                }
            }
        };

        const interval = setInterval(checkAlert, 1000);
        checkAlert();
        return () => clearInterval(interval);
    }, [activeAlert, displayedAlert, alertStartTime]);

    useEffect(() => {
        if (!displayedAlert) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % messages.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [displayedAlert, messages.length]);

    const displayMessage = displayedAlert || messages[currentIndex]?.text || "";

    return (
        <div className={`ticker-wrapper ${displayedAlert ? 'red-alert' : ''}`}>
            <div className="ticker-label">NEWS FEED</div>
            <div className="ticker-track">
                <div className={`ticker-content ${displayedAlert ? 'blinking paused' : 'scrolling'}`}>
                    {displayMessage.toLowerCase()}
                </div>
            </div>
        </div>
    );
};
