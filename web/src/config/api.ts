
// src/config/api.ts
export const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  orders: `${API_BASE_URL}/orders`,
  payments: `${API_BASE_URL}/payments`,
  stripe: `${API_BASE_URL}/pagamento`,
  productOrders: `${API_BASE_URL}/product-orders`,
};
export const API_ENDPOINTS_WITH_ID = {
  order: (orderId: number) => `${API_ENDPOINTS.orders}/${orderId}`,
  payment: (paymentId: number) => `${API_ENDPOINTS.payments}/${paymentId}`,
  productOrder: (productOrderId: number) => `${API_ENDPOINTS.productOrders}/${productOrderId}`,
};
