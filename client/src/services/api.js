import axios from 'axios';

// Criar instância do axios com configurações base
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação em cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros nas respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratar erros como 401 (não autorizado)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirecionar para página de login se necessário
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  // Registrar novo usuário
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Login de usuário
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Obter perfil do usuário
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Atualizar perfil do usuário
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Verificar se o usuário está logado
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  // Obter dados do usuário atual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Serviços de produtos
export const productService = {
  // Obter todos os produtos
  getProducts: async (filters = {}) => {
    const response = await api.get('/products', { params: filters });
    return response.data;
  },

  // Obter produto por ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

// Serviços de pedidos
export const orderService = {
  // Criar novo pedido
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Obter pedidos do usuário
  getUserOrders: async () => {
    const response = await api.get('/orders/myorders');
    return response.data;
  },

  // Obter detalhes de um pedido
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

export default api; 