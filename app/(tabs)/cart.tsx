import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useCart } from '../../contexts/cart';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
         <Image
                   source={require('@/assets/images/unimenu-logo.png')} 
                   style={styles.logo}
                   resizeMode="contain"
                 />
          <Text style={styles.headerTitle}>Carrinho</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.back()}
          >
            <Text style={styles.browseButtonText}>Voltar para o cardápio</Text>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.headerTitle}>Carrinho</Text>
      </View>

      <ScrollView style={styles.itemsContainer}>
        {items.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.quantity}x {item.name}</Text>
              {item.description && (
                <Text style={styles.itemDescription}>Obs: {item.description}</Text>
              )}
              <Text style={styles.itemPrice}>
                R$ {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>

            <View style={styles.itemActions}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus size={16} color="#FF6B00" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus size={16} color="#FF6B00" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item.id, item.description)}
              >
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
          <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              console.log('Checkout:', items);
            }}
          >
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
    backgroundColor: '#FFF5E6', // Mantém o fundo da tela
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Espaça a logo e o texto
    padding: 10,
    backgroundColor: '#FFEFCF', // Cor de fundo do header
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  browseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  itemsContainer: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    color: '#FF6B00',
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    padding: 4,
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  removeButton: {
    padding: 4,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFEFCF',
    borderTopWidth: 2,
    borderTopColor: '#FEC68D',
    borderBottomWidth: 2,
    borderBottomColor: '#FEC68D',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    color: '#FF6B00',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFF8EC',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: '#FF6B00',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});