import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';

import ChevronLeft from 'lucide-react-native/icons/chevron-left';

import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
    useEffect,
    useState,
} from 'react';

import type { HomeStackScreenProps } from '../navigation/types';

import CustomButton from '../components/CustomButton';

import {
    COLORS,
    RADIUS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

import {
    fetchEventById,
    TicketmasterEvent,
} from '../api/api';

type Props =
    HomeStackScreenProps<'BookingTickets'>;

const DEMO_TICKET_PRICE = 25;

export default function BookingTicketsScreen({
    navigation,
    route,
}: Props) {
    const insets =
        useSafeAreaInsets();

    const { eventId } =
        route.params;

    const [event, setEvent] =
        useState<TicketmasterEvent | null>(
            null,
        );

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [quantity, setQuantity] =
        useState(1);

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
    }, [eventId]);

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

    const getDescription = () => {
        if (event?.description) {
            return event.description;
        }

        const attraction =
            event?._embedded
                ?.attractions?.[0]
                ?.name;

        if (attraction) {
            return `Enjoy ${event.name} featuring ${attraction}.`;
        }

        return `Discover ${event?.name ?? 'this event'} and enjoy a unique live experience.`;
    };

    /*
     * Ticketmaster may provide a real price.
     * If it does not, use a demo price for this assignment.
     */
    const apiTicketPrice =
        event?.priceRanges?.[0]?.min;

    const ticketPrice =
        typeof apiTicketPrice === 'number'
            ? apiTicketPrice
            : DEMO_TICKET_PRICE;

    const isDemoPrice =
        typeof apiTicketPrice !== 'number';

    const currency =
        event?.priceRanges?.[0]
            ?.currency ?? 'GBP';

    const currencySymbol =
        currency === 'GBP'
            ? '£'
            : currency;

    const ticketType =
        'General Admission';

    const decreaseQuantity = () => {
        setQuantity(current =>
            Math.max(1, current - 1),
        );
    };

    const increaseQuantity = () => {
        setQuantity(current =>
            current + 1,
        );
    };

    const handleContinue = () => {
        navigation.navigate(
            'Booking',
            {
                eventId,
                quantity,
                ticketType,
                ticketPrice,
            },
        );
    };

    const total =
        quantity * ticketPrice;

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
                    Loading event...
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
                    Event not found
                </Text>

                <Text
                    style={
                        styles.errorText
                    }
                >
                    {error ??
                        "We couldn't load this event."}
                </Text>

                <CustomButton
                    title="Go back"
                    variant="primary"
                    onPress={() =>
                        navigation.goBack()
                    }
                />
            </View>
        );
    }

    const imageUrl =
        event.images?.[0]?.url;

    return (
        <View
            style={
                styles.container
            }
        >
            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingTop:
                            insets.top +
                            SPACING.sm,
                        paddingBottom:
                            insets.bottom +
                            110,
                    },
                ]}
            >
                {/* Header */}
                <View
                    style={
                        styles.header
                    }
                >
                    <Pressable
                        onPress={() =>
                            navigation.goBack()
                        }
                        style={
                            styles.backButton
                        }
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                    >
                        <ChevronLeft
                            size={24}
                            color={
                                COLORS.primary
                            }
                        />
                    </Pressable>

                    <Text
                        style={
                            styles.headerTitle
                        }
                    >
                        Booking
                    </Text>

                    <View
                        style={
                            styles.headerSpacer
                        }
                    />
                </View>

                {/* Progress steps */}
                <View
                    style={
                        styles.steps
                    }
                >
                    <View
                        style={
                            styles.stepItem
                        }
                    >
                        <View
                            style={
                                styles.activeCircle
                            }
                        >
                            <Text
                                style={
                                    styles.activeNumber
                                }
                            >
                                1
                            </Text>
                        </View>

                        <Text
                            style={
                                styles.activeText
                            }
                        >
                            Tickets
                        </Text>
                    </View>

                    <View
                        style={
                            styles.stepLine
                        }
                    />

                    <View
                        style={
                            styles.stepItem
                        }
                    >
                        <View
                            style={
                                styles.circle
                            }
                        >
                            <Text
                                style={
                                    styles.number
                                }
                            >
                                2
                            </Text>
                        </View>

                        <Text
                            style={
                                styles.stepText
                            }
                        >
                            Summary
                        </Text>
                    </View>

                    <View
                        style={
                            styles.stepLine
                        }
                    />

                    <View
                        style={
                            styles.stepItem
                        }
                    >
                        <View
                            style={
                                styles.circle
                            }
                        >
                            <Text
                                style={
                                    styles.number
                                }
                            >
                                3
                            </Text>
                        </View>

                        <Text
                            style={
                                styles.stepText
                            }
                        >
                            Payment
                        </Text>
                    </View>

                    <View
                        style={
                            styles.stepLine
                        }
                    />

                    <View
                        style={
                            styles.stepItem
                        }
                    >
                        <View
                            style={
                                styles.circle
                            }
                        >
                            <Text
                                style={
                                    styles.number
                                }
                            >
                                4
                            </Text>
                        </View>

                        <Text
                            style={
                                styles.stepText
                            }
                        >
                            Confirmation
                        </Text>
                    </View>
                </View>

                {/* Event image */}
                <Image
                    source={
                        imageUrl
                            ? {
                                  uri: imageUrl,
                              }
                            : require('../../assets/images/festival.jpg')
                    }
                    style={
                        styles.eventImage
                    }
                />

                {/* Event information */}
                <View
                    style={
                        styles.eventInfo
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
                            styles.eventDate
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
                            styles.eventLocation
                        }
                    >
                        {getLocation()}
                    </Text>

                    <Text
                        style={
                            styles.eventDescription
                        }
                    >
                        {getDescription()}
                    </Text>
                </View>

                {/* Ticket type */}
                <Text
                    style={
                        styles.sectionTitle
                    }
                >
                    Ticket type
                </Text>

                <View
                    style={
                        styles.ticketTypes
                    }
                >
                    <View
                        style={[
                            styles.ticket,
                            styles.ticketSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.ticketText,
                                styles.ticketTextSelected,
                            ]}
                        >
                            {ticketType.toUpperCase()}
                            {' — '}
                            {currencySymbol}
                            {ticketPrice}
                        </Text>
                    </View>
                </View>

                <Text
                    style={
                        styles.selectedTicket
                    }
                >
                    Selected: {ticketType} •{' '}
                    {currencySymbol}
                    {ticketPrice}
                </Text>

                {isDemoPrice && (
                    <Text
                        style={
                            styles.priceWarning
                        }
                    >
                        Demo ticket price for this
                        assignment. The event API does not
                        provide a ticket price.
                    </Text>
                )}

                {/* Quantity */}
                <Text
                    style={
                        styles.sectionTitle
                    }
                >
                    Quantity
                </Text>

                <View
                    style={
                        styles.quantity
                    }
                >
                    <Pressable
                        onPress={
                            decreaseQuantity
                        }
                        style={
                            styles.quantityButton
                        }
                    >
                        <Text
                            style={
                                styles.quantityIcon
                            }
                        >
                            −
                        </Text>
                    </Pressable>

                    <Text
                        style={
                            styles.quantityText
                        }
                    >
                        {quantity}
                    </Text>

                    <Pressable
                        onPress={
                            increaseQuantity
                        }
                        style={
                            styles.quantityButton
                        }
                    >
                        <Text
                            style={
                                styles.quantityIcon
                            }
                        >
                            +
                        </Text>
                    </Pressable>
                </View>

                {/* Total */}
                <View
                    style={
                        styles.totalPreview
                    }
                >
                    <Text
                        style={
                            styles.totalLabel
                        }
                    >
                        Tickets total
                    </Text>

                    <Text
                        style={
                            styles.totalValue
                        }
                    >
                        {currencySymbol}
                        {total.toFixed(2)}
                    </Text>
                </View>
            </ScrollView>

            {/* Footer */}
            <View
                style={[
                    styles.footer,
                    {
                        paddingBottom:
                            insets.bottom +
                            SPACING.sm,
                    },
                ]}
            >
                <CustomButton
                    title="Continue"
                    variant="primary"
                    onPress={
                        handleContinue
                    }
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
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'space-between',
    },

    backButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 14,
        color: COLORS.text,
    },

    headerSpacer: {
        width: 32,
    },

    steps: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'space-between',
        marginVertical:
            SPACING.lg,
    },

    stepItem: {
        alignItems: 'center',
        gap: 4,
    },

    activeCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor:
            COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor:
            COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeNumber: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 10,
        color: COLORS.background,
    },

    number: {
        ...TYPOGRAPHY.medium,
        fontSize: 10,
        color: COLORS.textSecondary,
    },

    activeText: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 9,
        color: COLORS.primary,
    },

    stepText: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        color: COLORS.textSecondary,
    },

    stepLine: {
        flex: 1,
        height: 1,
        backgroundColor:
            COLORS.border,
        marginHorizontal: 4,
        marginBottom: 18,
    },

    eventImage: {
        width: '100%',
        height: 220,
        borderRadius:
            RADIUS.md,
        marginBottom:
            SPACING.md,
    },

    eventInfo: {
        marginBottom:
            SPACING.lg,
    },

    eventTitle: {
        ...TYPOGRAPHY.bold,
        fontSize: 20,
        lineHeight: 25,
        color: COLORS.text,
        marginBottom: 4,
    },

    eventDate: {
        ...TYPOGRAPHY.regular,
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 4,
    },

    eventLocation: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        color: COLORS.textSecondary,
    },

    eventDescription: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        lineHeight: 17,
        color: COLORS.textSecondary,
        marginTop:
            SPACING.lg,
    },

    sectionTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
        marginTop:
            SPACING.md,
        marginBottom:
            SPACING.sm,
    },

    ticketTypes: {
        flexDirection: 'row',
    },

    ticket: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor:
            COLORS.primaryLight,
    },

    ticketSelected: {
        backgroundColor:
            COLORS.primary,
    },

    ticketText: {
        ...TYPOGRAPHY.medium,
        fontSize: 9,
        color: COLORS.primary,
    },

    ticketTextSelected: {
        color: COLORS.background,
    },

    selectedTicket: {
        ...TYPOGRAPHY.regular,
        fontSize: 10,
        color: COLORS.textSecondary,
        marginTop: 8,
    },

    priceWarning: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        lineHeight: 14,
        color: COLORS.textSecondary,
        marginTop: 6,
    },

    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom:
            SPACING.lg,
    },

    quantityButton: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor:
            COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    quantityIcon: {
        fontSize: 18,
        color: COLORS.primary,
        lineHeight: 20,
    },

    quantityText: {
        ...TYPOGRAPHY.regular,
        fontSize: 14,
        color: COLORS.text,
    },

    totalPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'space-between',
        padding: SPACING.md,
        borderRadius:
            RADIUS.md,
        backgroundColor:
            COLORS.card,
        marginBottom:
            SPACING.lg,
    },

    totalLabel: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
    },

    totalValue: {
        ...TYPOGRAPHY.bold,
        fontSize: 14,
        color: COLORS.primary,
    },

    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal:
            SPACING.lg,
        paddingTop:
            SPACING.sm,
        backgroundColor:
            COLORS.background,
        borderTopWidth: 1,
        borderTopColor:
            COLORS.border,
    },
});