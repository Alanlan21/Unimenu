import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import type { AuthContextType, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

console.log('React instance in auth.tsx:', React);
console.log('React version in auth.tsx:', React.version);
const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = 'http://192.168.2.100:3000';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  async function loadStoredAuth() {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem('@auth:token'),
        AsyncStorage.getItem('@auth:user'),
      ]);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));

        // Carregar dados atualizados do usuário
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
    } catch (error) {
      console.error('Error loading auth data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(credentials: LoginCredentials) {
    try {
      setLoading(true);
      console.log('SignIn - Enviando pra:', `${API_URL}/auth/login`);
      console.log('SignIn - Dados:', credentials);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('SignIn - Status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.log('SignIn - Erro:', errorData);
        throw new Error(errorData.message || 'Credenciais inválidas');
      }

      const data: AuthResponse = await response.json();
      console.log('SignIn - Resposta:', data);

      // Buscar dados completos do usuário
      const userResponse = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        },
      });

      console.log('SignIn - /auth/me Status:', userResponse.status);
      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        console.log('SignIn - /auth/me Erro:', errorData);
        throw new Error('Erro ao buscar dados do usuário');
      }

      const userData = await userResponse.json();
      console.log('SignIn - /auth/me Resposta:', userData);

      await Promise.all([
        AsyncStorage.setItem('@auth:token', data.access_token),
        AsyncStorage.setItem('@auth:user', JSON.stringify(userData)),
      ]);

      setToken(data.access_token);
      setUser(userData);
      router.replace('/(tabs)');
    } catch (error) {
      if (error instanceof Error) {
        console.error('SignIn - Erro:', error.message);
      } else {
        console.error('SignIn - Erro:', error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signUp(data: RegisterData) {
    try {
      setLoading(true);

      // Formatar a data de nascimento para o formato ISO
      const [day, month, year] = data.birthDate.split('/');
      const formattedBirthDate = `${year}-${month}-${day}`;

      // Remover caracteres especiais do CPF e telefone
      const cleanCPF = data.cpf.replace(/\D/g, '');
      const cleanPhone = data.phone.replace(/\D/g, '');

      const formattedData = {
        ...data,
        birthDate: formattedBirthDate,
        cpf: cleanCPF,
        phone: cleanPhone,
      };

      console.log('SignUp - Dados formatados:', formattedData);

      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      console.log('SignUp - Status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.log('SignUp - Erro:', errorData);
        throw new Error(errorData.message || 'Erro no cadastro');
      }

      const responseData = await response.json();
      console.log('SignUp - Resposta:', responseData);

      // After successful registration, automatically sign in
      await signIn({ email: data.email, password: data.password });
    } catch (error) {
      console.error('SignUp - Erro detalhado:', error);
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
        AsyncStorage.removeItem('@auth:user'),
      ]);
      
      setToken(null);
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
