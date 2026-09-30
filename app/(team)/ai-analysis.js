import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MOCK_DATA } from '../../services/mockData';
import { COLORS } from '../../constants/Colors';
import { useRequests } from '../../hooks/RequestContext';

const ProgressBar = ({ progress, color }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: color }]} />
  </View>
);

const StatusDot = ({ color }) => (
  <View style={[styles.statusDot, { backgroundColor: color }]} />
);

export default function AIAnalysisScreen() {
  const { requests } = useRequests();
  const activeReqs = requests.filter(r => r.status !== 'resolved');
  
  let totalRisk = 0;
  let typeCounts = {};
  
  activeReqs.forEach(req => {
    if (req.priority === 'Critical') totalRisk += 30;
    else if (req.priority === 'High') totalRisk += 20;
    else if (req.priority === 'Medium') totalRisk += 10;
    else totalRisk += 5;
    
    typeCounts[req.type] = (typeCounts[req.type] || 0) + 1;
  });
  
  const computedRiskScore = activeReqs.length === 0 ? 10 : Math.min(100, Math.max(20, totalRisk));
  const scoreColor = computedRiskScore > 75 ? COLORS.danger : (computedRiskScore > 40 ? COLORS.warning : COLORS.success);

  const predictions = Object.keys(typeCounts).map(type => {
    const percentage = Math.min(100, Math.round((typeCounts[type] / activeReqs.length) * 100));
    let color = '#2563EB';
    if (type === 'Medical') color = '#DC2626';
    if (type === 'Fire') color = '#EA580C';
    if (type === 'Rescue') color = '#7C3AED';
    if (type === 'Food & Water') color = '#059669';
    return { type, percentage, color };
  }).sort((a, b) => b.percentage - a.percentage);

  const recommendations = [];
  if (typeCounts['Medical'] > 0) recommendations.push({ text: 'Deploy mobile medical units and ambulances immediately.', color: COLORS.danger });
  if (typeCounts['Flood'] > 0) recommendations.push({ text: 'Evacuate low-lying areas and dispatch rescue boats.', color: COLORS.warning });
  if (typeCounts['Fire'] > 0) recommendations.push({ text: 'Dispatch fire brigades to reported locations.', color: COLORS.danger });
  if (typeCounts['Rescue'] > 0) recommendations.push({ text: 'Send search and rescue teams to reported coordinates.', color: COLORS.warning });
  if (typeCounts['Food & Water'] > 0) recommendations.push({ text: 'Organize relief camps and food distribution centers.', color: COLORS.primary });
  
  if (recommendations.length === 0) {
    recommendations.push({ text: 'No critical emergencies detected. Maintain standard monitoring.', color: COLORS.success });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Real-time Risk Score</Text>
        <Text style={[styles.riskScore, { color: scoreColor }]}>{computedRiskScore}/100</Text>
        <Text style={{color: COLORS.textSecondary, marginTop: 4}}>Based on {activeReqs.length} active incident(s)</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Incident Distribution</Text>
      <View style={styles.card}>
        {predictions.length > 0 ? predictions.map((pred, idx) => (
          <View key={idx}>
            <Text style={styles.predictionLabel}>{pred.type} ({pred.percentage}%)</Text>
            <ProgressBar progress={pred.percentage} color={pred.color} />
          </View>
        )) : (
          <Text style={{color: COLORS.textSecondary}}>No active incidents to analyze.</Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>AI Recommendations</Text>
      <View style={styles.card}>
        {recommendations.map((rec, idx) => (
          <View key={idx} style={styles.recommendationItem}>
            <StatusDot color={rec.color} />
            <Text style={styles.recommendationText}>{rec.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  riskScore: { fontSize: 36, fontWeight: 'bold', color: COLORS.danger },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 12, color: COLORS.text },
  progressBarContainer: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 5, marginBottom: 12, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 5 },
  predictionLabel: { fontSize: 14, color: COLORS.text, marginBottom: 4 },
  recommendationItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  recommendationText: { fontSize: 14, color: COLORS.text, flex: 1 },
  recentItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recentText: { fontSize: 14, color: COLORS.text },
  confidenceText: { fontSize: 12, color: COLORS.success, fontWeight: '600' }
});
