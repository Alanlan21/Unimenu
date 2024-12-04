import { useState } from "react";
import Header from "../components/Header";
import { RestaurantHeader } from "../components/dashboard/RestaurantHeader";
import { MenuSection } from "../components/dashboard/MenuSection";
import { ItemModal } from "../components/dashboard/ItemModal";
import { useCart } from "../hooks/useCart";
import { MenuItem } from "../types/MenuItem";

export default function Kalzone() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { addItem } = useCart();

  

  const kalzoneMenu = {
    featured: [
      {
        id: 1,
        name: "Kalzone Frango Catupiry",
        description: "Frango desfiado, catupiry, milho e oregano",
        price: 11.0,
        image:
          "https://admin.minikalzone.com.br/uploads/product/5/66aa85eda9b131.25291967.png",
        category: "Destaques",
      },
      {
        id: 2,
        name: "Kalzone de Brócolis",   
        description: "Brócolis, queijo mussarela, tomate e requeijão",
        price: 8.9,
        image:
          "https://admin.minikalzone.com.br/uploads/product/14/66aa887480d826.23902069.png",
        category: "Destaques",
      },
      {
        id: 3,
        name: "Frango cheddar e bacon",
        description: "Frango, cheddar, bacon e oregano",
        price: 12.9,
        image:
          "https://admin.minikalzone.com.br/uploads/product/13/66aa86d1d908c4.31505881.png",
        category: "Destaques",
      },
    ],
    traditional: [
      {
        id: 4,
        name: "Kalzone Calabresa",
        description: "Calabresa, mussarela, cebola e oregano",
        price: 11.9,
        image:
          "https://admin.minikalzone.com.br/uploads/product/10/66aa87abc96bd5.91994373.png",
        category: "Tradicionais",
      },
      {
        id: 5,
        name: "Kalzone Magherita",
        description: "manjericão, tomate e queijo mussarela",
        price: 11.9,
        image:
          "https://admin.minikalzone.com.br/uploads/product/12/66aa884f51e9b8.37979592.png?",
        category: "Tradicionais",
      },
    ],
    smoothies: [
      {
        id: 6,
        name: "Morango SEM NOÇÃO",
        description: "sorvete de baunilha com morango, banana e leite",
        price: 13.9,
        image:
          "//admin.minikalzone.com.br/uploads/product/24/66aa8ba452ba39.20574061.png",
        category: "Especiais",
      },
      {
        id: 7,
        name: "Maracujá IRADO",
        description: "abacaxi com suco de laranja, maracujá e leite",
        price: 13.9,
        image:
          "https://admin.minikalzone.com.br/uploads/product/21/66aa8c5d8e4a37.53906671.png",
        category: "Especiais",
      },
    ],
    sweet: [
      {
        id: 8,
        name: "Kalzone Chocolate",
        description: "Chocolate ao leite e chocolate branco",
        price: 8.9,
        image:
          "https://admin.minikalzone.com.br/uploads/product/18/66aa897c5d2235.68772467.png",
        category: "Doces",
      },
      {
        id: 9,
        name: "Kalzone com nutella",
        description: "",
        price: 8.9,
        image:
          "https://admin.minikalzone.com.br/uploads/product/49/66aa84c62e23a5.76113309.png",
        category: "Doces",
      },
    ],
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    addItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity,
      imageUrl: item.image || '',
      menuItemId: 0
    });
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Header />
      <main className="pt-20 px-4 max-w-7xl mx-auto pb-20">
        <RestaurantHeader
          name="Mini Kalzone Unifor"
          logo="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop&auto=format"
          rating={4.8}
          isOpen={true}
        />

        <MenuSection
          title="Destaques"
          items={kalzoneMenu.featured}
          variant="featured"
          onItemClick={handleItemClick}
        />

        <MenuSection
          title="Tradicionais"
          items={kalzoneMenu.traditional}
          variant="menu"
          onItemClick={handleItemClick}
        />

        <MenuSection
          title="Smoothies"
          items={kalzoneMenu.smoothies}
          variant="menu"
          onItemClick={handleItemClick}
        />

        <MenuSection
          title="Doces"
          items={kalzoneMenu.sweet}
          variant="menu"
          onItemClick={handleItemClick}
        />
      </main>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
