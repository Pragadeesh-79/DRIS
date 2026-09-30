import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRole } from '../../hooks/RoleContext';
import { COLORS } from '../../constants/Colors';

export default function TeamLayout() {
  const { clearRole, setRole } = useRole();
  const router = useRouter();

  const handleSettings = () => {
    Alert.alert(
      "Settings",
      "What would you like to do?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Switch to Citizen View", 
          onPress: async () => {
            await setRole('citizen');
            router.replace('/(citizen)');
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
        headerTitle: 'DRIS — Command Center',
        headerRight: () => (
          <TouchableOpacity onPress={handleSettings} style={{ marginRight: 15 }}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        ),
        tabBarStyle: { backgroundColor: '#ffffff' },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-text-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai-analysis"
        options={{
          title: 'Analysis',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-box-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Resources',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cube-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
