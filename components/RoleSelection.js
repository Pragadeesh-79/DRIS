import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/Colors';
import { useRole, ROLES } from '../hooks/RoleContext';

const ROLE_OPTIONS = [
  {
    key: ROLES.CITIZEN,
    title: 'Citizen',
    description: 'Report emergencies, receive alerts, and locate nearby shelters.',
    icon: 'account-outline',
  },
  {
    key: ROLES.TEAM,
    title: 'Response Team',
    description: 'Manage incidents, deploy resources, and coordinate rescue operations.',
    icon: 'shield-account-outline',
  },
];

export default function RoleSelection() {
  const { setRole } = useRole();

  return (
    <View style={styles.container}>
      {/* Branding */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="shield-check" size={36} color={COLORS.primary} />
        </View>
        <Text variant="headlineSmall" style={styles.appName}>DRIS</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Disaster Response Intelligence System
        </Text>
      </View>

      {/* Role Cards */}
      <View style={styles.cardsSection}>
        <Text variant="titleSmall" style={styles.prompt}>Continue as</Text>

        {ROLE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => setRole(option.key)}
          >
            <View style={styles.cardIcon}>
              <MaterialCommunityIcons name={option.icon} size={28} color={COLORS.primary} />
            </View>
            <View style={styles.cardText}>
              <Text variant="titleMedium" style={styles.cardTitle}>{option.title}</Text>
              <Text variant="bodySmall" style={styles.cardDesc}>{option.description}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color={COLORS.textTertiary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <Text variant="labelSmall" style={styles.footer}>
        National Disaster Management Authority
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // Branding
  brandSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    color: COLORS.text,
    fontWeight: '700',
    letterSpacing: 2,
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },

  // Cards
  cardsSection: {
    marginBottom: 48,
  },
  prompt: {
    color: COLORS.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 11,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: COLORS.text,
    fontWeight: '600',
  },
  cardDesc: {
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },

  // Footer
  footer: {
    color: COLORS.textTertiary,
    textAlign: 'center',
    fontSize: 10,
    letterSpacing: 0.5,
  },
});
