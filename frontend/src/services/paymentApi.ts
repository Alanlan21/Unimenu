// src/services/paymentApi.ts
import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const paymentApi = {
  createPayment: async (orderId: number, value: number) => {
    try {
      const response = await api.post(API_ENDPOINTS.payments, {
        value,
        orderId,
        paymentMethodId: 1 // Fixed Visa Credit payment method
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }
};
