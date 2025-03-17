import { useAuth } from '../contexts/auth';

const API_URL = 'http://localhost:3000';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  storeId: number;
}

export interface Store {
  id: number;
  name: string;
  logoUrl: string | null;
  isOpen: boolean;
  CNPJ: string;
  email: string;
  menuItems: MenuItem[];
}

export interface Order {
  id: number;
  order_number: number;
  order_date: Date;
  status: string;
  user: {
    id: number;
    email: string;
  };
  productOrders: Array<{
    id: number;
    quantity: number;
    menuItem: MenuItem;
  }>;
}

export const api = {
  stores: {
    getAll: () => apiCall('/stores'),
    getOne: (id: number) => apiCall(`/stores/${id}`),
    search: (query: string) => apiCall(`/stores/search?q=${encodeURIComponent(query)}`),
  },
  
  menuItems: {
    getByStore: (storeId: number) => apiCall(`/stores/${storeId}/menu-items`),
    getOne: (id: number) => apiCall(`/items/${id}`),
  },
  
  orders: {
    create: (data: { items: Array<{ menuItemId: number; quantity: number }> }) => 
      apiCall('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    addItem: (orderId: number, menuItemId: number, quantity: number) =>
      apiCall(`/orders/${orderId}/product-orders`, {
        method: 'POST',
        body: JSON.stringify({
          items: [{ menuItemId, quantity }]
        }),
      }),
      
    getUserOrders: () => apiCall('/orders/user'),
    
    getOne: (id: number) => apiCall(`/orders/${id}`),
    
    update: (id: number, data: Partial<Order>) =>
      apiCall(`/orders/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },
  
  auth: {
    login: (email: string, password: string) =>
      apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
  },
};

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const { token } = useAuth();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Erro na requisição');
  }

  return response.json();
}