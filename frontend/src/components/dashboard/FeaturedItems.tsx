import React from 'react';

interface FeaturedItem {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface FeaturedItemsProps {
  items: FeaturedItem[];
}

export function FeaturedItems({ items }: FeaturedItemsProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Destaques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-orange-500">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}