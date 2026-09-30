import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, Tabs } from 'expo-router';
import { useRequests } from '../../hooks/RequestContext';
import RequestCard from '../../components/RequestCard';
import { COLORS } from '../../constants/Colors';

export default function RequestsScreen() {
  const { requests } = useRequests();
  const router = useRouter();
  const [filter, setFilter] = useState('All');

  const filteredRequests = requests.filter(req => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return req.status === 'pending';
    if (filter === 'Active') return req.status === 'active';
    return true;
  });

  return (
    <View style={styles.container}>
      <Tabs.Screen options={{ title: 'Requests' }} />
      <View style={styles.tabsContainer}>
        {['All', 'Pending', 'Active'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, filter === tab && styles.activeTab]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.tabText, filter === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RequestCard
            request={item}
            onPress={() => router.push(`/incident/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  tabsContainer: { flexDirection: 'row', marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: COLORS.primary },
  tabText: { color: COLORS.textLight, fontWeight: '600' },
  activeTabText: { color: COLORS.primary }
});
