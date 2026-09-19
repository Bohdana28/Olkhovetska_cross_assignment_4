import type { NavigatorScreenParams } from '@react-navigation/native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrawerScreenProps } from '@react-navigation/drawer';

/**
 * Navigation types for the main event flow.
 *
 * The Home stack contains the complete booking process:
 * HomeScreen → Event Details → Tickets → Summary → Payment → Confirmation.
 */
export type HomeStackParamList = {
    HomeScreen: undefined;

    EventDetails: {
        eventId: string;
    };

    BookingTickets: {
        eventId: string;
    };

    Booking: {
        eventId: string;
        quantity: number;
        ticketType: string;
        ticketPrice: number;
    };

    Payment: {
        eventId: string;
        quantity: number;
        ticketType: string;
        ticketPrice: number;
    };

    BookingConfirmed: {
        eventId: string;
        quantity: number;
        ticketType: string;
        ticketPrice: number;
        paymentMethod: string;
        cardLastFour?: string;
    };
};

export type MainTabParamList = {
    Home: NavigatorScreenParams<HomeStackParamList>;
    Search: undefined;
    Bookings: undefined;
    Profile: undefined;
};

export type DrawerParamList = {
    Main: NavigatorScreenParams<MainTabParamList>;
    Help: undefined;
    Contact: undefined;
};

export type HomeStackScreenProps<
    RouteName extends keyof HomeStackParamList,
> = NativeStackScreenProps<
    HomeStackParamList,
    RouteName
>;

export type MainTabScreenProps<
    RouteName extends keyof MainTabParamList,
> = BottomTabScreenProps<
    MainTabParamList,
    RouteName
>;

export type DrawerScreenPropsType<
    RouteName extends keyof DrawerParamList,
> = DrawerScreenProps<
    DrawerParamList,
    RouteName
>;