import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCart } from "../../contexts/cart";
import { useAuth } from "../../contexts/auth";
import { api } from "../../services/api";

export default function CheckoutScreen() {
  const router = useRouter();
  const { total } = useLocalSearchParams();
  const { items, taxa } = useCart();
  const { user, token } = useAuth();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado. Faça login para continuar.");
      router.replace("/(auth)/login");
      return;
    }

    if (items.length === 0) {
      Alert.alert("Erro", "Carrinho vazio. Adicione itens para continuar.");
      router.back();
      return;
    }

    const createOrderAndCheckout = async () => {
      try {
        setLoading(true);
        setError(null);

        const orderResponse = await api.orders.create(
          {
            idCliente: parseInt(user.id, 10),
            order_date: new Date().toISOString(),
            status: "pending",
            order_number: Math.floor(Math.random() * 1000000),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const orderId = orderResponse.id;
        setOrderId(orderId);

        const productOrders = items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        }));

        await api.orders.addItem(orderId, productOrders, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const itemsForStripe = [
          ...items.map((item) => ({
            name: item.name,
            amount: Math.round(item.price * 100),
            quantity: item.quantity,
          })),
          {
            name: "Taxa do app",
            amount: Math.round(taxa * 100),
            quantity: 1,
          },
        ];


        const successUrl = `http://192.168.2.100:3000/redirect/success?order_id=${orderId}`;
        const cancelUrl = `http://192.168.2.100:3000/redirect/cancel?order_id=${orderId}`;


        const checkoutResponse = await api.pagamento.checkout(
          {
            items: itemsForStripe,
            orderId: orderId,
            successUrl: successUrl,
            cancelUrl: cancelUrl,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCheckoutUrl(checkoutResponse.url);
      } catch (err) {
        console.error("Error creating checkout session:", err);
        setError("Erro ao iniciar o pagamento. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    createOrderAndCheckout();
  }, [user, items, router, token]);

  const handleReturnToDashboard = () => {
    router.replace("/dashboard");
  };

  if (checkoutUrl) {
    Linking.openURL(checkoutUrl).catch((err) => {
      console.error("Erro ao abrir URL:", err);
      setError("Erro ao abrir o checkout. Tente novamente.");
    });
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Redirecionando para o pagamento...</Text>
        <Text style={styles.instructionText}>
          Após o pagamento, retorne ao app e clique no botão abaixo para voltar ao dashboard.
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={handleReturnToDashboard}>
          <Text style={styles.backButtonText}>Voltar ao Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={styles.loadingText}>Iniciando pagamento...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Erro ao carregar o checkout.</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5E6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#FF6B00",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
