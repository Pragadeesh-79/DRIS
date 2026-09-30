import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/Colors';

const STATUS_ORDER = ['pending', 'accepted', 'deployed', 'en_route', 'resolved'];

const STEPS = [
  { id: 'pending', title: 'Request Received' },
  { id: 'accepted', title: 'Team Assigned' },
  { id: 'deployed', title: 'Resources Deployed' },
  { id: 'en_route', title: 'Team En Route' },
  { id: 'resolved', title: 'Incident Resolved' }
];

export default function TrackingTimeline({ status, assignedTeam, eta }) {
  const currentIndex = STATUS_ORDER.indexOf(status);

  return (
    <View style={styles.container}>
      {STEPS.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isLast = index === STEPS.length - 1;
        
        return (
          <View key={step.id} style={styles.stepContainer}>
            <View style={styles.indicatorContainer}>
              <View style={[styles.dot, isCompleted ? styles.dotCompleted : styles.dotPending]} />
              {!isLast && <View style={[styles.line, isCompleted && index < currentIndex ? styles.lineCompleted : styles.linePending]} />}
            </View>
            <View style={styles.contentContainer}>
              <Text style={[styles.title, isCompleted ? styles.titleCompleted : styles.titlePending]}>
                {step.title}
              </Text>
              {step.id === 'accepted' && assignedTeam && isCompleted && (
                <Text style={styles.subtitle}>Team: {assignedTeam}</Text>
              )}
              {step.id === 'en_route' && eta && isCompleted && (
                <Text style={styles.subtitle}>ETA: {eta}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  stepContainer: { flexDirection: 'row', minHeight: 60 },
  indicatorContainer: { alignItems: 'center', width: 30 },
  dot: { width: 12, height: 12, borderRadius: 6, zIndex: 1 },
  dotCompleted: { backgroundColor: COLORS.primary || '#2563EB' },
  dotPending: { backgroundColor: '#D1D5DB' },
  line: { flex: 1, width: 2, marginVertical: 4 },
  lineCompleted: { backgroundColor: COLORS.primary || '#2563EB' },
  linePending: { backgroundColor: '#E5E7EB' },
  contentContainer: { flex: 1, paddingLeft: 12, paddingBottom: 24, marginTop: -4 },
  title: { fontSize: 15, fontWeight: '600' },
  titleCompleted: { color: COLORS.text || '#1F2937' },
  titlePending: { color: COLORS.textSecondary || '#6B7280' },
  subtitle: { fontSize: 13, color: COLORS.textSecondary || '#6B7280', marginTop: 4 }
});
