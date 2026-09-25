import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';

import {
    useEffect,
    useState,
} from 'react';

import ChevronLeft from 'lucide-react-native/icons/chevron-left';
import Heart from 'lucide-react-native/icons/heart';

import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

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
    HomeStackScreenProps<'EventDetails'>;

export default function EventDetailsScreen({
    navigation,
    route,
}: Props) {
    const insets = useSafeAreaInsets();

    const eventId =
        route.params?.eventId;

    const [event, setEvent] =
        useState<TicketmasterEvent | null>(
            null,
        );

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    /**
     * Load the selected event from Ticketmaster.
     */
    useEffect(() => {
        if (!eventId) {
            setLoading(false);
            setError(
                'Event ID is missing.',
            );
            return;
        }

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

    /**
     * Convert Ticketmaster time from
     * HH:mm:ss to HH:mm.
     */
    const formatTime = (
        time?: string,
    ) => {
        if (!time) {
            return null;
        }

        return time.slice(0, 5);
    };

    /**
     * Format event date for the header.
     * Example: 20 Sep • 18:00
     */
    const formatHeaderDate = (
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

        if (formattedTime) {
            return `${formattedDate} • ${formattedTime}`;
        }

        return formattedDate;
    };

    /**
     * Format full event date.
     * Example: SEPTEMBER 20, 2026
     */
    const formatFullDate = (
        date?: string,
    ) => {
        if (!date) {
            return 'DATE TBA';
        }

        const parsedDate =
            new Date(date);

        return parsedDate
            .toLocaleDateString(
                'en-GB',
                {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                },
            )
            .toUpperCase();
    };

    /**
     * Get event time.
     */
    const getTime = () => {
        const startTime =
            formatTime(
                event?.dates?.start
                    ?.localTime,
            );

        const endTime =
            formatTime(
                event?.dates?.end
                    ?.localTime,
            );

        if (
            startTime &&
            endTime
        ) {
            return `${startTime} – ${endTime}`;
        }

        if (startTime) {
            return startTime;
        }

        return 'Time unavailable';
    };

    /**
     * Get event location from venue data.
     */
    const getFullLocation = () => {
        const venue =
            event?._embedded
                ?.venues?.[0];

        if (!venue) {
            return 'Location TBA';
        }

        const parts = [
            venue.name,
            venue.address?.line1,
            venue.city?.name,
            venue.country?.name,
        ].filter(Boolean);

        return (
            parts.join(', ') ||
            'Location TBA'
        );
    };

    /**
     * Get event image.
     */
    const getImage = () => {
        return event?.images?.[0]
            ?.url;
    };

    /**
     * Get minimum ticket price.
     *
     * If Ticketmaster does not provide
     * a price, the price block is hidden.
     */
    const getPrice = () => {
        const price =
            event?.priceRanges?.[0];

        if (
            !price ||
            typeof price.min !==
                'number'
        ) {
            return null;
        }

        const currency =
            price.currency ?? 'GBP';

        const symbol =
            currency === 'GBP'
                ? '£'
                : currency;

        return `From ${symbol}${price.min}`;
    };

    /**
     * Get event description.
     */
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
     * Loading state.
     */
    if (loading) {
        return (
            <View
                style={[
                    styles.errorContainer,
                    {
                        paddingTop:
                            insets.top,
                        paddingBottom:
                            insets.bottom,
                    },
                ]}
            >
                <ActivityIndicator
                    size="large"
                    color={
                        COLORS.primary
                    }
                />

                <Text
                    style={
                        styles.errorText
                    }
                >
                    Loading event...
                </Text>
            </View>
        );
    }

    /*
     * Error state.
     */
    if (error || !event) {
        return (
            <View
                style={[
                    styles.errorContainer,
                    {
                        paddingTop:
                            insets.top,
                        paddingBottom:
                            insets.bottom,
                    },
                ]}
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
                        "We couldn't find this event."}
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
        getImage();

    const price =
        getPrice();

    return (
        <View
            style={styles.container}
        >
            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingBottom:
                            insets.bottom +
                            SPACING.lg,
                    },
                ]}
            >
                {/* Header */}
                <View
                    style={[
                        styles.header,
                        {
                            paddingTop:
                                insets.top +
                                SPACING.sm,
                        },
                    ]}
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

                    <View
                        style={
                            styles.headerText
                        }
                    >
                        <Text
                            style={
                                styles.headerTitle
                            }
                            numberOfLines={
                                1
                            }
                        >
                            {event.name}
                        </Text>

                        <Text
                            style={
                                styles.headerDate
                            }
                        >
                            {formatHeaderDate(
                                event.dates
                                    ?.start
                                    ?.localDate,
                                event.dates
                                    ?.start
                                    ?.localTime,
                            )}
                        </Text>
                    </View>

                    <View
                        style={
                            styles.headerSpacer
                        }
                    />
                </View>

                {/* Event image */}
                <View
                    style={
                        styles.imageContainer
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
                            styles.image
                        }
                    />
                </View>

                {/* Save button */}
                <View
                    style={
                        styles.actionRow
                    }
                >
                    <View />

                    <Pressable
                        style={
                            styles.headerButton
                        }
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Save event"
                    >
                        <Heart
                            size={22}
                            color={
                                COLORS.text
                            }
                        />
                    </Pressable>
                </View>

                {/* Event details */}
                <View
                    style={
                        styles.details
                    }
                >
                    <Text
                        style={
                            styles.title
                        }
                        numberOfLines={
                            3
                        }
                    >
                        {event.name}
                    </Text>

                    {price && (
                        <Text
                            style={
                                styles.price
                            }
                        >
                            {price}
                        </Text>
                    )}

                    <Text
                        style={
                            styles.sectionLabel
                        }
                    >
                        ABOUT
                    </Text>

                    <Text
                        style={
                            styles.description
                        }
                    >
                        {getDescription()}
                    </Text>

                    <Text
                        style={
                            styles.sectionLabel
                        }
                    >
                        EVENT DETAILS
                    </Text>

                    <View
                        style={
                            styles.infoBlock
                        }
                    >
                        <Text
                            style={
                                styles.infoLabel
                            }
                        >
                            TIME
                        </Text>

                        <Text
                            style={
                                styles.infoValue
                            }
                        >
                            {getTime()}
                        </Text>
                    </View>

                    <View
                        style={
                            styles.infoBlock
                        }
                    >
                        <Text
                            style={
                                styles.infoLabel
                            }
                        >
                            LOCATION
                        </Text>

                        <Text
                            style={
                                styles.infoValue
                            }
                        >
                            {getFullLocation()}
                        </Text>
                    </View>

                    <View
                        style={
                            styles.infoBlock
                        }
                    >
                        <Text
                            style={
                                styles.infoLabel
                            }
                        >
                            DATE
                        </Text>

                        <Text
                            style={
                                styles.infoValue
                            }
                        >
                            {formatFullDate(
                                event.dates
                                    ?.start
                                    ?.localDate,
                            )}
                        </Text>
                    </View>

                    <Text
                        style={
                            styles.eventId
                        }
                    >
                        Event: {event.id}
                    </Text>

                    <CustomButton
                        title="Book ticket"
                        variant="secondary"
                        onPress={() =>
                            navigation.navigate(
                                'BookingTickets',
                                {
                                    eventId:
                                        event.id,
                                },
                            )
                        }
                        style={
                            styles.button
                        }
                    />
                </View>
            </ScrollView>
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
        paddingTop: 0,
    },

    /*
     * Figma-style header:
     * back button + event title + date/time.
     */
    header: {
        minHeight: 88,
        paddingHorizontal:
            SPACING.md,
        paddingBottom:
            SPACING.sm,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:
            COLORS.background,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:
            SPACING.sm,
    },

    headerText: {
        flex: 1,
        justifyContent: 'center',
    },

    headerTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 15,
        lineHeight: 19,
        color: COLORS.text,
    },

    headerDate: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        lineHeight: 15,
        color: COLORS.textSecondary,
        marginTop: 2,
    },

    headerSpacer: {
        width: 40,
    },

    /*
     * Event image.
     */
    imageContainer: {
        position: 'relative',
    },

    image: {
        width: '100%',
        height: 260,
    },

    /*
     * Save button below the image,
     * matching the Figma layout.
     */
    actionRow: {
        height: 48,
        paddingHorizontal:
            SPACING.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'space-between',
    },

    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor:
            COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },

    details: {
        paddingHorizontal:
            SPACING.lg,
        paddingBottom:
            SPACING.lg,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 20,
        lineHeight: 25,
        color: COLORS.text,
        marginBottom: 4,
    },

    price: {
        ...TYPOGRAPHY.medium,
        fontSize: 14,
        color: COLORS.text,
        marginTop: SPACING.sm,
    },

    sectionLabel: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 10,
        color: COLORS.textSecondary,
        marginTop:
            SPACING.lg,
        marginBottom:
            SPACING.sm,
        letterSpacing: 0.5,
    },

    description: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        lineHeight: 17,
        color: COLORS.textSecondary,
    },

    infoBlock: {
        marginBottom:
            SPACING.sm,
    },

    infoLabel: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 9,
        color: COLORS.text,
        marginBottom: 2,
    },

    infoValue: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        lineHeight: 16,
        color: COLORS.text,
    },

    eventId: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        color: COLORS.textSecondary,
        marginTop:
            SPACING.sm,
    },

    button: {
        marginTop:
            SPACING.lg,
        borderRadius:
            RADIUS.sm,
    },

    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent:
            'center',
        paddingHorizontal:
            SPACING.lg,
        backgroundColor:
            COLORS.background,
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
        marginBottom:
            SPACING.lg,
        textAlign: 'center',
    },
});