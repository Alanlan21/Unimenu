// src/services/api.ts
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Cria uma instância do axios com configurações base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepta requisições para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
