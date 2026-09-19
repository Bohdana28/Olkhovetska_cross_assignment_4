import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrawerScreenProps } from '@react-navigation/drawer';

export type SearchSort = 'date' | 'name';

export type SearchStackParamList = {
    Search: undefined;

    SearchResults: {
        query: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        location?: string;
        sort?: SearchSort;
        startDateTime?: string;
        endDateTime?: string;
    };

    SearchFilter: {
        query: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        location?: string;
        sort?: SearchSort;
        startDateTime?: string;
        endDateTime?: string;
    };
};

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
    Search: NavigatorScreenParams<SearchStackParamList>;
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

export type SearchStackScreenProps<
    RouteName extends keyof SearchStackParamList,
> = NativeStackScreenProps<
    SearchStackParamList,
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