import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/Colors';
import { useRequests } from '../../hooks/RequestContext';

export default function MapScreen() {
  const { requests } = useRequests();
  const activeRequests = requests.filter(r => r.status !== 'resolved');

  const initialRegion = {
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const staticMarkers = [
    { id: 2, lat: 13.0800, lng: 80.2700, type: 'hospital', color: COLORS.info, icon: 'hospital-box' },
    { id: 3, lat: 13.0900, lng: 80.2800, type: 'relief', color: COLORS.success, icon: 'tent' },
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {staticMarkers.map(m => (
          <Marker key={`static-${m.id}`} coordinate={{ latitude: m.lat, longitude: m.lng }}>
            <MaterialCommunityIcons name={m.icon} size={28} color={m.color} />
          </Marker>
        ))}

        {activeRequests.map(req => {
          // Determine icon and color based on priority
          let icon = 'alert-decagram';
          let color = COLORS.warning;
          if (req.priority === 'Critical') color = COLORS.danger;
          if (req.priority === 'High') color = COLORS.warning;
          if (req.priority === 'Medium') color = COLORS.info;

          return (
            <Marker 
              key={`req-${req.id}`} 
              coordinate={{ latitude: req.coords.lat, longitude: req.coords.lng }}
            >
              <MaterialCommunityIcons name={icon} size={32} color={color} />
              <Callout>
                <View style={{ padding: 4 }}>
                  <Text style={{ fontWeight: 'bold' }}>{req.type} Emergency</Text>
                  <Text>{req.priority} Priority</Text>
                  <Text>{req.status}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <TouchableOpacity style={styles.fab}>
        <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.legend}>
        <View style={styles.legendItem}><MaterialCommunityIcons name="alert-decagram" size={16} color={COLORS.danger}/><Text style={styles.legendText}>Critical SOS</Text></View>
        <View style={styles.legendItem}><MaterialCommunityIcons name="alert-decagram" size={16} color={COLORS.warning}/><Text style={styles.legendText}>High SOS</Text></View>
        <View style={styles.legendItem}><MaterialCommunityIcons name="hospital-box" size={16} color={COLORS.info}/><Text style={styles.legendText}>Hospital</Text></View>
        <View style={styles.legendItem}><MaterialCommunityIcons name="tent" size={16} color={COLORS.success}/><Text style={styles.legendText}>Relief</Text></View>
      </View>

      {activeRequests.length > 0 && (
        <View style={styles.bottomPanel}>
          <Text style={styles.panelTitle}>Active Incidents: {activeRequests.length}</Text>
          <Text style={styles.panelText}>Latest: {activeRequests[0].type} at {activeRequests[0].time}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  fab: { position: 'absolute', top: 16, right: 16, backgroundColor: COLORS.primary, padding: 12, borderRadius: 28, elevation: 4 },
  legend: { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  legendText: { marginLeft: 8, fontSize: 12, color: COLORS.text },
  bottomPanel: { position: 'absolute', bottom: 16, left: 16, right: 16, backgroundColor: '#fff', padding: 16, borderRadius: 8, elevation: 4 },
  panelTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.danger, marginBottom: 8 },
  panelText: { fontSize: 14, color: COLORS.text, marginBottom: 4 }
});
