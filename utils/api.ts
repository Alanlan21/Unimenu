import { useAuth } from '../contexts/auth';

const API_URL = 'http://localhost:3000';

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const { token } = useAuth();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Erro na requisição');
  }

  return response.json();
}
