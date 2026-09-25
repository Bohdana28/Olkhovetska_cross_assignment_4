import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Check from 'lucide-react-native/icons/check';

import {
    useEffect,
    useState,
} from 'react';

import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
    useDispatch,
} from 'react-redux';

import type {
    HomeStackScreenProps,
} from '../navigation/types';

import type {
    AppDispatch,
} from '../redux/store';

import {
    addBooking,
} from '../redux/bookingsSlice';

import CustomButton from '../components/CustomButton';

import {
    COLORS,
    RADIUS,
    SPACING,
    SERVICE_FEE,
    TYPOGRAPHY,
} from '../constants/theme';

import {
    fetchEventById,
    TicketmasterEvent,
} from '../api/api';

type Props =
    HomeStackScreenProps<'BookingConfirmed'>;


export default function BookingConfirmedScreen({
    navigation,
    route,
}: Props) {
    const insets =
        useSafeAreaInsets();

    const dispatch =
        useDispatch<AppDispatch>();

    const {
        eventId,
        quantity,
        ticketType,
        ticketPrice,
        paymentMethod,
        cardLastFour,
    } = route.params;

    const [event, setEvent] =
        useState<TicketmasterEvent | null>(
            null,
        );

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const total =
        quantity * ticketPrice +
        SERVICE_FEE;

    useEffect(() => {
        const loadEvent = async () => {
            try {
                setLoading(true);
                setError(null);

                const data =
                    await fetchEventById(
                        eventId,
                    );

                setEvent(data);

                dispatch(
                    addBooking({
                        id: eventId,
                        name: data.name,
                        image:
                            data.images?.[0]?.url,
                        date:
                            data.dates?.start
                                ?.localDate,
                        time:
                            data.dates?.start
                                ?.localTime,
                        venue:
                            data._embedded
                                ?.venues?.[0]
                                ?.name,
                        ticketType,
                        quantity,
                        ticketPrice,
                    }),
                );
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load event.',
                );
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [
        eventId,
        ticketType,
        quantity,
        ticketPrice,
        dispatch,
    ]);

    const formatTime = (
        time?: string,
    ) => {
        if (!time) {
            return null;
        }

        return time.slice(0, 5);
    };

    const formatDate = (
        date?: string,
        time?: string,
    ) => {
        if (!date) {
            return 'Date TBA';
        }

        const parsedDate =
            new Date(date);

        const formattedDate =
            parsedDate.toLocaleDateString(
                'en-GB',
                {
                    day: '2-digit',
                    month: 'short',
                },
            );

        const formattedTime =
            formatTime(time);

        return formattedTime
            ? `${formattedDate} • ${formattedTime}`
            : formattedDate;
    };

    const getLocation = () => {
        const venue =
            event?._embedded
                ?.venues?.[0];

        if (!venue) {
            return 'Location TBA';
        }

        const parts = [
            venue.name,
            venue.city?.name,
        ].filter(Boolean);

        return (
            parts.join(', ') ||
            'Location TBA'
        );
    };

    if (loading) {
        return (
            <View
                style={
                    styles.center
                }
            >
                <ActivityIndicator
                    size="large"
                    color={
                        COLORS.primary
                    }
                />

                <Text
                    style={
                        styles.loadingText
                    }
                >
                    Loading ticket...
                </Text>
            </View>
        );
    }

    if (error || !event) {
        return (
            <View
                style={
                    styles.center
                }
            >
                <Text
                    style={
                        styles.errorTitle
                    }
                >
                    Ticket unavailable
                </Text>

                <Text
                    style={
                        styles.errorText
                    }
                >
                    {error ??
                        "We couldn't load the event."}
                </Text>

                <CustomButton
                    title="Back to events"
                    variant="primary"
                    onPress={() =>
                        navigation.popToTop()
                    }
                />
            </View>
        );
    }

    const imageUrl =
        event.images?.[0]?.url;

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop:
                        insets.top,
                    paddingBottom:
                        insets.bottom,
                },
            ]}
        >
            <View
                style={
                    styles.content
                }
            >
                <View
                    style={
                        styles.header
                    }
                >
                    <Text
                        style={
                            styles.headerTitle
                        }
                    >
                        Booking confirmed
                    </Text>
                </View>

                <View
                    style={
                        styles.success
                    }
                >
                    <View
                        style={
                            styles.successCircle
                        }
                    >
                        <Check
                            size={28}
                            color={
                                COLORS.primary
                            }
                        />
                    </View>

                    <Text
                        style={
                            styles.title
                        }
                    >
                        Booking confirmed! 🎉
                    </Text>

                    <Text
                        style={
                            styles.subtitle
                        }
                    >
                        Your ticket has been successfully
                        booked.
                    </Text>
                </View>

                <View
                    style={
                        styles.ticket
                    }
                >
                    <Image
                        source={
                            imageUrl
                                ? {
                                      uri: imageUrl,
                                  }
                                : require('../../assets/images/festival.jpg')
                        }
                        style={
                            styles.ticketImage
                        }
                    />

                    <View
                        style={
                            styles.ticketInfo
                        }
                    >
                        <Text
                            style={
                                styles.eventTitle
                            }
                            numberOfLines={
                                3
                            }
                        >
                            {event.name}
                        </Text>

                        <Text
                            style={
                                styles.eventDetails
                            }
                        >
                            {formatDate(
                                event.dates
                                    ?.start
                                    ?.localDate,
                                event.dates
                                    ?.start
                                    ?.localTime,
                            )}
                        </Text>

                        <Text
                            style={
                                styles.eventDetails
                            }
                        >
                            {getLocation()}
                        </Text>

                        <Text
                            style={
                                styles.label
                            }
                        >
                            Ticket
                        </Text>

                        <Text
                            style={
                                styles.value
                            }
                        >
                            {ticketType} ×{' '}
                            {quantity}
                        </Text>

                        <Text
                            style={
                                styles.label
                            }
                        >
                            Payment
                        </Text>

                        <Text
                            style={
                                styles.value
                            }
                        >
                            {paymentMethod}
                            {cardLastFour
                                ? ` •••• ${cardLastFour}`
                                : ''}
                        </Text>

                        <View
                            style={
                                styles.totalRow
                            }
                        >
                            <Text
                                style={
                                    styles.totalLabel
                                }
                            >
                                Total
                            </Text>

                            <Text
                                style={
                                    styles.totalValue
                                }
                            >
                                £
                                {total.toFixed(
                                    2,
                                )}
                            </Text>
                        </View>
                    </View>
                </View>

                <Text
                    style={
                        styles.eventId
                    }
                >
                    Event: {event.id}
                </Text>
            </View>

            <View
                style={
                    styles.footer
                }
            >
                <CustomButton
                    title="View ticket"
                    variant="primary"
                    onPress={() => {
                        navigation.popToTop();

                        navigation
                            .getParent()
                            ?.navigate('Bookings');
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:
            COLORS.background,
    },

    content: {
        flex: 1,
        paddingHorizontal:
            SPACING.lg,
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:
            SPACING.lg,
        backgroundColor:
            COLORS.background,
    },

    loadingText: {
        marginTop:
            SPACING.sm,
        ...TYPOGRAPHY.regular,
        fontSize: 13,
        color: COLORS.textSecondary,
    },

    errorTitle: {
        ...TYPOGRAPHY.bold,
        fontSize: 20,
        color: COLORS.text,
        marginBottom:
            SPACING.sm,
    },

    errorText: {
        ...TYPOGRAPHY.regular,
        fontSize: 13,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom:
            SPACING.lg,
    },

    header: {
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
    },

    success: {
        alignItems: 'center',
        marginTop: 70,
    },

    successCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor:
            COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:
            SPACING.md,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
    },

    subtitle: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 4,
    },

    ticket: {
        flexDirection: 'row',
        marginTop: 40,
        padding: SPACING.md,
        borderRadius:
            RADIUS.md,
        backgroundColor:
            COLORS.card,
    },

    ticketImage: {
        width: 58,
        height: 58,
        borderRadius:
            RADIUS.sm,
    },

    ticketInfo: {
        flex: 1,
        marginLeft:
            SPACING.md,
    },

    eventTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        lineHeight: 16,
        color: COLORS.text,
        marginBottom: 3,
    },

    eventDetails: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },

    label: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        color: COLORS.textSecondary,
        marginTop: 7,
    },

    value: {
        ...TYPOGRAPHY.medium,
        fontSize: 10,
        color: COLORS.text,
    },

    totalRow: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
        marginTop:
            SPACING.md,
        paddingTop:
            SPACING.sm,
        borderTopWidth: 1,
        borderTopColor:
            COLORS.border,
    },

    totalLabel: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 10,
        color: COLORS.text,
    },

    totalValue: {
        ...TYPOGRAPHY.bold,
        fontSize: 11,
        color: COLORS.primary,
    },

    eventId: {
        ...TYPOGRAPHY.regular,
        fontSize: 8,
        color: COLORS.textSecondary,
        marginTop:
            SPACING.md,
    },

    footer: {
        paddingHorizontal:
            SPACING.lg,
        paddingTop:
            SPACING.sm,
    },
});