import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/auth';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/unimenu-logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Minha Conta</Text>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Olá, {user?.name?.split(' ')[0] || 'Nome_usuário'}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Aqui estão seus dados:</Text>

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.dataContainer}>
            <View style={styles.dataField}>
              <Ionicons name="person" size={20} color="#8B4513" />
              <View style={styles.dataContent}>
                <Text style={styles.dataLabel}>Nome completo</Text>
                <Text style={styles.dataValue}>{user?.name || '-'}</Text>
              </View>
            </View>

            <View style={styles.dataField}>
              <Ionicons name="calendar" size={20} color="#8B4513" />
              <View style={styles.dataContent}>
                <Text style={styles.dataLabel}>Data de aniversário</Text>
                <Text style={styles.dataValue}>
                  {user?.birthDate ? new Date(user.birthDate).toLocaleDateString('pt-BR') : '-'}
                </Text>
              </View>
            </View>

            <View style={styles.dataField}>
              <Ionicons name="card" size={20} color="#8B4513" />
              <View style={styles.dataContent}>
                <Text style={styles.dataLabel}>CPF</Text>
                <Text style={styles.dataValue}>{user?.cpf || '-'}</Text>
              </View>
            </View>

            <View style={styles.dataField}>
              <Ionicons name="mail" size={20} color="#8B4513" />
              <View style={styles.dataContent}>
                <Text style={styles.dataLabel}>Email</Text>
                <Text style={styles.dataValue}>{user?.email || '-'}</Text>
              </View>
            </View>

            <View style={styles.dataField}>
              <Ionicons name="call" size={20} color="#8B4513" />
              <View style={styles.dataContent}>
                <Text style={styles.dataLabel}>Telefone</Text>
                <Text style={styles.dataValue}>{user?.phone || '-'}</Text>
              </View>
            </View>

            <View style={styles.dataField}>
              <Ionicons name="male-female" size={20} color="#8B4513" />
              <View style={styles.dataContent}>
                <Text style={styles.dataLabel}>Gênero</Text>
                <Text style={styles.dataValue}>{user?.gender || '-'}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
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
    width: 50, // Ajuste o tamanho da logo conforme necessário
    height: 50,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#8B4513', // Cor marrom escura para o texto
  },
  welcomeContainer: {
    padding: 16,
    backgroundColor: '#FFF8EC'
  },
  welcomeText: {
    fontSize: 18,
    color: '#8B4513',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '600',
    marginBottom: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  dataContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  dataField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF8EC',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  dataContent: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  updateButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});