import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import StoreCard from '../../components/StoreCard';

interface Store {
  id: number;
  name: string;
  logoUrl: string;
  isOpen: boolean;
}

export default function HomePage() {
  const mockStores: Store[] = [
    { id: 1, name: "Mini Kalzone", logoUrl: "https://via.placeholder.com/150", isOpen: true },
    { id: 2, name: "Top's", logoUrl: "https://via.placeholder.com/150", isOpen: true },
    { id: 3, name: "Bebelu", logoUrl: "https://via.placeholder.com/150", isOpen: true },
    { id: 4, name: "Nostra Gula", logoUrl: "https://via.placeholder.com/150", isOpen: false },
    { id: 5, name: "Casa do Pão de Queijo", logoUrl: "https://via.placeholder.com/150", isOpen: true },
    { id: 6, name: "Hand full", logoUrl: "https://via.placeholder.com/150", isOpen: true },
    { id: 7, name: "Go Coffee", logoUrl: "https://via.placeholder.com/150", isOpen: false },
  ];

  const openStores = mockStores.filter(store => store.isOpen);
  const closedStores = mockStores.filter(store => !store.isOpen);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Faça seu pedido agora sem pegar filas!
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estabelecimentos Abertos</Text>
          {openStores.map(store => (
            <StoreCard key={store.id} {...store} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estabelecimentos Fechados</Text>
          {closedStores.map(store => (
            <StoreCard key={store.id} {...store} />
          ))}
        </View>

        <View style={styles.spacer} />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  banner: {
    backgroundColor: '#ffedd5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ea580c',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 16,
  },
  spacer: {
    height: 80,
  },
  fabButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#f97316',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});