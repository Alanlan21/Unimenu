import React from 'react';
import { Circle } from 'lucide-react';

interface StoreProps {
  id: number;
  name: string;
  logoUrl: string;
  isOpen: boolean;
}

export default function StoreCard({ name, logoUrl, isOpen }: StoreProps) {
  return (
    <div className="relative bg-[#FFF8EC] rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-105 border border-orange-100">
      <div className="absolute top-2 right-2 z-10">
        <Circle className={`h-3 w-3 ${isOpen ? 'text-green-500' : 'text-red-500'} fill-current`} />
      </div>
      <div className="aspect-[4/3] bg-gray-100">
        <img 
          src={logoUrl || 'https://via.placeholder.com/300x200'} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      </div>
    </div>
  );
}