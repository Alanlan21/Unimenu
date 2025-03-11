import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Search, User, ShoppingCart } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter();
  return (
<View style={styles.container}> 
  <View style={styles.topRow}>
    <View style={styles.logoContainer}>
      <Image
        source={require('../assets/images/unimenu 1.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Busque por um item ou estabelecimen..."
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity style={styles.userIconButton}>
            <User size={24} color="#f97316" />
          </TouchableOpacity>
      </View>
      
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.ordersButton}>
          <Text style={styles.ordersText}>Histórico de pedidos</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/cart')}>
          <View style={styles.cartContainer}>
          <Text style={styles.cartTotal}>R$ 00,00</Text>
            <ShoppingCart size={24} color="#f97316" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>0</Text>
            </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEFCF',
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 50,
    height: 50,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8EC',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
    marginRight: 4,
  },
  userIconButton: {
    padding: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  ordersButton: {
    paddingVertical: 4,
  },
  ordersText: {
    fontSize: 16,
    color: '#f97316',
    fontWeight: '500',
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartTotal: {
    marginRight: 8,
    color: '#f97316',
    fontWeight: '600',
    fontSize: 16,
  },
  cartButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#f97316',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});