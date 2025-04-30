import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/auth";
import FormInput from "../../components/FormInput";
import LoadingOverlay from "../../components/LoadingOverlay";
import { validateLoginForm } from "../../utils/validations";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    const validationErrors = validateLoginForm(credentials);
    setErrors(validationErrors);
    return !Object.values(validationErrors).some((error) => error !== null);
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      shakeAnimation();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signIn(credentials);
      // Remove o router.replace('/dashboard') aqui, porque o signIn já faz o redirecionamento
    } catch (error) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
      shakeAnimation();
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/unimenu-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Animated.View
          style={[styles.formContainer, { transform: [{ translateX: shake }] }]}
        >
          <Text style={styles.title}>Faça seu Login</Text>

          <View style={styles.inputContainer}>
            <FormInput
              icon="person-outline"
              placeholder="Usuário, email ou matrícula"
              value={credentials.email}
              onChangeText={(text) => {
                setCredentials((prev) => ({ ...prev, email: text }));
                setError(null);
                setErrors((prev) => ({ ...prev, email: null }));
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              error={errors.email}
              editable={!loading}
            />

            <FormInput
              icon="lock-closed-outline"
              placeholder="Senha"
              value={credentials.password}
              onChangeText={(text) => {
                setCredentials((prev) => ({ ...prev, password: text }));
                setError(null);
                setErrors((prev) => ({ ...prev, password: null }));
              }}
              secureTextEntry={!showPassword}
              error={errors.password}
              editable={!loading}
              rightElement={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  disabled={loading}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={loading ? "#999" : "#666"}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <TouchableOpacity onPress={() => router.push("/")} disabled={loading}>
            <Text
              style={[styles.forgotPassword, loading && styles.disabledText]}
            >
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? "Entrando..." : "Entrar"}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={[styles.googleButton, loading && styles.buttonDisabled]}
            disabled={loading}
          >
            <Image
              source={{ uri: "https://www.google.com/favicon.ico" }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Entrar com Google</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não tem uma conta? </Text>
            <TouchableOpacity
              onPress={() => router.push("/register")}
              disabled={loading}
            >
              <Text
                style={[styles.registerLink, loading && styles.disabledText]}
              >
                Cadastre-se
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
    backgroundColor: "#FFF5E6",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  formContainer: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B00",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    gap: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    color: "#FF6B00",
    textAlign: "right",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "flex-end",
  },
  errorText: {
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    padding: 10,
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 25,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  dividerText: {
    color: "#666",
    paddingHorizontal: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4285F4",
    borderRadius: 25,
    paddingVertical: 15,
    width: "100%",
    marginBottom: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  staffButton: {
    backgroundColor: "#FF8534",
    borderRadius: 25,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  staffButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#666",
  },
  registerLink: {
    color: "#FF6B00",
    fontWeight: "bold",
  },
  disabledText: {
    opacity: 0.7,
  },
});
