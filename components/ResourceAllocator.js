import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/Colors';

export default function ResourceAllocator({ resources = [] }) {
  const [allocation, setAllocation] = useState({});

  const handleIncrement = (key, max) => {
    setAllocation(prev => {
      const current = prev[key] || 0;
      if (current >= max) return prev;
      return { ...prev, [key]: current + 1 };
    });
  };

  const handleDecrement = (key) => {
    setAllocation(prev => {
      const current = prev[key] || 0;
      if (current <= 0) return prev;
      return { ...prev, [key]: current - 1 };
    });
  };

  const totalToDeploy = Object.values(allocation).reduce((sum, val) => sum + val, 0);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { flex: 2 }]}>Resource</Text>
        <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>Available</Text>
        <Text style={[styles.headerText, { flex: 1.5, textAlign: 'center' }]}>Deploy</Text>
      </View>

      {resources.map(item => (
        <View key={item.key} style={styles.row}>
          <View style={styles.resourceCol}>
            <MaterialCommunityIcons name={item.icon || 'cube-outline'} size={20} color={COLORS.text} style={styles.icon} />
            <Text style={styles.resourceName}>{item.name}</Text>
          </View>
          <Text style={styles.availableText}>{item.available}</Text>
          <View style={styles.stepper}>
            <TouchableOpacity style={styles.stepperBtn} onPress={() => handleDecrement(item.key)}>
              <MaterialCommunityIcons name="minus" size={20} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.stepperValue}>{allocation[item.key] || 0}</Text>
            <TouchableOpacity style={styles.stepperBtn} onPress={() => handleIncrement(item.key, item.available)}>
              <MaterialCommunityIcons name="plus" size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity 
        style={[styles.deployBtn, totalToDeploy === 0 && styles.deployBtnDisabled]} 
        disabled={totalToDeploy === 0}
      >
        <Text style={styles.deployBtnText}>Deploy Resources</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', borderRadius: 8, padding: 16, elevation: 2 },
  headerRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 12, marginBottom: 12 },
  headerText: { fontSize: 14, fontWeight: 'bold', color: COLORS.textLight },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  resourceCol: { flex: 2, flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 8 },
  resourceName: { fontSize: 14, color: COLORS.text },
  availableText: { flex: 1, textAlign: 'center', fontSize: 14, color: COLORS.text },
  stepper: { flex: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  stepperBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  stepperValue: { fontSize: 16, fontWeight: 'bold', minWidth: 20, textAlign: 'center' },
  deployBtn: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  deployBtnDisabled: { backgroundColor: '#9CA3AF' },
  deployBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
