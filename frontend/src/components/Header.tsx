import React, { useState, useMemo } from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';
import CartModal from './CartModal';
import { useCart } from '../hooks/useCart';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, updateQuantity, removeItem } = useCart();

  // Memoizing cart total calculations to optimize performance
  const cartItemsCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const cartTotal = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <img src="/unimenu_logo.png" alt="Unimenu Logo" className="h-15" />
              <nav className="hidden md:flex space-x-6">
                <a href="/" className="text-orange-500 font-medium">Início</a>
                <a href="/dashboard" className="text-gray-600 hover:text-orange-500">Estabelecimentos</a>
                <a href="/pedidos" className="text-gray-600 hover:text-orange-500">Pedidos</a>
              </nav>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Busque por item ou loja"
                  className="w-full pl-10 pr-4 py-2 bg-[#FFF8EC] rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Buscar por item ou loja"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center text-orange-500">
                  <span className="mr-2">R$ {cartTotal.toFixed(2)}</span>
                  <button 
                    onClick={() => setIsCartOpen(true)} 
                    className="relative"
                    aria-label="Abrir carrinho"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                </div>
                <a href="/profile" className="flex items-center text-gray-600 hover:text-orange-500" aria-label="Ir para minha conta">
                  <User className="h-6 w-6" />
                  <span className="ml-2">Minha conta</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Passando cartTotal para o CartModal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        cartTotal={cartTotal} // Passando o valor total
      />
    </>
  );
}
