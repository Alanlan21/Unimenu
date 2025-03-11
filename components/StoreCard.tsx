import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface StoreCardProps {
  name: string;
  logoUrl: string;
  isOpen: boolean;
}

export default function StoreCard({ name, logoUrl, isOpen }: StoreCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.card, !isOpen && styles.closedCard]}>
        <Image
          source={{ uri: logoUrl.startsWith('http') ? logoUrl : 'https://via.placeholder.com/150' }}
          style={styles.logo}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={[styles.status, isOpen ? styles.openStatus : styles.closedStatus]}>
            {isOpen ? 'Aberto' : 'Fechado'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  closedCard: {
    opacity: 0.7,
  },
  logo: {
    width: '100%',
    height: 120,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  openStatus: {
    color: '#059669',
  },
  closedStatus: {
    color: '#dc2626',
  },
});