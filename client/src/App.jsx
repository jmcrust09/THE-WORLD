import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Pets from './pages/Pets';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';

function DesktopLayout({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  // Determinar sección activa basado en la ruta
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/activities') return 'activities';
    if (path === '/shop') return 'shop';
    if (path === '/pets') return 'pets';
    if (path === '/admin') return 'admin';
    if (path === '/inventory') return 'inventory';
    if (path === '/garden') return 'garden';
    return 'home';
  };

  const activeSection = getActiveSection();

  return (
    <div className="desktop-container">
      {/* BARRA SUPERIOR - Sistema info */}
      <div className="top-bar">
        <div className="sys-info">
          <span><i className="fas fa-tux"></i> theworld@linux</span>
          <span><i className="fas fa-microchip"></i> usuario: {user?.username || 'guest'}</span>
          <span><i className="fas fa-dragon"></i> mascotas: {user?.pets?.length || 0}</span>
          <span><i className="fas fa-coins"></i> pts: {user?.totalPoints || 0}</span>
          <span><i className="fas fa-fire"></i> racha: {user?.currentStreak || 0}d</span>
        </div>
      </div>

      {/* ÁREA PRINCIPAL - Contenido de tiles */}
      <div className="main-area">
        {children}
      </div>

      {/* BARRA INFERIOR - Taskbar */}
      <div className="bottom-bar">
        <a href="/" className={`task-button ${activeSection === 'home' ? 'active-task' : ''}`}>
          <i className="fas fa-home"></i> inicio
        </a>
        <a href="/activities" className={`task-button ${activeSection === 'activities' ? 'active-task' : ''}`}>
          <i className="fas fa-tasks"></i> actividades
        </a>
        <a href="/shop" className={`task-button ${activeSection === 'shop' ? 'active-task' : ''}`}>
          <i className="fas fa-store"></i> tienda
        </a>
        <a href="/pets" className={`task-button ${activeSection === 'pets' ? 'active-task' : ''}`}>
          <i className="fas fa-paw"></i> mascotas
        </a>
        {user?.isAdmin && (
          <a href="/admin" className={`task-button ${activeSection === 'admin' ? 'active-task' : ''}`}>
            <i className="fas fa-cog"></i> admin
          </a>
        )}
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

  if (!token) {
    return <Auth />;
  }

  return (
    <DesktopLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/auth" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DesktopLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
