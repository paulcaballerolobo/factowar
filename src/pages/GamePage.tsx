import React from 'react';
import { useGame } from '../context/GameContext';
import Sidebar from '../components/Layout/Sidebar';
import { NodeCanvas } from '../components/Simulation/NodeCanvas';
import CanvasTop from '../components/HUD/CanvasTop';
import { ResultModal } from '../components/Modals/ResultModal';
import Marquee from '../components/HUD/Marquee';
// import { calculateAllHUDs } from '../engine/hudCalculations';

const GamePage: React.FC = () => {
    const { gameState, levelId, activeStory, cumulativeScore, currentJugadaScore } = useGame();

    // Calcular HUDs (por ahora con datos simulados)
    // Cast Node[] to the compatible type if needed, but since we updated HUD calculations, strictly they should match 
    // except specific extra props. We can just pass it as any or ensure compatibility.
    // The issue was clusterID vs type. We fixed that.

    return (
        <div className="main-layout">
            {/* Sidebar */}
            <Sidebar
                gameState={gameState.status === 'RUNNING' ? 'RUNNING' : 'IDLE'}
                activeNews={activeStory}
                difficultyLevel={levelId}
            />

            {/* Canvas area */}
            <div className="canvas-area" style={{ position: 'relative' }}>
                {/* Canvas-Top con scores y perfil */}
                <CanvasTop
                    scoreTotal={cumulativeScore}
                    scoreJugada={currentJugadaScore}
                    partidasJugadas={1} // TODO: Add to global context
                    dia={gameState.time.day}
                    maxDias={30}
                    playerName="Operador"
                    playerToken="TOKEN-X89" // Placeholder
                />

                {/* Canvas de nodos - VISIBLE */}
                <div className="canvas-container">
                    <NodeCanvas gameState={gameState} />
                </div>

                {/* Marquee INTEGRADO EN CANVAS */}
                <Marquee gameState={gameState.status === 'RUNNING' ? 'RUNNING' : 'IDLE'} />
            </div>

            {/* Modal de resultados */}
            <ResultModal />
        </div>
    );
};

export default GamePage;
