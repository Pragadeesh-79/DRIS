import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Tabs } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { MOCK_DATA } from '../../services/mockData';
import { COLORS } from '../../constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CitizenHospitals() {
  const { hospitals } = MOCK_DATA || { hospitals: [] };

  const handleDirections = (coords) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.distance}>{item.distance} away</Text>
        <View style={styles.bedInfo}>
          <Text style={[styles.beds, { color: item.bedsAvailable > 20 ? (COLORS.success || '#10B981') : (COLORS.warning || '#F59E0B') }]}>
            {item.bedsAvailable}/{item.bedsTotal} Beds Available
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => handleDirections(item.coords)}>
        <Text style={styles.btnText}>Directions</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Tabs.Screen options={{ title: 'Hospitals' }} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
      >
        {hospitals.map((h, i) => (
          <Marker
            key={i}
            coordinate={{ latitude: h.coords.lat, longitude: h.coords.lng }}
            title={h.name}
            pinColor="blue"
          />
        ))}
      </MapView>
      <FlatList
        data={hospitals}
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
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.text || '#1F2937', marginBottom: 4 },
  distance: { fontSize: 14, color: COLORS.textSecondary || '#6B7280', marginBottom: 4 },
  bedInfo: { flexDirection: 'row', alignItems: 'center' },
  beds: { fontSize: 14, fontWeight: '500' },
  btn: { backgroundColor: COLORS.primary || '#2563EB', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
