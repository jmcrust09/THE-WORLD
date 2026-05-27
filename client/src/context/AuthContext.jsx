import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Establecer baseURL para axios: usar VITE_API_URL si existe, sino usar el backend desplegado
const API_BASE = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_BASE;
console.info('API base:', axios.defaults.baseURL);

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const fetchUserData = async (token) => {
    try {
      const userRes = await axios.get('/api/auth/me');
      const petsRes = await axios.get('/api/pets');
      setUser({
        ...userRes.data,
        pets: Array.isArray(petsRes.data) ? petsRes.data : []
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common['x-auth-token'] = savedToken;
      fetchUserData(savedToken).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (login, password) => {
    const res = await axios.post('/api/auth/login', { login, password });
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['x-auth-token'] = res.data.token;
    setToken(res.data.token);
    setUser(res.data.user);
    await fetchUserData(res.data.token);
    return res.data;
  };

  const register = async (username, email, password) => {
    const res = await axios.post('/api/auth/register', { username, email, password });
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['x-auth-token'] = res.data.token;
    setToken(res.data.token);
    setUser(res.data.user);
    await fetchUserData(res.data.token);
    return res.data;
  };

  const guestLogin = async () => {
    const res = await axios.post('/api/auth/guest');
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['x-auth-token'] = res.data.token;
    setToken(res.data.token);
    setUser(res.data.user);
    await fetchUserData(res.data.token);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    setToken(null);
  };

  const refreshUserData = async () => {
    if (token) {
      await fetchUserData(token);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, guestLogin, logout, loading, token, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
