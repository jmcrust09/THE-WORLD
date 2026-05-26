import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import WindowPanel from '../components/WindowPanel';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { login, register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await register(username, email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <WindowPanel title={isLogin ? 'iniciar sesión' : 'registrarse'} subtitle="acceso al mundo" icon="🔐">
        <form onSubmit={handleSubmit} className="grid gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-2xl border border-beige bg-white focus:outline-none focus:ring-1 focus:ring-blue"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-2xl border border-beige bg-white focus:outline-none focus:ring-1 focus:ring-blue"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-2xl border border-beige bg-white focus:outline-none focus:ring-1 focus:ring-blue"
            required
          />
          <button type="submit" className="action-button w-full justify-center">{isLogin ? 'Ingresar' : 'Crear cuenta'}</button>
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="action-button w-full justify-center">
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </form>
      </WindowPanel>
    </div>
  );
}
