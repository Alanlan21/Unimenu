import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeIcon, ShoppingCart } from 'lucide-react-native'; 

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFEFCF',
          height: 60,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#FF6B00', // Cor mais vibrante para aba ativa
        tabBarInactiveTintColor: '#666',  // Cor mais escura para aba inativa
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}
    >
      {/* <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />, 
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="checkout"
        options={{
          href: null, // Remove a aba "Checkout" da barra de navegação
        }}
      />
    

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="stores/[id]"
        options={{
          href: null, // Remove a aba "stores/[id]" da barra de navegação
        }}
      />

      

<Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bag-outline" size={size} color={color} />
          ),
        }}
      />
      
    </Tabs>
  );
}
