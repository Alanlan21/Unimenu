import React from 'react';
import { CircleDot, Trash2 } from 'lucide-react';

interface OrderCardProps {
  storeName: string;
  storeLogoUrl: string;
  orderNumber: string;
  date: string;
  time: string;
  status: 'Realizado' | 'Confirmado' | 'Pronto para retirada';
  items: Array<{
    quantity: number;
    name: string;
  }>;
  onDetailsClick: () => void;
  onHelpClick: () => void;
  onAddToCartClick: () => void;
  onRateClick: () => void;
  onDeleteClick: () => void;
}

export function OrderCard({
  storeName,
  storeLogoUrl,
  orderNumber,
  date,
  time,
  status,
  items,
  onDetailsClick,
  onHelpClick,
  onAddToCartClick,
  onRateClick,
  onDeleteClick
}: OrderCardProps) {
  const isReady = status === 'Pronto para retirada';

  return (
    <div className={`bg-[#FFF8EC] rounded-lg shadow-sm p-6 ${isReady ? 'border border-green-200' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img src={storeLogoUrl} alt={storeName} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 className="text-[#8B4513] font-medium">{storeName}</h3>
            <p className="text-gray-500 text-sm">Pedido Nº {orderNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>

      {isReady && (
        <div className="flex items-center gap-2 text-green-500 mb-4">
          <CircleDot size={16} className="fill-current" />
          <span className="text-sm font-medium">Pronto para retirada</span>
        </div>
      )}

      <div className="space-y-2 mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">
              {item.quantity}
            </span>
            <span className="text-[#8B4513]">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onHelpClick}
          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
        >
          Ajuda
        </button>
        <button
          onClick={onDetailsClick}
          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
        >
          Detalhes
        </button>
        <button
          onClick={onAddToCartClick}
          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
        >
          Adicionar à sacola
        </button>
        <button
          onClick={onRateClick}
          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
        >
          Avaliar
        </button>
        <button
          onClick={onDeleteClick}
          className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1"
        >
          <Trash2 size={16} />
          Excluir
        </button>
      </div>
    </div>
  );
}
