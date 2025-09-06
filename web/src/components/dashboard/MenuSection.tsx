
import  { MenuItem } from '../../types/MenuItem';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  variant: 'featured' | 'promotion' | 'menu';
  onItemClick: (item: MenuItem) => void;
}

export function MenuSection({ title, items, variant, onItemClick }: MenuSectionProps) {
  const renderMenuItem = (item: MenuItem) => (
    <div 
      key={item.id} 
      onClick={() => onItemClick(item)}
      className="group bg-white rounded-lg p-4 shadow-sm cursor-pointer
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:-translate-y-1 hover:bg-orange-50
        active:scale-[0.99] active:shadow-sm
        border border-orange-100 relative"
    >
      <div className={variant === 'featured' ? 'space-y-4' : 'flex gap-4'}>
        <img
          src={item.image}
          alt={item.name}
          className={`
            rounded-lg object-cover transition-transform duration-300
            group-hover:scale-[1.02]
            ${variant === 'featured' 
              ? 'w-full h-48' 
              : 'w-24 h-24'}
          `}
        />
        <div className="flex-1">
          <h3 className="font-medium text-orange-500 text-lg group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {item.description}
          </p>
          <p className="text-lg font-semibold text-orange-500 mt-3 group-hover:text-orange-600 transition-colors">
            R$ {item.price.toFixed(2)}
          </p>
        </div>
      </div>
      
      {/* Subtle highlight effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/0 rounded-lg transition-all duration-300" />
    </div>
  );

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className={`grid gap-6 ${
        variant === 'featured' 
          ? 'grid-cols-1 md:grid-cols-3'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {items.map(renderMenuItem)}
      </div>
    </section>
  );
}