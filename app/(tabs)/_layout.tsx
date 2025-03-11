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
      tabBarActiveTintColor: '#f97316',
      tabBarInactiveTintColor: '#e5e5e5',
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
    }}
  >
          <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

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
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
