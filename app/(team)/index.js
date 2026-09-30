import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_DATA } from '../../services/mockData';
import { useRequests } from '../../hooks/RequestContext';
import RequestCard from '../../components/RequestCard';
import DataTable from '../../components/DataTable';
import { COLORS } from '../../constants/Colors';

export default function DashboardScreen() {
  const router = useRouter();
  const { requests } = useRequests();
  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.metricsStrip}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValueRed}>3</Text>
          <Text style={styles.metricLabel}>Active Incidents</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>28</Text>
          <Text style={styles.metricLabel}>Deployed Teams</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>60,700</Text>
          <Text style={styles.metricLabel}>People Affected</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValueRed}>2</Text>
          <Text style={styles.metricLabel}>Critical Alerts</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Incoming Requests</Text>
      {pendingRequests.length > 0 ? pendingRequests.map(req => (
        <RequestCard 
          key={req.id} 
          request={req} 
          onPress={() => router.push(`/incident/${req.id}`)}
          onAccept={() => router.push(`/incident/${req.id}`)}
        />
      )) : (
        <Text style={{color: COLORS.textSecondary, marginBottom: 16}}>No new incoming requests.</Text>
      )}

      <Text style={styles.sectionTitle}>Active Incidents</Text>
      <DataTable 
        columns={[
          { key: 'id', label: 'ID', flex: 1.2 },
          { key: 'type', label: 'Type', flex: 1.5 },
          { key: 'location', label: 'Location', flex: 1.5 },
          { key: 'severity', label: 'Severity', flex: 1.5 },
          { key: 'status', label: 'Status', flex: 1.2 }
        ]} 
        data={MOCK_DATA.incidents} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  metricsStrip: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  metricCard: { width: '48%', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 2 },
  metricValue: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
  metricValueRed: { fontSize: 24, fontWeight: 'bold', color: COLORS.danger },
  metricLabel: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 12, color: COLORS.text }
});
