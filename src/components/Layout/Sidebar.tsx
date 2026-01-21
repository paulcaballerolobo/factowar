import React from 'react';
import LevelsSelector from './LevelsSelector';
import FakeNewsBox from './FakeNewsBox';
import ControlSliders from './ControlSliders';
import PowerUps from './PowerUps';
import './Sidebar.css';

interface SidebarProps {
    gameState?: 'IDLE' | 'RUNNING';
    activeNews?: any;
    difficultyLevel?: number;
    onLevelChange?: (level: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    gameState = 'IDLE',
    activeNews,
    difficultyLevel = 1,
    onLevelChange,
}) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-content">
                {/* Módulo 1: Levels (PRIMERO) */}
                <LevelsSelector
                    currentLevel={difficultyLevel}
                    onLevelChange={onLevelChange}
                />

                {/* Módulo 2: FakeNews Box */}
                <FakeNewsBox gameState={gameState} activeNews={activeNews} />

                {/* Módulo 3: Sliders (HORIZONTALES) */}
                <ControlSliders gameState={gameState} />

                {/* Módulo 4: Power-Ups */}
                <PowerUps />
            </div>
        </aside>
    );
};

export default Sidebar;
