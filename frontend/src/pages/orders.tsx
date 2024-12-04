import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { OrderCard } from "../components/orders/OrderCard";
import { OrderDetailsModal } from "../components/orders/OrderDetailsModal";
import api from "../services/api";
import { API_ENDPOINTS } from "../config/api";
import { orderApi } from "../services/orderApi";

interface MenuItem {
  id: number;
  name: string;
}

interface ProductOrder {
  id: number;
  quantity: number;
  menuItem: MenuItem;
}

interface Order {
  id: number;
  order_number: number;
  order_date: string;
  status: string;
  productOrders: ProductOrder[];
  user: {
    id: number;
  };
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          throw new Error("Usuário não autenticado");
        }
        const user = JSON.parse(userStr);

        const response = await api.get(
          `${API_ENDPOINTS.orders}?userId=${user.id}`
        );
        console.log("Orders response:", response.data);

        if (!response.data) {
          throw new Error("Nenhum pedido encontrado");
        }

        // Sort orders by date in descending order (newest first)
        const sortedOrders = response.data.sort((a: Order, b: Order) => {
          return (
            new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
          );
        });

        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(
          error instanceof Error ? error.message : "Erro ao carregar pedidos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await orderApi.deleteOrder(orderId);
      setOrders(orders.filter((order) => order.id !== orderId));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Erro ao deletar pedido");
    }
  };

  const handleDetailsClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const addMinutes = (date: string, minutes: number) => {
    return new Date(new Date(date).getTime() + minutes * 60000);
  };
  const getStoreName = () => "Mini Kalzone Unifor";
  const getStoreLogoUrl = () => "/kalzone.png";

  return (
    <div className="min-h-screen bg-[#FFF5E6]">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#8B4513] mb-2">Meus Pedidos</h1>
        <h2 className="text-xl text-[#8B4513] mb-6">Histórico</h2>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando pedidos...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                storeName={getStoreName()}
                storeLogoUrl={getStoreLogoUrl()}
                orderNumber={order.order_number.toString()}
                date={formatDate(order.order_date)}
                time={formatTime(order.order_date)}
                status={
                  order.status as
                    | "Realizado"
                    | "Confirmado"
                    | "Pronto para retirada"
                }
                items={
                  order.productOrders?.map((po) => ({
                    quantity: po.quantity,
                    name: po.menuItem?.name || "Item indisponível",
                  })) || []
                }
                onDetailsClick={() => handleDetailsClick(order)}
                onDeleteClick={() => {
                  if (
                    window.confirm(
                      "Tem certeza que deseja deletar este pedido?"
                    )
                  ) {
                    handleDeleteOrder(order.id);
                  }
                }}
                onHelpClick={() => {}}
                onAddToCartClick={() => {}}
                onRateClick={() => {}}
              />
            ))}

            {orders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Você ainda não fez nenhum pedido.
                </p>
              </div>
            )}
          </div>
        )}

        {selectedOrder && (
          <OrderDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            storeName={getStoreName()}
            date={formatDate(selectedOrder.order_date)}
            statusTimeline={[
              {
                status: "Realizado",
                time: formatTime(selectedOrder.order_date),
                description: "Seu pedido foi confirmado.",
              },
              {
                status: "Confirmado",
                time: formatTime(selectedOrder.order_date),
                description: "Seu pedido está sendo preparado.",
              },
              {
                status: "Pronto para retirada",
                time: formatTime(addMinutes(selectedOrder.order_date, 15).toISOString()),
                description: "Seu pedido estará pronto.",
              },
            ]}
          />
        )}
      </main>
    </div>
  );
}
