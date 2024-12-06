import { Plus } from 'lucide-react';

interface AddProductButtonProps {
  onClick: () => void;
}const storeId = localStorage.getItem('storeId');
console.log('storeId após login:', storeId);

export function AddProductButton({ onClick }: AddProductButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-full min-h-[200px] w-full bg-primary-light/20 border-2 border-dashed 
                 border-primary/20 rounded-lg flex items-center justify-center group 
                 hover:border-primary/40 hover:bg-primary-light/20 transition-all duration-200"
                 
    >
      <div className="flex flex-col items-center space-y-2 ">
        <Plus className="w-8 h-8 text-primary/40 group-hover:text-primary/60" />
        <span className="text-primary-dark/70 group-hover:text-primary-dark">
          Adicionar Produto
        </span>
      </div>
    </button>
  );
}