import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import BookingTicketsScreen from '../screens/BookingTicketsScreen';
import BookingScreen from '../screens/BookingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import BookingConfirmedScreen from '../screens/BookingConfirmedScreen';

import { SCREENS } from '../constants/screens';
import type { HomeStackParamList } from './types';

const Stack =
    createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName={SCREENS.HOME_SCREEN}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={SCREENS.HOME_SCREEN}
                component={HomeScreen}
            />

            <Stack.Screen
                name={SCREENS.EVENT_DETAILS}
                component={EventDetailsScreen}
            />

            <Stack.Screen
                name={SCREENS.BOOKING_TICKETS}
                component={BookingTicketsScreen}
            />

            <Stack.Screen
                name={SCREENS.BOOKING}
                component={BookingScreen}
            />

            <Stack.Screen
                name={SCREENS.PAYMENT}
                component={PaymentScreen}
            />

            <Stack.Screen
                name={SCREENS.BOOKING_CONFIRMED}
                component={BookingConfirmedScreen}
            />
        </Stack.Navigator>
    );
}