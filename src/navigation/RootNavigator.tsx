import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppDrawer from './AppDrawer';

export default function RootNavigator() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <AppDrawer />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}