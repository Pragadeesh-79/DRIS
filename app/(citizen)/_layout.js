import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRole } from '../../hooks/RoleContext';
import { COLORS } from '../../constants/Colors';

export default function CitizenLayout() {
  const { clearRole, setRole } = useRole();
  const router = useRouter();

  const handleSettings = () => {
    Alert.alert(
      "Settings",
      "What would you like to do?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Switch to Response Team", 
          onPress: async () => {
            await setRole('team');
            router.replace('/(team)');
          }
        },
        {
          text: "Change Role (Menu)",
          onPress: async () => {
            await clearRole();
            router.replace('/');
          }
        }
      ]
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerRight: () => (
          <TouchableOpacity style={styles.headerRight} onPress={handleSettings}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        ),
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: COLORS.headerBorder,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="hospitals"
        options={{
          title: 'Hospitals',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hospital-box-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="shelters"
        options={{
          title: 'Shelters',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tent" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell-alert-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 16,
  },
});
