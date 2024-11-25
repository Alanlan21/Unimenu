export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number; // Preço do item
    imageUrl?: string; // URL da imagem do item
    quantity: number; // Quantidade no carrinho
  }