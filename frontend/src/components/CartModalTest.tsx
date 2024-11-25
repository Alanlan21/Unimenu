// import React, { useState } from 'react';
// import CartModal from './CartModal'; // Certifique-se de ajustar o caminho do componente

// export default function CartModalTest() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [items, setItems] = useState([
//     { id: 1, menuItemId: 1, name: 'Kalzone de Frango', price: 10.0, quantity: 2 },
//     { id: 2, menuItemId: 2, name: 'Kalzone de Carne', price: 12.0, quantity: 1 },
//   ]);

//   const handleUpdateQuantity = (id: number, quantity: number) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
//       )
//     );
//   };

//   const handleRemoveItem = (id: number) => {
//     setItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <div>
//       <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
//       <CartModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         items={items}
//         onUpdateQuantity={handleUpdateQuantity}
//         onRemoveItem={handleRemoveItem}
//       />
//     </div>
//   );
// }