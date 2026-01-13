import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { auth_token, user } = response.data;
    
    localStorage.setItem('authToken', auth_token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { token: auth_token, user };
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    const { auth_token, user } = response.data;
    
    localStorage.setItem('authToken', auth_token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { token: auth_token, user };
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data.user;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    const { user } = response.data;
    
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  }
};