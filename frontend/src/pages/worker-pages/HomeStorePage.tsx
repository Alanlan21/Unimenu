import React from 'react';
import   Header  from '../../components/Header';
import { ProductCard } from '../../components/products/ProductCard';
import { AddProductButton } from '../../components/products/AddProductButton';
import { Modal } from '../../components/ui/Modal';
import { ProductForm } from '../../components/products/ProductForm';
import {  MenuFormData, MenuItem, createMenuItem, getMenuItens, updateMenuItem } from '../../types/workerApi'; // Adicionando updateProduct

export function HomeStorePage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingMenuItem, setEditingMenuItens] = React.useState<MenuItem | null>(null);
  const [menuItens, setMenuItens] = React.useState<MenuItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Buscar storeId do localStorage
  const storeId = localStorage.getItem('storeId');
  const storeIdNumber = storeId ? parseInt(storeId, 10) : 0; 
  console.log('storeId após login:', storeId);

  // Buscar produtos
  React.useEffect(() => {
    const fetchProducts = async () => {
      if (!storeIdNumber) {
        console.error('Store ID não encontrado');
        setLoading(false);
        return;
      }
  
      try {
        const response = await getMenuItens(storeIdNumber); // Passar storeId aqui
        setMenuItens(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [storeIdNumber]);

  const handleAddProduct = () => {
    setEditingMenuItens(null);
    setIsModalOpen(true);
  };
  

  const handleEditProduct = (id: number) => {
    const menuItem = menuItens.find(m => m.id === id);
    if (menuItem) {
      setEditingMenuItens(menuItem);
      setIsModalOpen(true);
    } else {
      console.error('Produto não encontrado');
    }
  };
  
  const handleSubmit = async (data: MenuFormData) => {
    try {
      if (editingMenuItem && editingMenuItem.id) {
        const response = await updateMenuItem(editingMenuItem.id, data);
        setMenuItens(menuItens.map( menuItem => 
          menuItem.id === editingMenuItem.id ? response.data : menuItem));
      } else { 
        // Adicionar novo produto
        const response = await createMenuItem(data, storeIdNumber);
        setMenuItens([...menuItens, response.data]);
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    } finally {
      setIsModalOpen(false);
      setEditingMenuItens(null);
    }
  };

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <div className="min-h-screen bg-primary-light/10">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary-dark">Produtos no cardápio</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItens.map((menuItens) => (
            <ProductCard
              key={menuItens.id}
              name={menuItens.name}
              price={menuItens.price}
              isAvailable={menuItens.stock > 0}
              onEdit={() => handleEditProduct(menuItens.id)}
            />
          ))}
          <AddProductButton onClick={handleAddProduct} />
        </div>
      </main>

      <Modal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setEditingMenuItens(null);
  }}
  title={editingMenuItem ? 'Editar Produto' : 'Adicionar Produto'}
>
  <ProductForm
    initialData={editingMenuItem || undefined}
    onSubmit={handleSubmit}
    storeId={storeIdNumber}   
  />
</Modal>

    </div>
  );
}
