import React from 'react';
import { View, StyleSheet } from 'react-native';

const StatusDot = ({ color, size = 8 }) => (
  <View style={[styles.dot, { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }]} />
);

const styles = StyleSheet.create({
  dot: {
    marginRight: 6,
  },
});

export default StatusDot;
