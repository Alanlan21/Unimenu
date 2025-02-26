import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../../contexts/auth";
import FormInput from "../../components/FormInput";
import { validateRegisterForm } from "../../utils/validations";

const genderOptions = [
  { label: "Selecione o gênero*", value: "" },
  { label: "Masculino", value: "masculino" },
  { label: "Feminino", value: "feminino" },
  { label: "Outro", value: "outro" },
];

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    phone: "",
    gender: "",
    birthDate: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const validateForm = () => {
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);
    return !Object.values(validationErrors).some((error) => error !== null);
  };

  const convertDateToISO = (date: string): string => {
    const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) {
      throw new Error("Data inválida");
    }

    const [_, day, month, year] = match;
    return `${year}-${month}-${day}`;
  };

  const handleRegister = async () => {
    try {
      if (!validateForm()) return;

      setError(null);
      setLoading(true);

      const formattedData = {
        ...formData,
        birthDate: convertDateToISO(formData.birthDate),
      };

      await signUp(formattedData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao realizar cadastro"
      );
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FF6B00" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/unimenu-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Faça seu Cadastro!</Text>
        <Text style={styles.subtitle}>É rapidinho...</Text>

        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={styles.requiredText}>
            Todos itens com asterisco(*) são obrigatórios
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <FormInput
            icon="person-outline"
            placeholder="Nome completo*"
            value={formData.name}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, name: text }))
            }
            error={errors.name}
          />

          <FormInput
            icon="card-outline"
            placeholder="CPF*"
            value={formData.cpf}
            onChangeText={(text) => {
              const unmasked = text.replace(/\D/g, "");
              setFormData((prev) => ({ ...prev, cpf: unmasked }));
            }}
            mask={[
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
            ]}
            keyboardType="numeric"
            error={errors.cpf}
          />

          <FormInput
            icon="calendar-outline"
            placeholder="Data de nascimento* (DD/MM/AAAA)"
            value={formData.birthDate}
            onChangeText={(text) => {
              const masked = text.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
              setFormData((prev) => ({ ...prev, birthDate: masked }));
            }}
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            keyboardType="numeric"
            error={errors.birthDate}
          />
          <View style={styles.pickerContainer}>
            <View
              style={[
                styles.pickerWrapper,
                errors.gender && styles.pickerWrapperError,
              ]}
            >
              <Ionicons
                name="male-female-outline"
                size={20}
                color={errors.gender ? "#FF3B30" : "#666"}
                style={styles.pickerIcon}
              />
              <Picker
                selectedValue={formData.gender}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
                style={styles.picker}
                dropdownIconColor="#666"
              >
                {genderOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    color={option.value === "" ? "#999" : "#333"}
                    style={
                      option.value === ""
                        ? styles.placeholderText
                        : styles.pickerItemText
                    }
                  />
                ))}
              </Picker>
            </View>
            {errors.gender && (
              <Text style={styles.errorText}>{errors.gender}</Text>
            )}
          </View>

          <FormInput
            icon="mail-outline"
            placeholder="Email*"
            value={formData.email}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, email: text }))
            }
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email}
          />

          <FormInput
            icon="mail-outline"
            placeholder="Confirmar Email*"
            value={formData.confirmEmail}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, confirmEmail: text }))
            }
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.confirmEmail}
          />

          <FormInput
            icon="call-outline"
            placeholder="Telefone*"
            value={formData.phone}
            onChangeText={(text) => {
              const unmasked = text.replace(/\D/g, "");
              setFormData((prev) => ({ ...prev, phone: unmasked }));
            }}
            mask={[
              "(",
              /\d/,
              /\d/,
              ")",
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            keyboardType="numeric"
            error={errors.phone}
          />

          <FormInput
            icon="lock-closed-outline"
            placeholder="Senha*"
            value={formData.password}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, password: text }))
            }
            secureTextEntry
            error={errors.password}
          />

          <FormInput
            icon="lock-closed-outline"
            placeholder="Confirmar Senha*"
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, confirmPassword: text }))
            }
            secureTextEntry
            error={errors.confirmPassword}
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[
            styles.continueButton,
            loading && styles.continueButtonDisabled,
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.continueButtonText}>
            {loading ? "Cadastrando..." : "Continuar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backTextButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B00",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  requiredText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  inputContainer: {
    width: "100%",
    gap: 16,
  },
  pickerContainer: {
    width: "100%",
  },
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingLeft: 15,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  pickerWrapperError: {
    borderColor: "#FF3B30",
    borderWidth: 1,
  },
  pickerIcon: {
    marginRight: 10,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 15,
  },
  continueButton: {
    backgroundColor: "#FF6B00",
    borderRadius: 25,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 24,
  },
  continueButtonDisabled: {
    opacity: 0.7,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backTextButton: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#666",
    fontSize: 16,
  },
  picker: {
    flex: 1,
    height: 50,
    color: "#666",
    marginLeft: -12, // Ajusta o alinhamento do texto
  },
  pickerItemText: {
    fontSize: 14,
    color: "#666",
  },
  placeholderText: {
    fontSize: 14,
    color: "#666",
  },
});
