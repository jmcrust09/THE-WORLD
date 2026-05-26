import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Pets from './pages/Pets';
import Shop from './pages/Shop';

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
          <nav className="flex gap-2">
            <NavLink to="/" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/actividades" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>Actividades</NavLink>
            <NavLink to="/mascotas" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>Mascotas</NavLink>
            <NavLink to="/tienda" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>Tienda</NavLink>
          </nav>
        </div>
        <div className="main-content">
          {children}
        </div>
        <div className="mt-8 pt-4 border-t border-beige flex justify-end text-[13px] text-grey tracking-wide">
          <span className="bg-[rgba(227,221,212,0.3)] px-4 py-1 rounded-full border border-beige font-light">
            ✶ made by <em className="not-italic text-dark font-medium">wm</em> ✶
          </span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actividades" element={<Activities />} />
          <Route path="/mascotas" element={<Pets />} />
          <Route path="/tienda" element={<Shop />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
