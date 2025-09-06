import React from 'react';
import { X, Clock } from 'lucide-react';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  date: string;
  statusTimeline: Array<{
    status: string;
    time: string;
    description: string;
  }>;
}

export function OrderDetailsModal({
  isOpen,
  onClose,
  storeName,
  date,
  statusTimeline,
}: OrderDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#8B4513]">Seu pedido em</h2>
            <h3 className="text-lg text-[#8B4513]">{storeName}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-orange-500" size={20} />
            <span className="text-[#8B4513]">Dia {date}</span>
          </div>

          <div className="space-y-6">
            {statusTimeline.map((item, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-orange-200 pb-6 last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500" />
                <div>
                  <h4 className="font-medium text-[#8B4513]">{item.status}</h4>
                  <p className="text-sm text-gray-500">{item.time}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
