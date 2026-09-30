import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/Colors';

export default function RequestCard({ request, onAccept, onReject, onPress }) {
  const isPending = request?.status === 'pending';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.priorityDot, { backgroundColor: request?.priority === 'High' ? COLORS.danger : COLORS.warning }]} />
          <Text style={styles.type}>{request?.type || 'Request'}</Text>
          <Text style={styles.priorityLabel}>{request?.priority} Priority</Text>
        </View>
        <View style={styles.statusChip}>
          <Text style={styles.statusText}>{request?.status}</Text>
        </View>
      </View>

      <Text style={styles.infoRow}>Location: {request?.location}</Text>
      <Text style={styles.infoRow}>Time: {request?.time}</Text>
      <Text style={styles.message} numberOfLines={2}>{request?.message}</Text>

      {isPending && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  priorityDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  type: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginRight: 8 },
  priorityLabel: { fontSize: 12, color: COLORS.textLight },
  statusChip: { backgroundColor: '#E5E7EB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, color: COLORS.text, textTransform: 'capitalize' },
  infoRow: { fontSize: 14, color: COLORS.textLight, marginBottom: 4 },
  message: { fontSize: 14, color: COLORS.text, marginTop: 8 },
  actions: { flexDirection: 'row', marginTop: 16, gap: 12 },
  acceptButton: { flex: 1, backgroundColor: COLORS.primary, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  acceptText: { color: '#fff', fontWeight: 'bold' },
  rejectButton: { flex: 1, borderWidth: 1, borderColor: COLORS.danger, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  rejectText: { color: COLORS.danger, fontWeight: 'bold' }
});
