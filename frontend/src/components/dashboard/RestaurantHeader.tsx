import React from 'react';
import { Star } from 'lucide-react';

interface RestaurantHeaderProps {
  name: string;
  logo: string;
  rating: number;
  isOpen: boolean;
}

export function RestaurantHeader({ name, logo, rating, isOpen }: RestaurantHeaderProps) {
  return (
    <div className="flex items-center mb-8">
      <img
        src={logo}
        alt={name}
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-4 flex items-center">
        <h1 className="text-xl font-semibold text-orange-500">{name}</h1>
        <div className="flex items-center ml-3">
          <Star className="h-4 w-4 text-orange-500 fill-orange-500" />
          <span className="ml-1 text-gray-600">{rating}</span>
        </div>
        <span className={`ml-3 px-2 py-0.5 text-xs ${isOpen ? 'bg-green-500' : 'bg-red-500'} text-white rounded-full`}>
          {isOpen ? 'Aberto' : 'Fechado'}
        </span>
      </div>
    </div>
  );
}