import { useState, useEffect } from 'react';
import { api, Store } from '../services/api';

export function useStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStores();
  }, []);

  async function loadStores() {
    try {
      setLoading(true);
      const data = await api.stores.getAll();
      setStores(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar estabelecimentos');
    } finally {
      setLoading(false);
    }
  }

  async function searchStores(query: string) {
    try {
      setLoading(true);
      const data = await api.stores.search(query);
      setStores(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao pesquisar estabelecimentos');
    } finally {
      setLoading(false);
    }
  }

  return {
    stores,
    loading,
    error,
    refreshStores: loadStores,
    searchStores,
  };
}