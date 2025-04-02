import axios from 'axios';
import Constants from 'expo-constants';

// Usa o API_URL do app.json, com fallback pra localhost
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;