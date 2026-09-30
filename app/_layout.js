import { Stack } from 'expo-router';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { RoleProvider } from '../hooks/RoleContext';
import { RequestProvider } from '../hooks/RequestContext';
import { COLORS } from '../constants/Colors';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    background: COLORS.background,
    surface: COLORS.card,
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" />
      <RoleProvider>
        <RequestProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(citizen)" />
            <Stack.Screen name="(team)" />
            <Stack.Screen name="incident/[id]" />
          </Stack>
        </RequestProvider>
      </RoleProvider>
    </PaperProvider>
  );
}
