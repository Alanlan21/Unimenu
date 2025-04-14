import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useAuth } from '@/contexts/auth';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

interface OrderItem {
  id: number;
  quantity: number;
  menuItem: {
    id: number;
    name: string;
    price: number;
  };
}

interface Order {
  id: number;
  order_number: number;
  order_date: Date;
  status: string;
  productOrders: OrderItem[];
}

type OrderStatus = 'READY' | 'IN_PROGRESS' | 'CANCELLED' | 'PICKED_UP' | 'PENDING';

const STATUS_COLORS: Record<OrderStatus, string> = {
  READY: '#34C759',
  IN_PROGRESS: '#FFB800',
  CANCELLED: '#FF3B30',
  PICKED_UP: '#FF6B00',
  PENDING: '#888888', // Corrigido o ## para #
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  READY: 'Pronto para retirada',
  IN_PROGRESS: 'Em andamento',
  CANCELLED: 'Cancelado',
  PICKED_UP: 'Retirado',
  PENDING: 'Pendente',
};

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    if (!user || !user.id) {
      setError('Usuário não autenticado');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userId = parseInt(user.id, 10);
      if (isNaN(userId)) {
        throw new Error('ID do usuário inválido');
      }
      const response = await axios.get(`${API_URL}/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setOrders(response.data);
    } catch (err) {
      setError('Erro ao carregar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const normalizeStatus = (status: string): OrderStatus => {
    const statusMap: { [key: string]: OrderStatus } = {
      ready: 'READY',
      in_progress: 'IN_PROGRESS',
      cancelled: 'CANCELLED',
      picked_up: 'PICKED_UP',
      pending: 'PENDING',
    };
    // Retorna 'PENDING' (em maiúsculas) como padrão, para corresponder a OrderStatus
    return statusMap[status.toLowerCase()] || 'PENDING';
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${d.getDate()} ${d.toLocaleString('default', { month: 'long' })}, ${d.getHours()}:${String(
      d.getMinutes()
    ).padStart(2, '0')}`;
  };

  const getStatusColor = (status: OrderStatus) => STATUS_COLORS[status] || '#999';
  const getStatusLabel = (status: OrderStatus) => STATUS_LABELS[status] || status;

  // Dividir os pedidos em "em andamento" e "encerrados"
  const ongoingOrders = orders.filter((order) => {
    const status = normalizeStatus(order.status);
    return status === 'READY' || status === 'IN_PROGRESS' || status === 'PENDING';
  });

  const completedOrders = orders.filter((order) => {
    const status = normalizeStatus(order.status);
    return status === 'CANCELLED' || status === 'PICKED_UP';
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadOrders}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/unimenu-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Histórico de pedidos</Text>
      </View>
      <ScrollView
        style={styles.ordersList}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Pedidos em andamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pedidos em andamento</Text>
          {ongoingOrders.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum pedido em andamento no momento</Text>
          ) : (
            ongoingOrders.map((order) => {
              const normalizedStatus = normalizeStatus(order.status);
              return (
                <View
                  key={order.id}
                  style={[styles.orderCard, { borderLeftColor: getStatusColor(normalizedStatus) }]}
                >
                  <View style={styles.orderHeader}>
                    <View style={styles.storeInfo}>
                      <View>
                        <Text style={styles.storeName}>Pedido #{order.order_number}</Text>
                      </View>
                    </View>
                    <Text style={[styles.statusBadge, { backgroundColor: getStatusColor(normalizedStatus) }]}>
                      {getStatusLabel(normalizedStatus)}
                    </Text>
                  </View>

                  <View style={styles.orderItems}>
                    {order.productOrders.map((item, index) => (
                      <Text key={index} style={styles.itemText}>
                        {item.quantity}x {item.menuItem.name}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.orderFooter}>
                    <Text style={styles.orderDate}>{formatDate(order.order_date)}</Text>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>Detalhes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Pedidos encerrados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pedidos encerrados</Text>
          {completedOrders.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum pedido encerrado ainda</Text>
          ) : (
            completedOrders.map((order) => {
              const normalizedStatus = normalizeStatus(order.status);
              return (
                <View
                  key={order.id}
                  style={[styles.orderCard, { borderLeftColor: getStatusColor(normalizedStatus) }]}
                >
                  <View style={styles.orderHeader}>
                    <View style={styles.storeInfo}>
                      <View>
                        <Text style={styles.storeName}>Pedido #{order.order_number}</Text>
                      </View>
                    </View>
                    <Text style={[styles.statusBadge, { backgroundColor: getStatusColor(normalizedStatus) }]}>
                      {getStatusLabel(normalizedStatus)}
                    </Text>
                  </View>

                  <View style={styles.orderItems}>
                    {order.productOrders.map((item, index) => (
                      <Text key={index} style={styles.itemText}>
                        {item.quantity}x {item.menuItem.name}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.orderFooter}>
                    <Text style={styles.orderDate}>{formatDate(order.order_date)}</Text>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>Detalhes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFEFCF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  logo: {
    width: 50, 
    height: 50,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B00',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  ordersList: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF6B00',
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 10, // Reduzido de 12 para um visual mais compacto
    padding: 12, // Reduzido de 16 para ocupar menos espaço
    marginBottom: 12, // Reduzido de 16 para diminuir o espaço entre os cards
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // Reduzido de 12 para menos espaço vertical
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeName: {
    fontSize: 14, // Reduzido de 16 para um texto mais compacto
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 8, // Reduzido de 12
    paddingVertical: 4, // Reduzido de 6
    borderRadius: 12, // Reduzido de 16 para combinar com o tamanho menor
    overflow: 'hidden',
    color: '#FFF',
    fontSize: 10, // Reduzido de 12
    fontWeight: '500',
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8, // Reduzido de 12
  },
  itemText: {
    fontSize: 12, // Reduzido de 14
    color: '#4B5563',
    marginBottom: 2, // Reduzido de 4
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6, // Reduzido de 8
    paddingTop: 8, // Reduzido de 12
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  orderDate: {
    fontSize: 12, // Reduzido de 14
    color: '#6B7280',
  },
  detailsButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12, // Reduzido de 16
    paddingVertical: 6, // Reduzido de 8
    borderRadius: 16, // Reduzido de 20
  },
  detailsButtonText: {
    color: '#4B5563',
    fontSize: 12, // Reduzido de 14
    fontWeight: '500',
  },
});