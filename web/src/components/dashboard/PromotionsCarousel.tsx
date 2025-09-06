// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface Promotion {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
// }

// interface PromotionsCarouselProps {
//   promotions: Promotion[];
// }

// export function PromotionsCarousel({ promotions }: PromotionsCarouselProps) {
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 3;
//   const totalPages = Math.ceil(promotions.length / itemsPerPage);

//   const nextPage = () => {
//     setCurrentPage((prev) => (prev + 1) % totalPages);
//   };

//   const prevPage = () => {
//     setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
//   };

//   const currentItems = promotions.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );

//   return (
//     <section className="relative">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Promoções</h2>
      
//       <div className="relative">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {currentItems.map((promo) => (
//             <div key={promo.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//               <div className="flex justify-between">
//                 <div className="flex-1">
//                   <h3 className="font-medium text-orange-500">{promo.title}</h3>
//                   <p className="text-sm text-gray-600 mt-2">{promo.description}</p>
//                   <p className="text-lg font-semibold text-orange-500 mt-3">
//                     R$ {promo.price.toFixed(2)}
//                   </p>
//                 </div>
//                 <img
//                   src={promo.image}
//                   alt={promo.title}
//                   className="w-24 h-24 rounded-lg ml-4 object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {totalPages > 1 && (
//           <>
//             <button
//               onClick={prevPage}
//               className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
//             >
//               <ChevronLeft className="h-6 w-6 text-gray-600" />
//             </button>
//             <button
//               onClick={nextPage}
//               className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
//             >
//               <ChevronRight className="h-6 w-6 text-gray-600" />
//             </button>
//           </>
//         )}
//       </div>
      
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4 space-x-2">
//           {Array.from({ length: totalPages }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentPage(index)}
//               className={`w-2 h-2 rounded-full ${
//                 currentPage === index ? 'bg-orange-500' : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }