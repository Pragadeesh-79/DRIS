import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS } from '../constants/Colors';

const DataTable = ({ columns, data, onRowPress }) => {
  return (
    <View style={styles.table}>
      {/* Header */}
      <View style={styles.headerRow}>
        {columns.map((col, i) => (
          <View key={i} style={[styles.cell, { flex: col.flex || 1 }]}>
            <Text variant="labelSmall" style={styles.headerText}>{col.label}</Text>
          </View>
        ))}
      </View>

      {/* Rows */}
      {data.map((row, rowIndex) => (
        <View
          key={row.id || rowIndex}
          style={[styles.dataRow, rowIndex === data.length - 1 && styles.lastRow]}
        >
          {columns.map((col, colIndex) => (
            <View key={colIndex} style={[styles.cell, { flex: col.flex || 1 }]}>
              {col.render ? col.render(row) : (
                <Text variant="bodySmall" style={styles.cellText} numberOfLines={1}>
                  {row[col.key]}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  cell: {
    justifyContent: 'center',
    paddingRight: 4,
  },
  cellText: {
    color: COLORS.text,
    fontSize: 13,
  },
});

export default DataTable;
