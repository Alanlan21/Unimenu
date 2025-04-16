import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useCart } from '../../contexts/cart';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carrinho</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.back()}>
            <Text style={styles.browseButtonText}>Voltar para o cardápio</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      
      <ScrollView style={styles.itemsContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                R$ {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.itemActions}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                <Minus size={16} color="#FF6B00" />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{item.quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                <Plus size={16} color="#FF6B00" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item.id)}>
                <Trash2 size={16} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearCart}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              router.push({ pathname: '/checkout' });
            }}>
            <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  browseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  itemsContainer: {
    flex: 1,
  },
  cartItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B00',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF8EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 16,
    marginTop: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#FFE5E5',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
  },
  checkoutButton: {
    flex: 2,
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
