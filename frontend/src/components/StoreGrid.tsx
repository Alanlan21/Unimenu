import React from 'react';
import StoreCard from './StoreCard';

interface Store {
  id: number;
  name: string;
  logoUrl: string;
  isOpen: boolean;
}

interface StoreGridProps {
  stores: Store[];
}

const StoreGrid: React.FC<StoreGridProps> = ({ stores }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
};

export default StoreGrid;

