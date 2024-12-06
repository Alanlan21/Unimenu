/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do back-end
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('storeToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

const API_URL = 'http://localhost:3000' 

export const fetchOrders = async (storeId: number): Promise<Order[]> => {
  try {
    const response = await axios.get(`${API_URL}/orders/store/${storeId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    throw error;
  }
}

export const updateOrderStatus = async (orderId: number, newStatus: string): Promise<Order> => {
  try {
    const response = await axios.patch(`${API_URL}/orders/${orderId}`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    throw error;
  }
};

// Funções para consumo da API
export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const getMenuItens = (storeId: number) =>
  api.get('/menu-items', { params: { storeId } }); 

export const createMenuItem = (data: MenuFormData, storeId: number) => {
  const menuItemData = {
    name: data.name,
    price: data.price,
    stock: data.stock,
    description: data.description,
    isAvailable: data.isAvailable !== undefined ? data.isAvailable : true, 
    imageUrl: data.imageUrl || '', 
    isVegan: data.isVegan,
    hasGluten: data.hasGluten,
    hasLactose: data.hasLactose,
    storeId: storeId, 
  };
  console.log('Dados enviados:', menuItemData); 
  return api.post<ApiResponse<MenuItem>>('/menu-items', menuItemData);
};

export const updateMenuItem = (id: number, data: any) => api.patch<ApiResponse<MenuItem>>(`/menu-items/${id}`, data); // Usando PATCH
export const deleteMenuItem = (id: number) => {
  return api.delete<ApiResponse<{ message: string }>>(`/menu-items/${id}`);
};


// Tipos de Resposta da API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
  stock: number;
  description: string;
  imageUrl?: string;
 isVegan: boolean;
  hasGluten: boolean;
  hasLactose: boolean;
}
export type MenuFormData = Omit<MenuItem, 'id'> & { id?: number }; 

// Tipos para a Loja
export interface Store {
  id: number;
  name: string;
  CNPJ: string;
  email: string;
  owner: Owner;
  menuItens: MenuItem[]; 
}

export interface Owner {
  id: number;
  stores: Store[];
}

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'finished' | 'denied';

export interface Order {
  user: any;
  order_date: string | number | Date;
  productOrders(productOrders: any): unknown;
  id: number;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}


export interface ProductOrder {
  id: number;
  quantity: number;
  menuItem: MenuItem; 
  order: Order;
}

export interface User {
  id: number;
  orders: Order[];
}
