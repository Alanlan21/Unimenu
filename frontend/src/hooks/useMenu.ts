// import { useState, useEffect } from 'react';
// import { MenuItem } from '../types/MenuItem';
// import { menuService } from '../services/api';

// export function useMenu(storeId: number) {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         setLoading(true);
//         const items = await menuService.getMenuItems(storeId);
//         setMenuItems(items);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Erro ao carregar menu');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, [storeId]);

//   return { menuItems, loading, error };
// }
