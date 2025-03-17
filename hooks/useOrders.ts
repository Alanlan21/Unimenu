import { useState, useEffect } from 'react';
import { api, Order } from '../services/api';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      const data = await api.orders.getUserOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  }

  async function createOrder(items: Array<{ menuItemId: number; quantity: number }>) {
    try {
      const newOrder = await api.orders.create({ items });
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao criar pedido');
    }
  }

  async function addItemToOrder(orderId: number, menuItemId: number, quantity: number) {
    try {
      const updatedOrder = await api.orders.addItem(orderId, menuItemId, quantity);
      setOrders(prev => prev.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      return updatedOrder;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao adicionar item ao pedido');
    }
  }

  return {
    orders,
    loading,
    error,
    createOrder,
    addItemToOrder,
    refreshOrders: loadOrders,
  };
}