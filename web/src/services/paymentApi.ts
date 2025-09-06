// src/services/paymentApi.ts
import api from './api';
import { API_ENDPOINTS } from '../config/api';

// Serviço responsável por operações de pagamento
export const paymentApi = {
  // Cria um novo pagamento com valor e ID do pedido
  createPayment: async (orderId: number, value: number) => {
    try {
      const response = await api.post(API_ENDPOINTS.payments, {
        value,
        orderId,
        paymentMethodId: 1 
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }
};
