import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Tabs, router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SOSSheet from '../../components/SOSSheet';
import { COLORS } from '../../constants/Colors';

const actions = [
  { id: 'sos', title: 'Send Emergency Request', icon: 'alert-circle', color: COLORS.critical || '#DC2626', action: 'sos' },
  { id: 'track', title: 'Track Requests', icon: 'clipboard-check', color: COLORS.primary || '#2563EB', action: '/(citizen)/requests' },
  { id: 'hospitals', title: 'Nearby Hospitals', icon: 'hospital-box', color: '#2563EB', action: '/(citizen)/hospitals' },
  { id: 'shelters', title: 'Nearby Shelters', icon: 'tent', color: '#059669', action: '/(citizen)/shelters' },
  { id: 'alerts', title: 'Emergency Alerts', icon: 'bell-alert', color: '#EA580C', action: '/(citizen)/alerts', fullWidth: true },
];

export default function CitizenHome() {
  const [showSOS, setShowSOS] = useState(false);

  const handleAction = (action) => {
    if (action === 'sos') {
      setShowSOS(true);
    } else {
      router.push(action);
    }
  };

  return (
    <View style={styles.container}>
      <Tabs.Screen options={{ title: 'Home' }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.headerTitle}>What do you need help with?</Text>
        
        <View style={styles.grid}>
          {actions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, item.fullWidth && styles.cardFull]}
              onPress={() => handleAction(item.action)}
            >
              <View style={[
                styles.iconContainer, 
                { backgroundColor: item.color + '20' },
                item.fullWidth && styles.iconContainerFull
              ]}>
                <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
              </View>
              <Text style={[styles.cardTitle, item.fullWidth && styles.cardTitleFull]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <SOSSheet visible={showSOS} onDismiss={() => setShowSOS(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || '#F3F4F6' },
  scroll: { padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text || '#1F2937', marginBottom: 20, marginTop: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  cardFull: { width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
  iconContainer: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  iconContainerFull: { marginBottom: 0, marginRight: 16 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text || '#1F2937', textAlign: 'center' },
  cardTitleFull: { textAlign: 'left', fontSize: 16 }
});
