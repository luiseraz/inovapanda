// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

const TOKEN_KEY = 'ip_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  // carrega sessão ao montar
  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (!t) return;
    (async () => {
      try {
        const { data } = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${t}` },
        });
        setUser(data.user);
        setIsAuth(true);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
      }
    })();
  }, []);

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
    setIsAuth(true);
    return data.user;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setIsAuth(false);
  }

  // força revalidar /auth/me
  async function refreshMe() {
    const { data } = await api.get('/auth/me');
    setUser(data.user);
    setIsAuth(true);
    return data.user;
  }

  // helper para atualizar o user global imediatamente
  function setAuthUser(next) {
    // aceita objeto completo ou função
    setUser((prev) => (typeof next === 'function' ? next(prev) : next));
    setIsAuth(Boolean(next));
  }

  return (
    <AuthCtx.Provider value={{ user, isAuth, login, logout, refreshMe, setAuthUser }}>
      {children}
    </AuthCtx.Provider>
  );
}
