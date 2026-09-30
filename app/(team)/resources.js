import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MOCK_DATA } from '../../services/mockData';
import ResourceAllocator from '../../components/ResourceAllocator';
import { COLORS } from '../../constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ResourcesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Resource Allocation</Text>
      <ResourceAllocator resources={MOCK_DATA.resourcePool} />

      <Text style={styles.sectionTitle}>Recent Deployments</Text>
      <View style={styles.card}>
        <View style={styles.deploymentItem}>
          <MaterialCommunityIcons name="tent" size={20} color={COLORS.primary} style={styles.icon} />
          <View>
            <Text style={styles.depTitle}>Relief Camp Setup</Text>
            <Text style={styles.depDetails}>Velachery • 2 hours ago</Text>
          </View>
        </View>
        <View style={styles.deploymentItem}>
          <MaterialCommunityIcons name="ambulance" size={20} color={COLORS.danger} style={styles.icon} />
          <View>
            <Text style={styles.depTitle}>Medical Team</Text>
            <Text style={styles.depDetails}>Tambaram • 4 hours ago</Text>
          </View>
        </View>
        <View style={styles.deploymentItem}>
          <MaterialCommunityIcons name="food" size={20} color={COLORS.warning} style={styles.icon} />
          <View>
            <Text style={styles.depTitle}>Food Distribution</Text>
            <Text style={styles.depDetails}>Guindy • 5 hours ago</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 12, color: COLORS.text },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, elevation: 2 },
  deploymentItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  icon: { marginRight: 12 },
  depTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  depDetails: { fontSize: 14, color: COLORS.textLight, marginTop: 4 }
});
