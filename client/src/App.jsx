import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Pets from './pages/Pets';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import AdminPanel from './pages/AdminPanel';
import AdminShop from './pages/AdminShop';
import AdminUsers from './pages/AdminUsers';
import Inventory from './pages/Inventory';
import Garden from './pages/Garden';
import Auth from './pages/Auth';
import Friends from './pages/Friends';
import User from './pages/User';
import { AuthProvider, useAuth } from './context/AuthContext';

function DesktopLayout({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const [showProfile, setShowProfile] = React.useState(false);
  
  // Determinar sección activa basado en la ruta
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/activities') return 'activities';
    if (path === '/shop') return 'shop';
    if (path === '/pets') return 'pets';
    if (path === '/admin') return 'admin';
    if (path === '/admin-panel') return 'admin-panel';
    if (path === '/admin-shop') return 'admin-shop';
    if (path === '/admin-users') return 'admin-users';
    if (path === '/inventory') return 'inventory';
    if (path === '/garden') return 'garden';
    if (path === '/friends') return 'friends';
    if (path === '/user') return 'user';
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
          {user?.isAdmin && <span><i className="fas fa-crown"></i> admin</span>}
        </div>
      </div>

      {/* ÁREA PRINCIPAL - Contenido de tiles */}
      <div className="main-area">
        {children}
      </div>

      {/* BARRA INFERIOR - Taskbar */}
      <div className="bottom-bar">
        <a href="/" className={`task-button ${activeSection === 'home' ? 'active-task' : ''}`}>
          [inicio]
        </a>
        <a href="/activities" className={`task-button ${activeSection === 'activities' ? 'active-task' : ''}`}>
          [actividades]
        </a>
        <a href="/shop" className={`task-button ${activeSection === 'shop' ? 'active-task' : ''}`}>
          [tienda]
        </a>
        <a href="/pets" className={`task-button ${activeSection === 'pets' ? 'active-task' : ''}`}>
          [mascotas]
        </a>
        <a href="/inventory" className={`task-button ${activeSection === 'inventory' ? 'active-task' : ''}`}>
          [inventario]
        </a>
        <a href="/garden" className={`task-button ${activeSection === 'garden' ? 'active-task' : ''}`}>
          [jardín]
        </a>
        {user?.isAdmin && (
          <>
            <a href="/admin" className={`task-button ${activeSection === 'admin' ? 'active-task' : ''}`}>
              [admin]
            </a>
            <a href="/admin-panel" className={`task-button ${activeSection === 'admin-panel' ? 'active-task' : ''}`}>
              [huevos]
            </a>
            <a href="/admin-shop" className={`task-button ${activeSection === 'admin-shop' ? 'active-task' : ''}`}>
              [tienda]
            </a>
            <a href="/admin-users" className={`task-button ${activeSection === 'admin-users' ? 'active-task' : ''}`}>
              [usuarios]
            </a>
          </>
        )}
        <a href="/friends" className={`task-button ${activeSection === 'friends' ? 'active-task' : ''}`}>
          [amigos]
        </a>
        <button className="task-button" onClick={() => setShowProfile(!showProfile)}>
          [user]
        </button>
        {showProfile && (
          <div className="profile-menu">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.profilePictureUrl ? (
                  <img src={user.profilePictureUrl} alt="Profile" />
                ) : (
                  <span>{user?.username?.[0]?.toUpperCase() || 'G'}</span>
                )}
              </div>
              <div className="profile-info">
                <div className="profile-username">{user?.username || 'guest'}</div>
                <div className="profile-email">{user?.email || 'Sin email'}</div>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat">
                <div className="stat-value">{user?.totalPoints || 0}</div>
                <div className="stat-label">puntos</div>
              </div>
              <div className="stat">
                <div className="stat-value">{user?.pets?.length || 0}</div>
                <div className="stat-label">mascotas</div>
              </div>
              <div className="stat">
                <div className="stat-value">{user?.currentStreak || 0}</div>
                <div className="stat-label">racha</div>
              </div>
            </div>
            <div className="profile-actions">
              <button className="profile-btn" onClick={() => window.location.href = '/user'}>
                <i className="fas fa-user"></i> ver perfil
              </button>
            </div>
          </div>
        )}
        <button
          className="task-button"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/auth';
          }}
        >
          [salir]
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
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/admin-shop" element={<AdminShop />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/user" element={<User />} />
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
