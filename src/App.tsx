import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { GameProvider } from './context/GameContext';

// Layout components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import SiriGlowBorder from './components/Effects/SiriGlowBorder';
import Marquee from './components/HUD/Marquee';

// Page components
import PlaceholderPage from './pages/PlaceholderPage';
import GamePage from './pages/GamePage';

// Modals
import WelcomeModal from './components/Modals/WelcomeModal';

// Styles
import './styles/globals.css';

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
  };

  return (
    <UserProvider>
      <GameProvider>
        <Router>
          <div className="app-root">
            {/* Efecto global de borde */}
            <SiriGlowBorder gameState="IDLE" />

            {/* Header fijo */}
            <Header />

            {/* Contenido principal */}
            <Routes>
              {/* Página principal - Juego */}
              <Route path="/" element={<GamePage />} />

              {/* Páginas de navegación */}
              <Route path="/factos" element={<PlaceholderPage title="Factos" />} />
              <Route path="/ranking" element={<PlaceholderPage title="Ranking" />} />
              <Route path="/modelo-seiz" element={<PlaceholderPage title="Modelo SEIZ" />} />
              <Route path="/sobre-fakenews" element={<PlaceholderPage title="Sobre Fakenews" />} />
              <Route path="/proyecto-polarizor" element={<PlaceholderPage title="Proyecto Polarizor" />} />
            </Routes>

            {/* Marquee eliminado de aquí, movido a GamePage */}

            {/* Modal de bienvenida */}
            <WelcomeModal onStart={handleStart} />
          </div>
        </Router>
      </GameProvider>
    </UserProvider>
  );
}

export default App;
