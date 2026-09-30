import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRole } from '../hooks/RoleContext';

export default function Index() {
  const router = useRouter();
  const { role, setRole, isLoading } = useRole();

  useEffect(() => {
    if (!isLoading && role) {
      if (role === 'citizen') {
        router.replace('/(citizen)');
      } else if (role === 'team') {
        router.replace('/(team)');
      }
    }
  }, [role, isLoading, router]);

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'citizen') {
      router.replace('/(citizen)');
    } else {
      router.replace('/(team)');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="shield-check" size={32} color="#2563EB" />
        </View>
        <Text style={styles.title}>DRIS</Text>
        <Text style={styles.subtitle}>Disaster Response Information System</Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSelectRole('citizen')}
        >
          <MaterialCommunityIcons name="account-outline" size={40} color="#2563EB" />
          <Text style={styles.cardTitle}>Citizen</Text>
          <Text style={styles.cardSubtitle}>Report incidents and request help</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSelectRole('team')}
        >
          <MaterialCommunityIcons name="shield-account-outline" size={40} color="#2563EB" />
          <Text style={styles.cardTitle}>Response Team</Text>
          <Text style={styles.cardSubtitle}>Manage and respond to incidents</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>National Disaster Management Authority</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 12,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
