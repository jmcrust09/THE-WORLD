import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Pets from './pages/Pets';
import Shop from './pages/Shop';
import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="terminal">
        <div className="window-bar">
          <div className="window-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="window-title">🌍 <span>the world</span></div>
          <div className="flex-1"></div>
          <nav className="flex flex-wrap gap-2">
            <NavLink to="/" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/actividades" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>Actividades</NavLink>
            <NavLink to="/mascotas" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>Mascotas</NavLink>
            <NavLink to="/tienda" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>Tienda</NavLink>
          </nav>
        </div>
        <div className="desktop-shell">
          {children}
        </div>
        <div className="mt-8 pt-4 border-t border-beige flex flex-col gap-2 sm:flex-row sm:justify-between text-[13px] text-grey tracking-wide">
          <span className="bg-[rgba(227,221,212,0.3)] px-4 py-1 rounded-full border border-beige font-light">
            ✶ made by <em className="not-italic text-dark font-medium">wm</em> ✶
          </span>
          <span className="text-[11px] text-grey2 uppercase tracking-[0.2em]">monarch-style tiles · productividad + mascotas</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública para login/registro */}
          <Route path="/auth" element={<Auth />} />

          {/* Rutas protegidas (envueltas en PrivateRoute + Layout) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/actividades"
            element={
              <PrivateRoute>
                <Layout>
                  <Activities />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/mascotas"
            element={
              <PrivateRoute>
                <Layout>
                  <Pets />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/tienda"
            element={
              <PrivateRoute>
                <Layout>
                  <Shop />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;