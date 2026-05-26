import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Pets from './pages/Pets';
import Shop from './pages/Shop';
import Auth from './pages/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function DesktopLayout({ children, activeSection, setActiveSection }) {
  return (
    <div className="desktop-container">
      {/* BARRA SUPERIOR - Sistema info */}
      <div className="top-bar">
        <div className="sys-info">
          <span><i className="fas fa-tux"></i> theworld@linux</span>
          <span><i className="fas fa-microchip"></i> uptime: 12d 8h</span>
          <span><i className="fas fa-dragon"></i> mascotas: 14</span>
          <span><i className="fas fa-coins"></i> pts: 18.4k</span>
          <span><i className="fas fa-fire"></i> racha: 9d</span>
        </div>
      </div>

      {/* ÁREA PRINCIPAL - Contenido de tiles */}
      <div className="main-area">
        {children}
      </div>

      {/* BARRA INFERIOR - Taskbar */}
      <div className="bottom-bar">
        <button
          className={`task-button ${activeSection === 'home' ? 'active-task' : ''}`}
          onClick={() => setActiveSection('home')}
        >
          <i className="fas fa-home"></i> inicio
        </button>
        <button
          className={`task-button ${activeSection === 'activities' ? 'active-task' : ''}`}
          onClick={() => setActiveSection('activities')}
        >
          <i className="fas fa-tasks"></i> actividades
        </button>
        <button
          className={`task-button ${activeSection === 'shop' ? 'active-task' : ''}`}
          onClick={() => setActiveSection('shop')}
        >
          <i className="fas fa-store"></i> tienda
        </button>
        <button
          className={`task-button ${activeSection === 'pets' ? 'active-task' : ''}`}
          onClick={() => setActiveSection('pets')}
        >
          <i className="fas fa-paw"></i> mascotas
        </button>
        <button
          className="task-button"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/auth';
          }}
        >
          <i className="fas fa-sign-out-alt"></i> salir
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  const { user, token } = useAuth();
  const [activeSection, setActiveSection] = useState('home');

  if (!token) {
    return <Auth />;
  }

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <DesktopLayout activeSection={activeSection} setActiveSection={setActiveSection}>
            {activeSection === 'home' && <Home />}
            {activeSection === 'activities' && <Activities />}
            {activeSection === 'shop' && <Shop />}
            {activeSection === 'pets' && <Pets />}
          </DesktopLayout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;