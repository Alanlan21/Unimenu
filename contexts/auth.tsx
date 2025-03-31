import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import type { AuthContextType, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import api from '../utils/api';

console.log('React instance in auth.tsx:', React);
console.log('React version in auth.tsx:', React.version);
const AuthContext = createContext<AuthContextType | null>(null);

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

        try {
          const response = await api.get('/auth/me', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });
          const userData = response.data;
          setUser(userData);
          await AsyncStorage.setItem('@auth:user', JSON.stringify(userData));
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
      console.log('SignIn - Enviando pra:', `/auth/login`);
      console.log('SignIn - Dados:', credentials);
      const response = await api.post('/auth/login', credentials);

      console.log('SignIn - Status:', response.status);
      console.log('SignIn - Resposta completa:', response.data);

      // Aceita status 200 ou 201 como sucesso
      if (response.status !== 200 && response.status !== 201) {
        const errorData = response.data;
        console.log('SignIn - Erro:', errorData);
        throw new Error(errorData.message || 'Credenciais inválidas');
      }

      const data: AuthResponse = response.data;
      console.log('SignIn - Dados extraídos:', data);

      const userResponse = await api.get('/auth/me', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        },
      });

      console.log('SignIn - /auth/me Status:', userResponse.status);
      console.log('SignIn - /auth/me Resposta:', userResponse.data);

      if (userResponse.status !== 200) {
        const errorData = userResponse.data;
        console.log('SignIn - /auth/me Erro:', errorData);
        throw new Error('Erro ao buscar dados do usuário');
      }

      const userData = userResponse.data;
      console.log('SignIn - Salvando no AsyncStorage...');
      await Promise.all([
        AsyncStorage.setItem('@auth:token', data.access_token),
        AsyncStorage.setItem('@auth:user', JSON.stringify(userData)),
      ]);

      console.log('SignIn - Atualizando estado...');
      setToken(data.access_token);
      setUser(userData);

      console.log('SignIn - Redirecionando para /dashboard...');
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        console.error('SignIn - Erro detalhado:', error.message);
      } else {
        console.error('SignIn - Erro detalhado:', error);
      }
      throw error;
    } finally {
      setLoading(false);
      console.log('SignIn - Finalizado');
    }
  }

  async function signUp(data: RegisterData) {
    try {
      setLoading(true);

      const [day, month, year] = data.birthDate.split('/');
      const formattedBirthDate = `${year}-${month}-${day}`;
      const cleanCPF = data.cpf.replace(/\D/g, '');
      const cleanPhone = data.phone.replace(/\D/g, '');

      const formattedData = {
        ...data,
        birthDate: formattedBirthDate,
        cpf: cleanCPF,
        phone: cleanPhone,
      };

      console.log('SignUp - Dados formatados:', formattedData);

      const response = await api.post('/users/register', formattedData);

      console.log('SignUp - Status:', response.status);
      if (response.status !== 201) {
        const errorData = response.data;
        console.log('SignUp - Erro:', errorData);
        throw new Error(errorData.message || 'Erro no cadastro');
      }

      const responseData = response.data;
      console.log('SignUp - Resposta:', responseData);

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
      if (token) {
        await api.post('/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch(console.error);
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
