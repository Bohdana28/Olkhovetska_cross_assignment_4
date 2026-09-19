import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabs from './MainTabs';

import HelpScreen from '../screens/HelpScreen';
import ContactScreen from '../screens/ContactScreen';

import { COLORS, TYPOGRAPHY } from '../constants/theme';
import { SCREENS } from '../constants/screens';
import type { DrawerParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function AppDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName={SCREENS.MAIN}
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: COLORS.primary,
                drawerInactiveTintColor: COLORS.textSecondary,
                drawerLabelStyle: {
                    ...TYPOGRAPHY.medium,
                    fontSize: 14,
                },
            }}
        >
            <Drawer.Screen
                name={SCREENS.MAIN}
                component={MainTabs}
                options={{
                    drawerLabel: 'Main',
                }}
            />

            <Drawer.Screen
                name={SCREENS.HELP}
                component={HelpScreen}
                options={{
                    drawerLabel: 'Help',
                }}
            />

            <Drawer.Screen
                name={SCREENS.CONTACT}
                component={ContactScreen}
                options={{
                    drawerLabel: 'Contact',
                }}
            />
        </Drawer.Navigator>
    );
}