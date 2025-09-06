import { X } from "lucide-react";
import { CartItem } from "../types/cart";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  cartTotal: number;
}

export default function CartModal({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartModalProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const serviceCharge = 0.99;
  const total = subtotal + serviceCharge;

  const handleCheckout = () => {
    // Store cart items in localStorage
    const orderItems = items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    }));
    
    localStorage.setItem('orderItems', JSON.stringify(orderItems));
    window.location.href = `/checkout?total=${total.toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="bg-[#FFF8EC] w-full max-w-md h-full overflow-y-auto rounded-tl-lg rounded-bl-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#FF6B00]">
                Seu pedido em
              </h2>
              <h3 className="text-xl text-[#8B4513]">Mini Kalzone Unifor</h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#FF6B00] hover:text-[#FF8533]"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-[#8B4513] font-medium mb-4">
              Kalzones (não alteramos ingredientes)
            </h4>
            {items.map((item) => (
              <div
                key={item.id}
                className="mb-4 pb-4 border-b border-[#FFE4C4]"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#8B4513]">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-[#8B4513]">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      onUpdateQuantity(
                        item.id,
                        Math.max(1, Number(e.target.value))
                      )
                    }
                    className="w-16 px-2 py-1 border border-[#FF6B00] rounded text-center"
                  />
                  <button
                    className="text-[#FF6B00] hover:text-[#FF8533] text-sm"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-[#8B4513]">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#8B4513]">
              <span>Taxa de Serviço</span>
              <span>R$ {serviceCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#8B4513]">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-[#FF6B00] text-white py-4 rounded-full font-bold hover:bg-[#FF8533] transition-colors"
          >
            PEDIR AGORA OU AGENDAR
          </button>
        </div>
      </div>
    </div>
  );
}
