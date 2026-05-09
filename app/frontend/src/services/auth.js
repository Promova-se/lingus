import axios from 'axios';
import supabase from '../lib/supabase';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Serviço de autenticação
 * Comunica com o backend que se conecta ao Supabase
 */

export const authService = {
  /**
   * Registrar novo usuário
   */
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      if (response.data.token) {
        // Guardar token no localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Fazer login
   */
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Fazer logout
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Obter usuário atual
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Obter token
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Verificar se está autenticado
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
