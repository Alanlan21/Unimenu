import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Header from '../../components/Header';
import StoreCard from '../../components/StoreCard';
import API_URL from './../../utils/api';

interface Store {
  id: number;
  name: string;
  logoUrl: string;
  isOpen: boolean;
}

export default function HomePage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await axios.get('http://192.168.2.100:3000/stores');
        setStores(response.data);
      } catch (err) {
        setError('Erro ao carregar os estabelecimentos.');
      } finally {
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  // Filtra as lojas com base no texto da busca
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const openStores = filteredStores.filter(store => store.isOpen);
  const closedStores = filteredStores.filter(store => !store.isOpen);

  return (
    <SafeAreaView style={styles.container}>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Faça seu pedido agora sem pegar filas!</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#f97316" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Estabelecimentos Abertos</Text>
              {openStores.length > 0 ? (
                openStores.map(store => <StoreCard key={store.id} {...store} />)
              ) : (
                <Text style={styles.noStoresText}>Nenhum estabelecimento encontrado.</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Estabelecimentos Fechados</Text>
              {closedStores.length > 0 ? (
                closedStores.map(store => <StoreCard key={store.id} {...store} />)
              ) : (
                <Text style={styles.noStoresText}>Nenhum estabelecimento encontrado.</Text>
              )}
            </View>
          </>
        )}

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
  noStoresText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  spacer: {
    height: 80,
  },
});
