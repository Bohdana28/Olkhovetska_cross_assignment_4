import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppDrawer from './AppDrawer';

import { useTheme } from '../context/ThemeContext';

export default function RootNavigator() {
    const { theme, colors } = useTheme();

    const navigationTheme =
        theme === 'dark'
            ? {
                  ...DarkTheme,
                  colors: {
                      ...DarkTheme.colors,
                      primary: colors.primary,
                      background: colors.background,
                      card: colors.card,
                      text: colors.text,
                      border: colors.border,
                      notification: colors.primary,
                  },
              }
            : {
                  ...DefaultTheme,
                  colors: {
                      ...DefaultTheme.colors,
                      primary: colors.primary,
                      background: colors.background,
                      card: colors.card,
                      text: colors.text,
                      border: colors.border,
                      notification: colors.primary,
                  },
              };

    return (
        <SafeAreaProvider>
            <NavigationContainer
                theme={navigationTheme}
            >
                <AppDrawer />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}