import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';

import BookingItem from '../components/BookingItem';

import {
    removeBooking,
    updateQuantity,
} from '../redux/bookingsSlice';

import type {
    RootState,
    AppDispatch,
} from '../redux/store';

import {
    COLORS,
    SPACING,
    SERVICE_FEE,
    TYPOGRAPHY,
} from '../constants/theme';

export default function BookingsScreen() {
    const insets = useSafeAreaInsets();

    const dispatch = useDispatch<AppDispatch>();

    const bookings = useSelector(
        (state: RootState) => state.bookings.items,
    );

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                },
            ]}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingBottom:
                            insets.bottom + SPACING.lg,
                    },
                ]}
            >
                <Text style={styles.title}>
                    My bookings
                </Text>

                {bookings.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>
                            No bookings yet
                        </Text>

                        <Text style={styles.emptyText}>
                            Your booked events will appear here.
                        </Text>
                    </View>
                ) : (
                    bookings.map(booking => (
                        <BookingItem
                            key={booking.id}
                            title={booking.name}
                            imageUrl={
                                booking.image
                                    ? { uri: booking.image }
                                    : require('../../assets/images/festival.jpg')
                            }
                            date={
                                booking.date
                                    ? `${booking.date}${
                                          booking.time
                                              ? ` · ${booking.time}`
                                              : ''
                                      }`
                                    : ''
                            }
                            location={booking.venue ?? ''}
                            ticketType={booking.ticketType}
                            quantity={booking.quantity}
                            price={
                                booking.ticketPrice *
                                    booking.quantity +
                                SERVICE_FEE
                            }
                            onQuantityChange={quantity => {
                                if (quantity <= 0) {
                                    dispatch(
                                        removeBooking(
                                            booking.id,
                                        ),
                                    );

                                    return;
                                }

                                dispatch(
                                    updateQuantity({
                                        id: booking.id,
                                        quantity,
                                    }),
                                );
                            }}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        gap: SPACING.md,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 22,
        color: COLORS.text,
    },

    emptyState: {
        alignItems: 'center',
        paddingVertical: SPACING.lg,
    },

    emptyTitle: {
        ...TYPOGRAPHY.bold,
        fontSize: 18,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    },

    emptyText: {
        ...TYPOGRAPHY.regular,
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
});