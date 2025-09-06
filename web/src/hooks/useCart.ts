import { create } from 'zustand';
import { CartItem } from '../types/cart';

interface CartStore {
  items: CartItem[];
  addItem: (newItem: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart') || '[]'),

  addItem: (newItem: CartItem) => {
    set((state) => {
      const existingItem = state.items.find(item => item.id === newItem.id);
      const updatedItems = existingItem
        ? state.items.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        : [...state.items, { 
            ...newItem, 
            menuItemId: newItem.id  // Explicitly set menuItemId to be the same as id
          }];
      
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  removeItem: (id: number) => {
    set((state) => {
      const updatedItems = state.items.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  updateQuantity: (id: number, quantity: number) => {
    if (quantity < 1) return;
    set((state) => {
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  clearCart: () => {
    localStorage.setItem('cart', '[]');
    set({ items: [] });
  },

  getTotal: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
}));
