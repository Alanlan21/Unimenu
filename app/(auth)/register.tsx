import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../contexts/auth';
import FormInput from '../../components/FormInput';
import LoadingOverlay from '../../components/LoadingOverlay';
import { validateRegisterForm } from '../../utils/validations';

const genderOptions = [
  { label: 'Gênero*', value: '' },
  { label: 'Masculino', value: 'masculino' },
  { label: 'Feminino', value: 'feminino' },
  { label: 'Outro', value: 'outro' },
];

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    phone: '',
    gender: '',
    birthDate: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [shake] = useState(new Animated.Value(0));

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shake, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const validateForm = () => {
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);
    return !Object.values(validationErrors).some(error => error !== null);
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      shakeAnimation();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signUp(formData);
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      setError('Erro ao realizar cadastro. Por favor, tente novamente.');
      shakeAnimation();
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

        <Animated.View style={[styles.formContainer, { transform: [{ translateX: shake }] }]}>
          <Text style={styles.title}>Criar Conta</Text>

          <View style={styles.inputContainer}>
            <FormInput
              icon="person-outline"
              placeholder="Nome completo*"
              value={formData.name}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, name: text }));
                setErrors(prev => ({ ...prev, name: null }));
              }}
              error={errors.name}
              editable={!loading}
            />

            <FormInput
              icon="mail-outline"
              placeholder="Email*"
              value={formData.email}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, email: text }));
                setErrors(prev => ({ ...prev, email: null, confirmEmail: null }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              editable={!loading}
            />

            <FormInput
              icon="mail-outline"
              placeholder="Confirmar email*"
              value={formData.confirmEmail}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, confirmEmail: text }));
                setErrors(prev => ({ ...prev, confirmEmail: null }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.confirmEmail}
              editable={!loading}
            />

            <FormInput
              icon="lock-closed-outline"
              placeholder="Senha*"
              value={formData.password}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, password: text }));
                setErrors(prev => ({ ...prev, password: null, confirmPassword: null }));
              }}
              secureTextEntry={!showPassword}
              error={errors.password}
              editable={!loading}
              rightElement={
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  disabled={loading}>
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color={loading ? "#999" : "#666"} 
                  />
                </TouchableOpacity>
              }
            />

            <FormInput
              icon="lock-closed-outline"
              placeholder="Confirmar senha*"
              value={formData.confirmPassword}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, confirmPassword: text }));
                setErrors(prev => ({ ...prev, confirmPassword: null }));
              }}
              secureTextEntry={!showConfirmPassword}
              error={errors.confirmPassword}
              editable={!loading}
              rightElement={
                <TouchableOpacity 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                  disabled={loading}>
                  <Ionicons 
                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color={loading ? "#999" : "#666"} 
                  />
                </TouchableOpacity>
              }
            />

            <FormInput
              icon="card-outline"
              placeholder="CPF*"
              value={formData.cpf}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, cpf: text }));
                setErrors(prev => ({ ...prev, cpf: null }));
              }}
              keyboardType="numeric"
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
              error={errors.cpf}
              editable={!loading}
            />

            <FormInput
              icon="call-outline"
              placeholder="Telefone*"
              value={formData.phone}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, phone: text }));
                setErrors(prev => ({ ...prev, phone: null }));
              }}
              keyboardType="phone-pad"
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              error={errors.phone}
              editable={!loading}
            />

            <FormInput
              icon="calendar-outline"
              placeholder="Data de nascimento*"
              value={formData.birthDate}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, birthDate: text }));
                setErrors(prev => ({ ...prev, birthDate: null }));
              }}
              keyboardType="numeric"
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
              error={errors.birthDate}
              editable={!loading}
            />

            <View style={styles.pickerContainer}>
              <View style={[
                styles.pickerWrapper,
                errors.gender && styles.pickerWrapperError
              ]}>
                <Ionicons 
                  name="male-female-outline" 
                  size={20} 
                  color={errors.gender ? '#FF3B30' : '#666'} 
                  style={styles.pickerIcon} 
                />
                <Picker
                  selectedValue={formData.gender}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, gender: value }));
                    setErrors(prev => ({ ...prev, gender: null }));
                  }}
                  enabled={!loading}
                  style={[styles.picker, loading && styles.pickerDisabled]}
                  dropdownIconColor={loading ? "#999" : "#666"}>
                  {genderOptions.map((option) => (
                    <Picker.Item 
                      key={option.value} 
                      label={option.label} 
                      value={option.value}
                      color={option.value === '' ? '#999' : '#333'}
                      style={option.value === '' ? styles.placeholderText : styles.pickerItemText}
                    />
                  ))}
                </Picker>
              </View>
              {errors.gender && (
                <Text style={styles.errorText}>{errors.gender}</Text>
              )}
            </View>
          </View>

          {error && (
            <Text style={styles.errorMessage}>{error}</Text>
          )}

          <TouchableOpacity
            style={[styles.registerButton, loading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={loading}>
            <Text style={styles.registerButtonText}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity 
              onPress={() => router.push('/login')}
              disabled={loading}>
              <Text style={[styles.loginLink, loading && styles.disabledText]}>
                Faça login
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
      {loading && <LoadingOverlay />}
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
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    width: '100%',
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
  eyeIcon: {
    padding: 10,
  },
  pickerContainer: {
    width: '100%',
  },
  pickerWrapper: {
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
  pickerWrapperError: {
    borderColor: '#FF3B30',
    borderWidth: 1,
  },
  pickerIcon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    color: '#333',
    marginLeft: -10,
  },
  pickerDisabled: {
    opacity: 0.7,
  },
  pickerItemText: {
    fontSize: 14,
    color: '#333',
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 15,
  },
  errorMessage: {
    color: '#FF3B30',
    textAlign: 'center',
    marginVertical: 20,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 10,
    borderRadius: 8,
  },
  registerButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 25,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  disabledText: {
    opacity: 0.7,
  },
});
