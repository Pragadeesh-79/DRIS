import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Tabs } from 'expo-router';
import { MOCK_DATA } from '../../services/mockData';
import StatusDot from '../../components/StatusDot';
import { COLORS } from '../../constants/Colors';

const severityColors = {
  critical: '#DC2626',
  high: '#EA580C',
  medium: '#D97706',
  low: '#16A34A'
};

export default function CitizenAlerts() {
  const { alerts } = MOCK_DATA || { alerts: [] };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <StatusDot color={severityColors[item.severity] || COLORS.primary || '#2563EB'} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Tabs.Screen options={{ title: 'Alerts' }} />
      <FlatList
        data={alerts}
        keyExtractor={item => item.id || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#F3F4F6' },
  list: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: COLORS.border || '#E5E7EB' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '600', color: COLORS.text || '#1F2937', marginLeft: 8, flex: 1 },
  details: { flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20 },
  location: { fontSize: 14, color: COLORS.textSecondary || '#6B7280' },
  time: { fontSize: 12, color: COLORS.textSecondary || '#6B7280' }
});
