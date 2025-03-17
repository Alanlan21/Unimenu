import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import type { AuthContextType, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = 'http://localhost:3000';

// Token refresh interval (5 minutes before expiration)
const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  // Set up refresh token interval
  useEffect(() => {
    if (refreshToken) {
      const interval = setInterval(refreshAccessToken, REFRESH_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [refreshToken]);

  async function loadStoredAuth() {
    try {
      const [storedToken, storedRefreshToken, storedUser] = await Promise.all([
        AsyncStorage.getItem('@auth:token'),
        AsyncStorage.getItem('@auth:refreshToken'),
        AsyncStorage.getItem('@auth:user'),
      ]);

      if (storedToken && storedRefreshToken && storedUser) {
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setUser(JSON.parse(storedUser));

        // Carregar dados atualizados do usuário
        if (storedToken) {
          try {
            const response = await fetch(`${API_URL}/auth/me`, {
              headers: {
                'Authorization': `Bearer ${storedToken}`,
              },
            });
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
              await AsyncStorage.setItem('@auth:user', JSON.stringify(userData));
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function refreshAccessToken() {
    try {
      if (!refreshToken) return;

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      await AsyncStorage.setItem('@auth:token', data.access_token);
      setToken(data.access_token);

      // Atualizar dados do usuário após refresh do token
      const userResponse = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
        await AsyncStorage.setItem('@auth:user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      await signOut();
    }
  }

  async function signIn(credentials: LoginCredentials) {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciais inválidas');
      }

      const data: AuthResponse = await response.json();

      // Buscar dados completos do usuário
      const userResponse = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }

      const userData = await userResponse.json();

      await Promise.all([
        AsyncStorage.setItem('@auth:token', data.access_token),
        AsyncStorage.setItem('@auth:refreshToken', data.refresh_token),
        AsyncStorage.setItem('@auth:user', JSON.stringify(userData)),
      ]);

      setToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setUser(userData);
      router.replace('/(tabs)');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signUp(data: RegisterData) {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no cadastro');
      }

      // After successful registration, automatically sign in
      await signIn({ email: data.email, password: data.password });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setLoading(true);
      // Call logout endpoint if needed
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch(console.error); // Don't throw if request fails
      }

      await Promise.all([
        AsyncStorage.removeItem('@auth:token'),
        AsyncStorage.removeItem('@auth:refreshToken'),
        AsyncStorage.removeItem('@auth:user'),
      ]);
      
      setToken(null);
      setRefreshToken(null);
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        signIn, 
        signUp, 
        signOut, 
        loading,
        isAuthenticated: !!token,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
