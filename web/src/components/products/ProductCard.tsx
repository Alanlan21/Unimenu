import { Edit } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  isAvailable: boolean; 
  imageUrl?: string;
  onEdit: () => void;
}

export function ProductCard({ name, isAvailable, price, imageUrl, onEdit }: ProductCardProps) {
  return (
    <div className="bg-primary-light/30 rounded-lg p-4 relative group hover:shadow-md transition-all duration-200">
      <button
        onClick={onEdit}
        className="absolute top-2 right-2 p-1.5 text-primary hover:text-primary-dark transition-colors"
      >
        <Edit className="w-4 h-4" />
      </button>
      
      <div className="h-32 w-full rounded mb-3 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-white/50 rounded flex items-center justify-center text-primary-dark/30">
            Sem imagem
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-primary-dark">{name}</h3>
        <div className="flex justify-between items-center">
          {/* Se o preço for um número, apenas exibe ele sem alterações */}
          <p className="text-primary font-semibold">
            R$ {price}
          </p>
          <span className={`text-sm px-2 py-1 rounded-full ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isAvailable ? 'Disponível' : 'Indisponível'}
          </span>
        </div>
      </div>
    </div>
  );
}
