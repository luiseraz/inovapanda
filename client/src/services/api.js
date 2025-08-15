// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  withCredentials: false,
  timeout: 15000,
});

// Lê token de chaves comuns do localStorage
function readToken() {
  return (
    localStorage.getItem('ip_token') ||
    localStorage.getItem('inovapanda_token') ||
    localStorage.getItem('token') ||
    ''
  );
}

api.interceptors.request.use((config) => {
  const t = readToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default api;
