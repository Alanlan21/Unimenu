import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { OrderCard } from '../../components/orders/OrderCard';
import { Order, OrderStatus } from '../../types/workerApi';
import { fetchOrders, updateOrderStatus } from '../../types/workerApi'; // Importando as funções
export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const storeId = Number(localStorage.getItem('storeId'));

  useEffect(() => {
    const loadOrders = async () => {
      if (!storeId) {
        console.error('storeId não encontrado!');
        return;
      }
      try {
        const fetchedOrders = await fetchOrders(storeId);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [storeId]);

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: updatedOrder.status } : order
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const pendingOrders = orders.filter(order =>
    ['pending', 'accepted', 'preparing'].includes(order.status)
  );

  const completedOrders = orders.filter(order =>
    ['finished', 'denied'].includes(order.status)
  );

  if (loading) {
    return <div>Carregando pedidos...</div>; // Exibir mensagem de loading
  }


  return (
    <div className="min-h-screen bg-primary-light/10">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Active Orders Section */}
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Pedidos em Aberto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </section>

          {/* Completed Orders Section */}
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Pedidos Finalizados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
