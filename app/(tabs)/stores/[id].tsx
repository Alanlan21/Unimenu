import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput, Modal, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Search, ShoppingCart, X, Plus, Minus } from 'lucide-react-native';
import api from '../../../utils/api';
import { useCart } from '../../../contexts/cart';
import { useAuth } from '../../../contexts/auth';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imgUrl?: string;
}

interface Store {
  id: number;
  name: string;
  logoUrl: string;
  isOpen: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function StorePage() {
  const { id } = useLocalSearchParams();
  const { addItem, items, removeItem, updateQuantity, total } = useCart();
  const { token } = useAuth();
  const router = useRouter();
  const [store, setStore] = useState<Store | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadStoreAndMenu();
  }, [id]);

  const loadStoreAndMenu = async () => {
    try {
      setLoading(true);

      if (!id || isNaN(Number(id))) {
        setError('ID da loja inválido');
        setLoading(false);
        return;
      }

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const storeResponse = await api.get(`/stores/${id}`, { headers });
      setStore(storeResponse.data);

      const menuResponse = await api.get(`/items/stores/${id}`, { headers });
      setMenuItems(menuResponse.data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      if (err instanceof Error) {
        setError(`Erro ao carregar dados do restaurante: ${err.message}`);
      } else {
        setError('Erro desconhecido ao carregar dados do restaurante');
      }
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setItemModalVisible(true);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      // Adiciona o item com a quantidade especificada
      addItem({
        id: selectedItem.id,
        name: selectedItem.name,
        price: Number(selectedItem.price),
        quantity: quantity, // Adiciona a quantidade diretamente
      });
      setItemModalVisible(false);
    }
  };

  // Agrupar itens por ID e somar as quantidades
  const groupedItems = items.reduce((acc: CartItem[], item: CartItem) => {
    const existing = acc.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity || 1; // Soma a quantidade
    } else {
      acc.push({ ...item, quantity: item.quantity || 1 });
    }
    return acc;
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  if (error || !store) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Restaurante não encontrado'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Modal de Seleção de Item */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={itemModalVisible}
        onRequestClose={() => setItemModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setItemModalVisible(false)}
        >
          <View style={styles.itemModalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setItemModalVisible(false)}
            >
              <X size={24} color="#333" />
            </TouchableOpacity>
            {selectedItem && (
              <>
                <Image
                  source={{ uri: selectedItem.imgUrl || 'https://via.placeholder.com/150' }}
                  style={styles.itemModalImage}
                />
                <Text style={styles.itemModalName}>{selectedItem.name}</Text>
                <Text style={styles.itemModalDescription}>{selectedItem.description}</Text>
                <Text style={styles.itemModalPrice}>R$ {Number(selectedItem.price).toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    style={styles.quantityButton}
                  >
                    <Minus size={16} color="#333" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    onPress={() => setQuantity(quantity + 1)}
                    style={styles.quantityButton}
                  >
                    <Plus size={16} color="#333" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={handleAddToCart}
                >
                  <Text style={styles.addToCartButtonText}>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Pressable>
      </Modal>

      {/* Modal do Carrinho (Lateral) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cartModalVisible}
        onRequestClose={() => setCartModalVisible(false)}
      >
        <View style={styles.cartModalContainer}>
          <View style={styles.cartModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seu Pedido em {store?.name}</Text>
              <TouchableOpacity onPress={() => setCartModalVisible(false)}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {items.length === 0 ? (
              <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
            ) : (
              <>
                <ScrollView style={styles.cartItemsContainer}>
                  {groupedItems.map((item) => (
                    <View key={item.id} style={styles.cartItem}>
                      <Text style={styles.cartItemName}>{item.quantity}x {item.name}</Text>
                      <View style={styles.cartItemActions}>
                        <Text style={styles.cartItemPrice}>
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            // Remove todas as instâncias do item
                            const itemToRemove = items.find(i => i.id === item.id);
                            if (itemToRemove) {
                              for (let i = 0; i < item.quantity; i++) {
                                removeItem(item.id);
                              }
                            }
                          }}
                          style={styles.removeButton}
                        >
                          <Text style={styles.removeButtonText}>Remover</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
                <View style={styles.modalFooter}>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Subtotal</Text>
                    <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Taxa de Serviço</Text>
                    <Text style={styles.totalValue}>R$ 0.99</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>R$ {(total + 0.99).toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => {
                      setCartModalVisible(false);
                      router.push('/(tabs)/cart');
                    }}
                  >
                    <Text style={styles.checkoutButtonText}>Prosseguir para Pagamento</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: store.logoUrl || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop' }}
          style={styles.storeLogo}
        />
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{store.name}</Text>
          <Text style={[
            styles.storeStatus,
            store.isOpen ? styles.openStatus : styles.closedStatus
          ]}>
            {store.isOpen ? 'Aberto' : 'Fechado'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setCartModalVisible(true)}
        >
          <ShoppingCart size={24} color="#FF6B00" />
          {items.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{items.length}</Text>
            </View>
          )}
          <Text style={styles.cartTotal}>R$ {total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar no cardápio..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            !selectedCategory && styles.selectedCategory
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[
            styles.categoryText,
            !selectedCategory && styles.selectedCategoryText
          ]}>Todos</Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer}>
        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleSelectItem(item)}
          >
            <Image
              source={{ uri: item.imgUrl || 'https://via.placeholder.com/100' }}
              style={styles.menuItemImage}
            />
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <Text style={styles.menuItemPrice}>
                R$ {Number(item.price).toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
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
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  storeLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  storeStatus: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  openStatus: {
    color: '#34C759',
  },
  closedStatus: {
    color: '#FF3B30',
  },
  cartButton: {
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartTotal: {
    fontSize: 12,
    color: '#FF6B00',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 3,
    flexGrow: 0,
  },
  categoryButton: {
    height: 32, // Mantém a altura fixa
    paddingHorizontal: 12, // Ajustado para um espaçamento interno confortável
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#FFF',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row', // Garante que o conteúdo interno seja alinhado em linha
    alignItems: 'center', // Centraliza o texto verticalmente
    justifyContent: 'center', // Centraliza o texto horizontalmente
  },
  selectedCategory: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  categoryText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
    flexWrap: 'nowrap', // Impede a quebra de texto
  },
  selectedCategoryText: {
    color: '#FFF',
    fontWeight: '700', // Aumentado para 700 para destaque
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B00',
  },
  // Estilos do Modal de Seleção de Item
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemModalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  itemModalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  itemModalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  itemModalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  itemModalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B00',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilos do Modal do Carrinho
  cartModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cartModalContent: {
    backgroundColor: '#FFF',
    width: '80%',
    height: '100%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemsContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#FF6B00',
    marginRight: 8,
  },
  removeButton: {
    marginLeft: 8,
  },
  removeButtonText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  modalFooter: {
    marginTop: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 16,
  },
});
