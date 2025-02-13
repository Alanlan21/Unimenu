import api from "./api";
import { API_ENDPOINTS } from "../config/api";
import { CartItem } from "../types/cart";
import { paymentApi } from "./paymentApi";

export const orderApi = {
  // Cria um novo pedido com itens do carrinho
  createOrder: async (userId: number, cartItems: CartItem[]) => {
    try {
      // cria a ordem principal
      const orderResponse = await api.post(API_ENDPOINTS.orders, {
        idCliente: userId,
        order_date: new Date(),
        status: 'pending',
        order_number: Math.floor(Math.random() * 1000000)
      });

      const orderId = orderResponse.data.id;

      // Cria os itens do pedido
      const productOrders = cartItems.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        orderId: orderId
      }));

      await Promise.all(
        productOrders.map(order => 
          api.post(API_ENDPOINTS.productOrders, order)
        )
      );

      // Calcula total e cria pagamento
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      await paymentApi.createPayment(orderId, total);

      return orderResponse.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Cria uma intenção de pagamento no Stripe
  createPaymentIntent: async (amount: number, orderId: number) => {
    try {
      const response = await api.post(API_ENDPOINTS.stripe, {
        amount,
        currency: "brl",
        orderId
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  },

  // Atualiza o status de um pedido
  updateOrderStatus: async (orderId: number, status: string) => {
    try {
      const response = await api.patch(`${API_ENDPOINTS.orders}/${orderId}`, {
        status
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Remove um pedido do sistema
  deleteOrder: async (orderId: number) => {
    try {
      await api.delete(`${API_ENDPOINTS.orders}/${orderId}`);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
};
