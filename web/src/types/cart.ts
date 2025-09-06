

export interface CartItem {
  id: number;
  menuItemId?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}
