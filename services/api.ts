const API_URL = 'http://192.168.2.100:3000';

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
    getAll: (options?: RequestInit) => apiCall('/stores', options),
    getOne: (id: number, options?: RequestInit) => apiCall(`/stores/${id}`, options),
    search: (query: string, options?: RequestInit) => apiCall(`/stores/search?q=${encodeURIComponent(query)}`, options),
  },
  
  menuItems: {
    getByStore: (storeId: number, options?: RequestInit) => apiCall(`/stores/${storeId}/menu-items`, options),
    getOne: (id: number, options?: RequestInit) => apiCall(`/items/${id}`, options),
  },
  
  orders: {
    create: (data: { idCliente: number; order_date: string; status: string; order_number: number }, options?: RequestInit) => 
      apiCall('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
        ...options,
      }),
    
    addItem: (orderId: number, items: Array<{ menuItemId: number; quantity: number }>, options?: RequestInit) =>
      apiCall(`/orders/${orderId}/product-orders`, {
        method: 'POST',
        body: JSON.stringify({ items }),
        ...options,
      }),
      
    getUserOrders: (options?: RequestInit) => apiCall('/orders/user', options),
    
    getOne: (id: number, options?: RequestInit) => apiCall(`/orders/${id}`, options),
    
    update: (id: number, data: Partial<Order>, options?: RequestInit) =>
      apiCall(`/orders/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        ...options,
      }),
  },
  
  auth: {
    login: (email: string, password: string, options?: RequestInit) =>
      apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        ...options,
      }),
  },

  pagamento: {
    checkout: (data: { items: Array<{ name: string; amount: number; quantity: number }>, orderId: number, successUrl: string, cancelUrl: string }, options?: RequestInit) =>
      apiCall('/pagamento/checkout', {
        method: 'POST',
        body: JSON.stringify(data),
        ...options,
      }),
  },
};

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
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

export default api;
