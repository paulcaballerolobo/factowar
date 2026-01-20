import React from 'react';
import { UserProvider } from './context/UserContext';
import { GameProvider, useGame } from './context/GameContext';
import { NodeCanvas } from './components/Simulation/NodeCanvas';
import { TEXT_ASSETS } from './config/TextAssets';

import { ResistanceSlider } from './components/Controls/ResistanceSlider';
import { LEVEL_CONFIG } from './config/GameConfig';

const GameContainer: React.FC = () => {
  const { gameState, startLevel, stopLevel, isPlaying, controls, setControls, levelId } = useGame();

  const currentLevel = LEVEL_CONFIG[levelId as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG[1];
  const resistance = currentLevel.cra; // Base resistance for now

  const handleControlChange = (key: keyof typeof controls, val: number) => {
    setControls({ ...controls, [key]: val });
  };

  const { stats } = gameState;

  return (
    <div style={{ padding: 20, background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'monospace' }}>
      <header style={{ marginBottom: 20, borderBottom: '1px solid #333' }}>
        <h1 style={{ color: '#F0F' }}>{TEXT_ASSETS.HEADER.TITLE}</h1>
        <p>{TEXT_ASSETS.HEADER.SUBTITLE}</p>
      </header>

      <main style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 2 }}>
          <NodeCanvas gameState={gameState} />
        </div>

        <aside style={{ flex: 1, border: '1px solid #333', padding: 20 }}>
          <h2>CONTROL</h2>
          <div style={{ marginBottom: 20 }}>
            Status: <span style={{ color: isPlaying ? '#0F0' : '#F00' }}>{gameState.status}</span>
            <br />
            Day: {gameState.time.day}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 20 }}>
            <ResistanceSlider
              label={TEXT_ASSETS.CONTROLS.ENGAGEMENT.LABEL}
              tooltipText={TEXT_ASSETS.CONTROLS.ENGAGEMENT.TOOLTIP}
              value={controls.engagement}
              onChange={(v) => handleControlChange('engagement', v)}
              resistance={resistance}
            />
            <ResistanceSlider
              label={TEXT_ASSETS.CONTROLS.CONTROVERSY.LABEL}
              tooltipText={TEXT_ASSETS.CONTROLS.CONTROVERSY.TOOLTIP}
              value={controls.controversy}
              onChange={(v) => handleControlChange('controversy', v)}
              resistance={resistance}
            />
            <ResistanceSlider
              label={TEXT_ASSETS.CONTROLS.MODERATION.LABEL}
              tooltipText={TEXT_ASSETS.CONTROLS.MODERATION.TOOLTIP}
              value={controls.moderation}
              onChange={(v) => handleControlChange('moderation', v)}
              resistance={resistance}
            />
            <ResistanceSlider
              label={TEXT_ASSETS.CONTROLS.PROPAGATION.LABEL}
              tooltipText={TEXT_ASSETS.CONTROLS.PROPAGATION.TOOLTIP}
              value={controls.propagation}
              onChange={(v) => handleControlChange('propagation', v)}
              resistance={resistance}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <button onClick={() => startLevel(1)} disabled={isPlaying}>
              START LEVEL 1
            </button>
            <button onClick={stopLevel} disabled={!isPlaying}>
              STOP
            </button>
          </div>

          <h3>METRICS</h3>
          <ul>
            <li style={{ color: '#F0F' }}>Infected: {stats.infectedCount}</li>
            <li style={{ color: '#FF0' }}>Exposed: {stats.exposedCount}</li>
            <li style={{ color: '#0FF' }}>Recovered: {stats.recoveredCount}</li>
            <li>Health: {stats.health.toFixed(1)}%</li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </UserProvider>
  );
}

export default App;
