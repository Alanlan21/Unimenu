import api from "./api";
import { API_ENDPOINTS } from "../config/api";
import { CartItem } from "../types/cart";
import { paymentApi } from "./paymentApi";

export const orderApi = {
  createOrder: async (userId: number, cartItems: CartItem[]) => {
    try {
      // Create the main order
      const orderResponse = await api.post(API_ENDPOINTS.orders, {
        idCliente: userId,
        order_date: new Date(),
        status: 'pending',
        order_number: Math.floor(Math.random() * 1000000)
      });

      const orderId = orderResponse.data.id;

      // Create product orders
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

      // Calculate total and create payment
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      await paymentApi.createPayment(orderId, total);

      return orderResponse.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },



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

  deleteOrder: async (orderId: number) => {
    try {
      await api.delete(`${API_ENDPOINTS.orders}/${orderId}`);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
};

