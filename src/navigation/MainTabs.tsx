import {
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
    House,
    Search,
    Ticket,
    User,
} from 'lucide-react-native';

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';

import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import {
    COLORS,
    TYPOGRAPHY,
} from '../constants/theme';

import { SCREENS } from '../constants/screens';

import type {
    MainTabParamList,
} from './types';

const Tab =
    createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
    return (
        <Tab.Navigator
            initialRouteName={
                SCREENS.HOME
            }
            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor:
                    COLORS.primary,

                tabBarInactiveTintColor:
                    COLORS.textSecondary,

                tabBarLabelStyle: {
                    ...TYPOGRAPHY.regular,
                    fontSize: 10,
                },

                tabBarStyle: {
                    height: 64,
                    paddingTop: 8,
                    paddingBottom: 8,
                },
            }}
        >
            <Tab.Screen
                name={SCREENS.HOME}
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <House color={color} size={size} />
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: () => {
                        navigation.navigate(SCREENS.HOME, {
                            screen: SCREENS.HOME_SCREEN,
                        });
                    },
                })}
            />

            <Tab.Screen
                name={SCREENS.SEARCH}
                component={SearchStack}
                options={{
                    tabBarLabel: 'Search',

                    tabBarIcon: ({
                        color,
                        size,
                    }) => (
                        <Search
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name={SCREENS.BOOKINGS}
                component={BookingsScreen}
                options={{
                    tabBarLabel: 'Bookings',

                    tabBarIcon: ({
                        color,
                        size,
                    }) => (
                        <Ticket
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name={SCREENS.PROFILE}
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',

                    tabBarIcon: ({
                        color,
                        size,
                    }) => (
                        <User
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}