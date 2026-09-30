import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { useRequests } from '../../hooks/RequestContext';
import TrackingTimeline from '../../components/TrackingTimeline';
import { COLORS } from '../../constants/Colors';

export default function CitizenRequests() {
  const { requests } = useRequests();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpand(item.id)}>
          <View>
            <Text style={styles.reqId}>Request {item.id}</Text>
            <Text style={styles.reqType}>{item.type}</Text>
          </View>
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: COLORS[item.priority] || COLORS.primary || '#2563EB' }]}>
              <Text style={styles.badgeText}>{item.priority}</Text>
            </View>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.expandedArea}>
            <TrackingTimeline status={item.status} assignedTeam={item.assignedTeam} eta={item.eta} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Tabs.Screen options={{ title: 'My Requests' }} />
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No requests found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#F3F4F6' },
  list: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reqId: { fontSize: 16, fontWeight: 'bold', color: COLORS.text || '#1F2937' },
  reqType: { fontSize: 14, color: COLORS.textSecondary || '#6B7280', marginTop: 4 },
  badges: { alignItems: 'flex-end' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginBottom: 4 },
  badgeText: { fontSize: 12, color: '#fff', fontWeight: 'bold', textTransform: 'capitalize' },
  statusText: { fontSize: 12, color: COLORS.textSecondary || '#6B7280', textTransform: 'uppercase' },
  expandedArea: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: COLORS.border || '#E5E7EB' },
  empty: { textAlign: 'center', marginTop: 40, color: COLORS.textSecondary || '#6B7280' }
});
