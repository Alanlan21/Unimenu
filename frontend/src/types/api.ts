// Restaurant
export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  rating: number;
  isOpen: boolean;
  openingHours: {
    [key: string]: { // day of week
      open: string;  // HH:mm format
      close: string; // HH:mm format
    };
  };
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

// Featured Items
export interface FeaturedItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  ingredients: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

// Promotions
export interface Promotion {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  startDate: string;    // ISO date string
  endDate: string;      // ISO date string
  isActive: boolean;
  items: {
    itemId: string;
    quantity: number;
  }[];
  conditions?: string[];
  maxPerCustomer?: number;
  validDays?: number[]; // 0-6, where 0 is Sunday
}