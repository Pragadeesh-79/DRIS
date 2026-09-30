import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS } from '../constants/Colors';
import StatusDot from './StatusDot';

const severityColors = {
  critical: COLORS.critical,
  high: COLORS.high,
  medium: COLORS.medium,
  low: COLORS.low,
};

export const AlertRow = ({ alert, onPress }) => {
  const dotColor = severityColors[alert.severity] || COLORS.textSecondary;

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.6}>
      <StatusDot color={dotColor} />
      <View style={styles.content}>
        <Text variant="bodyMedium" style={styles.title} numberOfLines={1}>{alert.title}</Text>
        <Text variant="bodySmall" style={styles.meta}>{alert.location}</Text>
      </View>
      <Text variant="labelSmall" style={styles.time}>{alert.time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  content: {
    flex: 1,
    marginLeft: 4,
  },
  title: {
    color: COLORS.text,
    fontSize: 14,
  },
  meta: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 1,
  },
  time: {
    color: COLORS.textTertiary,
    fontSize: 11,
    marginLeft: 8,
  },
});
