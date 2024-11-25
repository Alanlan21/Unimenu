// services/api.ts
import axios from "axios";

const API_URL = "http://localhost:3000"; // Substitua pela URL do seu backend

export const userService = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    cpf: string;
    gender: string;
    birthDate: string;
    phone: string;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data; // A resposta do backend
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Erro ao registrar usuário"
        );
      } else {
        throw new Error("Erro ao registrar usuário");
      }
    }
  },
};
