import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Tabs } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { MOCK_DATA } from '../../services/mockData';
import { COLORS } from '../../constants/Colors';

export default function CitizenShelters() {
  const { shelters } = MOCK_DATA || { shelters: [] };

  const handleDirections = (coords) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => {
    const isFull = item.occupancy >= item.capacity;
    const progress = Math.min(item.occupancy / item.capacity, 1);
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={[styles.chip, { backgroundColor: isFull ? (COLORS.critical || '#DC2626') : (COLORS.success || '#10B981') }]}>
            <Text style={styles.chipText}>{isFull ? 'Full' : 'Open'}</Text>
          </View>
        </View>
        <Text style={styles.distance}>{item.distance} away</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: isFull ? (COLORS.critical || '#DC2626') : (COLORS.success || '#10B981') }]} />
          </View>
          <Text style={styles.progressText}>{item.occupancy}/{item.capacity}</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => handleDirections(item.coords)}>
          <Text style={styles.btnText}>Directions</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Tabs.Screen options={{ title: 'Shelters' }} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
      >
        {shelters.map((s, i) => (
          <Marker
            key={i}
            coordinate={{ latitude: s.coords.lat, longitude: s.coords.lng }}
            title={s.name}
            pinColor={s.occupancy >= s.capacity ? "red" : "green"}
          />
        ))}
      </MapView>
      <FlatList
        data={shelters}
        keyExtractor={item => item.id || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#F3F4F6' },
  map: { height: 250, width: '100%' },
  list: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.text || '#1F2937' },
  chip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  chipText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  distance: { fontSize: 14, color: COLORS.textSecondary || '#6B7280', marginBottom: 12 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  progressBarBg: { flex: 1, height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, marginRight: 8, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  progressText: { fontSize: 12, color: COLORS.textSecondary || '#6B7280', width: 40, textAlign: 'right' },
  btn: { backgroundColor: COLORS.primary || '#2563EB', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
