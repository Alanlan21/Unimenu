import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      // Aqui você pode usar AsyncStorage para armazenar o token
      // await AsyncStorage.setItem('userToken', data.access_token);
      // await AsyncStorage.setItem('user', JSON.stringify(data.user));
      
      router.replace({ pathname: '/(tabs)/index' });
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/unimenu-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Faça seu Login</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Usuário, email ou matrícula"
              value={credentials.email}
              onChangeText={(text) => setCredentials(prev => ({ ...prev, email: text }))}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Senha"
              value={credentials.password}
              onChangeText={(text) => setCredentials(prev => ({ ...prev, password: text }))}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </TouchableOpacity>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={styles.loginButtonText}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={{ uri: 'https://www.google.com/favicon.ico' }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.staffButton}>
          <Text style={styles.staffButtonText}>Login para funcionários</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    color: '#FF6B00',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 25,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: 25,
    paddingVertical: 15,
    width: '100%',
    marginBottom: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  staffButton: {
    backgroundColor: '#FF8534',
    borderRadius: 25,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  staffButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
  },
  registerLink: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
});
