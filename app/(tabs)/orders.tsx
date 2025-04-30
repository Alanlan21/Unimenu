import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
} from 'react-native';
import { useAuth } from '@/contexts/auth';
import { useCart } from '@/contexts/cart';
import Toast from 'react-native-toast-message';
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
  PENDING: '#888888',
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { addItem } = useCart();
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

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const addToCart = () => {
    if (!selectedOrder) return;

    try {
      // Adicionar cada item do pedido ao carrinho
      selectedOrder.productOrders.forEach((item) => {
        addItem({
          id: item.menuItem.id,
          name: item.menuItem.name,
          price: item.menuItem.price,
          quantity: item.quantity,
        });
      });
      Toast.show({
        type: 'success',
        text1: 'Item adicionado',
        text2: 'Itens adicionados ao carrinho com sucesso!',
        position: 'bottom',
        visibilityTime: 3000, 
      });
      setModalVisible(false);
      alert('Itens adicionados ao carrinho com sucesso!');
      
    } catch (err) {
      console.error('Erro ao adicionar itens ao carrinho:', err);
        Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao adicionar itens ao carrinho',
        position: 'bottom',
        visibilityTime: 3000,
      });    }
  };

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedOrder && (
              <>
                <Text style={styles.modalTitle}>Detalhes do Pedido #{selectedOrder.order_number}</Text>
                <Text style={styles.modalSubtitle}>
                  Status: {getStatusLabel(normalizeStatus(selectedOrder.status))}
                </Text>
                <Text style={styles.modalSubtitle}>
                  Data: {formatDate(selectedOrder.order_date)}
                </Text>
                <View style={styles.modalItems}>
                  <Text style={styles.modalSectionTitle}>Itens:</Text>
                  {selectedOrder.productOrders.map((item, index) => (
                    <Text key={index} style={styles.modalItemText}>
                      {item.quantity}x {item.menuItem.name} - R${(item.menuItem.price * item.quantity).toFixed(2)}
                    </Text>
                  ))}
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.closeButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>Fechar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.addToCartButton]}
                    onPress={addToCart}
                  >
                    <Text style={styles.modalButtonText}>Adicionar ao Carrinho</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

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
                    <TouchableOpacity style={styles.detailsButton} onPress={() => openOrderDetails(order)}>
                      <Text style={styles.detailsButtonText}>Detalhes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>

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
                    <TouchableOpacity style={styles.detailsButton} onPress={() => openOrderDetails(order)}>
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
    padding: 10,
    backgroundColor: '#FFEFCF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
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
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
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
    marginBottom: 8,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    color: '#FFF',
    fontSize: 10,
    fontWeight: '500',
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  orderDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  detailsButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  detailsButtonText: {
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B00',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 5,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 10,
  },
  modalItems: {
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
  modalItemText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: 'red',
  },
  addToCartButton: {
    backgroundColor: '#FF6B00',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    textAlign: 'center', // Centraliza o texto horizontalmente
  },
});