import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      // Al obtener token, redirigimos al inicio
      window.location.href = '/';
    } catch (err) {
      // axios errors: prefer mensaje desde response
      const msg = err?.response?.data?.msg || err?.message || 'Error de autenticación';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="desktop-container">
      {/* BARRA SUPERIOR */}
      <div className="top-bar">
        <div className="sys-info">
          <span><i className="fas fa-tux"></i> theworld@linux</span>
          <span><i className="fas fa-lock"></i> auth mode</span>
          <span><i className="fas fa-server"></i> conectando...</span>
        </div>
      </div>

      {/* ÁREA DE AUTENTICACIÓN */}
      <div className="main-area" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="tiles-grid" style={{ maxWidth: '600px', gridTemplateColumns: '1fr' }}>
          {/* TILE PRINCIPAL - FORMULARIO */}
          <div className="tile">
            <div className="tile-header">
              <div className="tile-dots">
                <span className="tile-dot"></span>
                <span className="tile-dot"></span>
                <span className="tile-dot"></span>
              </div>
              <div className="tile-title">
                <i className={isLogin ? 'fas fa-sign-in-alt' : 'fas fa-user-plus'}></i>
                {isLogin ? 'iniciar sesión' : 'registrarse'}
              </div>
            </div>
            <div className="tile-content">
              <div className="info-row" style={{ borderBottom: 'none', marginBottom: '20px' }}>
                <span style={{ color: 'var(--text-light)' }}><i className="fas fa-globe"></i> bienvenido a <strong>the world</strong></span>
              </div>

              {error && (
                <div className="badge" style={{ background: '#5a2a2a', borderColor: '#8a4a4a', width: '100%', marginBottom: '14px' }}>
                  <i className="fas fa-exclamation-triangle"></i> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-4">
                {!isLogin && (
                  <div className="form-group">
                    <label className="form-label">usuario</label>
                    <input
                      type="text"
                      placeholder="tu nombre único"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">correo electrónico</label>
                  <input
                    type="email"
                    placeholder="user@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={submitting}>
                    {submitting ? (isLogin ? 'ingresando...' : 'creando...') : (isLogin ? 'ingresar' : 'crear cuenta')}
                  </button>
                </div>
              </form>

              <hr />

              <div style={{ textAlign: 'center', marginTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="btn-secondary"
                >
                  {isLogin ? '¿no tienes cuenta?' : '¿ya tienes cuenta?'}
                </button>
              </div>
            </div>
          </div>

          {/* TILE ADICIONAL - INFO */}
          <div className="tile">
            <div className="tile-header">
              <div className="tile-dots">
                <span className="tile-dot"></span>
                <span className="tile-dot"></span>
                <span className="tile-dot"></span>
              </div>
              <div className="tile-title">
                <i className="fas fa-info-circle"></i> sistema
              </div>
            </div>
            <div className="tile-content">
              <div className="info-row">
                <span className="info-label"><i className="fas fa-rocket"></i> versión</span>
                <span>2.0 · gamificación completa</span>
              </div>
              <div className="info-row">
                <span className="info-label"><i className="fas fa-star"></i> características</span>
                <span>tareas · mascotas · tienda · rachas</span>
              </div>
              <div className="badge"><i className="fas fa-shield-alt"></i> datos encriptados · MongoDB secure</div>
              <div className="badge"><i className="fas fa-zap"></i> arquitectura serverless compatible</div>
              <div className="ascii-earth" style={{ fontSize: '10px', marginTop: '12px' }}>
{`  ¡convierte tu productividad
     en un ecosistema vivo!`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="bottom-bar">
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          <i className="fas fa-copyright"></i> 2025 · theworld · sistema de gamificación
        </span>
      </div>
    </div>
  );
}
