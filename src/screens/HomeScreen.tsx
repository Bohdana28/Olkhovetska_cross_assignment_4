import {
    ActivityIndicator,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { HomeStackScreenProps } from '../navigation/types';

import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import EventCard from '../components/EventCard';

import {
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

import { useTheme } from '../context/ThemeContext';

import {
    fetchCategories,
    fetchEvents,
    fetchEventsByCategory,
    TicketmasterEvent,
} from '../api/api';

type Props = HomeStackScreenProps<'HomeScreen'>;

interface EventCardData {
    id: string;
    title: string;
    imageUrl: string;
    date: string;
    location: string;
}

export default function HomeScreen({
    navigation,
}: Props) {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    const styles = useMemo(
        () => createStyles(colors),
        [colors],
    );

    const [events, setEvents] = useState<
        TicketmasterEvent[]
    >([]);

    const [categories, setCategories] =
        useState<string[]>([]);

    const [selectedCategory, setSelectedCategory] =
        useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    const [eventsLoading, setEventsLoading] =
        useState(false);

    const [error, setError] = useState<string | null>(
        null,
    );

    /*
     * Keeps the latest events available for the
     * category fallback without recreating the
     * category handler every time events change.
     */
    const eventsRef = useRef<
        TicketmasterEvent[]
    >([]);

    useEffect(() => {
        eventsRef.current = events;
    }, [events]);

    useEffect(() => {
        let isMounted = true;

        const loadInitialData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [
                    eventsData,
                    categoriesData,
                ] = await Promise.all([
                    fetchEvents(),
                    fetchCategories(),
                ]);

                if (!isMounted) {
                    return;
                }

                setEvents(eventsData);
                setCategories(categoriesData);
            } catch (err) {
                if (!isMounted) {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load data.',
                );
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadInitialData();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSearchPress = useCallback(() => {
        navigation
            .getParent()
            ?.navigate('Search');
    }, [navigation]);

    const handleSeeMorePress = useCallback(() => {
        navigation
            .getParent()
            ?.navigate('Search');
    }, [navigation]);

    const handleEventPress = useCallback(
        (eventId: string) => {
            navigation.navigate(
                'EventDetails',
                {
                    eventId,
                },
            );
        },
        [navigation],
    );

    const handleCategorySelect =
        useCallback(
            async (category: string) => {
                const isAllCategory =
                    category === 'All';

                setSelectedCategory(
                    isAllCategory
                        ? null
                        : category,
                );

                setEventsLoading(true);
                setError(null);

                if (isAllCategory) {
                    try {
                        const data =
                            await fetchEvents();

                        setEvents(data);
                    } catch (err) {
                        setError(
                            err instanceof Error
                                ? err.message
                                : 'Failed to load events.',
                        );
                    } finally {
                        setEventsLoading(false);
                    }

                    return;
                }

                try {
                    const categoryEvents =
                        await fetchEventsByCategory(
                            category,
                        );

                    if (
                        categoryEvents.length > 0
                    ) {
                        setEvents(
                            categoryEvents,
                        );
                        return;
                    }

                    const localEvents =
                        eventsRef.current.filter(
                            event =>
                                event.classifications?.some(
                                    classification =>
                                        classification
                                            .segment
                                            ?.name ===
                                        category,
                                ) ?? false,
                        );

                    setEvents(localEvents);
                } catch (err) {
                    const localEvents =
                        eventsRef.current.filter(
                            event =>
                                event.classifications?.some(
                                    classification =>
                                        classification
                                            .segment
                                            ?.name ===
                                        category,
                                ) ?? false,
                        );

                    setEvents(localEvents);

                    if (
                        localEvents.length === 0
                    ) {
                        setError(
                            err instanceof Error
                                ? err.message
                                : 'Failed to load category.',
                        );
                    }
                } finally {
                    setEventsLoading(false);
                }
            },
            [],
        );

    const formatDate = useCallback(
        (date?: string) => {
            if (!date) {
                return 'Date TBA';
            }

            const parsedDate = new Date(date);

            return parsedDate.toLocaleDateString(
                'en-GB',
                {
                    day: '2-digit',
                    month: 'short',
                },
            );
        },
        [],
    );

    const getLocation = useCallback(
        (event: TicketmasterEvent) => {
            const venue =
                event._embedded?.venues?.[0];

            if (!venue) {
                return 'Location TBA';
            }

            const city = venue.city?.name;
            const venueName = venue.name;

            if (city && venueName) {
                return `${venueName}, ${city}`;
            }

            return (
                city ||
                venueName ||
                'Location TBA'
            );
        },
        [],
    );

    const getImage = useCallback(
        (event: TicketmasterEvent) =>
            event.images?.[0]?.url,
        [],
    );

    const eventCardData =
        useMemo<EventCardData[]>(
            () =>
                events
                    .map(event => {
                        const imageUrl =
                            getImage(event);

                        if (!imageUrl) {
                            return null;
                        }

                        return {
                            id: event.id,
                            title: event.name,
                            imageUrl,
                            date: formatDate(
                                event.dates
                                    ?.start
                                    ?.localDate,
                            ),
                            location:
                                getLocation(event),
                        };
                    })
                    .filter(
                        (
                            event,
                        ): event is EventCardData =>
                            event !== null,
                    ),
            [
                events,
                formatDate,
                getImage,
                getLocation,
            ],
        );

    const categoryList = useMemo(
        () => ['All', ...categories],
        [categories],
    );

    const renderEventItem = useCallback(
        ({
            item,
        }: {
            item: EventCardData;
        }) => (
            <EventCard
                title={item.title}
                imageUrl={item.imageUrl}
                date={item.date}
                location={item.location}
                eventId={item.id}
                onPress={handleEventPress}
            />
        ),
        [handleEventPress],
    );

    const keyExtractor = useCallback(
        (item: EventCardData) => item.id,
        [],
    );

    const renderSeparator = useCallback(
        () => (
            <View
                style={
                    styles.eventSeparator
                }
            />
        ),
        [styles.eventSeparator],
    );

    if (loading) {
        return (
            <View
                style={[
                    styles.center,
                    {
                        paddingTop:
                            insets.top,
                    },
                ]}
            >
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                />

                <Text style={styles.statusText}>
                    Loading events...
                </Text>
            </View>
        );
    }

    if (error && events.length === 0) {
        return (
            <View
                style={[
                    styles.center,
                    {
                        paddingTop:
                            insets.top,
                    },
                ]}
            >
                <Text style={styles.errorTitle}>
                    Something went wrong
                </Text>

                <Text style={styles.errorText}>
                    {error}
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={[
                styles.container,
                {
                    paddingTop:
                        insets.top,
                },
            ]}
            contentContainerStyle={[
                styles.content,
                {
                    paddingBottom:
                        insets.bottom +
                        SPACING.lg,
                },
            ]}
            showsVerticalScrollIndicator={
                false
            }
        >
            <View style={styles.header}>
                <Text
                    style={styles.greeting}
                >
                    Discover events
                </Text>

                <Text style={styles.title}>
                    Find your next event
                </Text>
            </View>

            <Pressable
                onPress={
                    handleSearchPress
                }
                accessibilityRole="button"
                accessibilityLabel="Open event search"
                style={
                    styles.searchContainer
                }
            >
                <View pointerEvents="none">
                    <SearchBar
                        value=""
                        onChangeText={() => {}}
                    />
                </View>
            </Pressable>

            <View
                style={
                    styles.categoryContainer
                }
            >
                <CategoryList
                    categories={
                        categoryList
                    }
                    selectedCategory={
                        selectedCategory ??
                        'All'
                    }
                    onSelectCategory={
                        handleCategorySelect
                    }
                />
            </View>

            <View>
                <View
                    style={
                        styles.sectionHeader
                    }
                >
                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Near you
                    </Text>

                    <Pressable
                        onPress={
                            handleSeeMorePress
                        }
                        accessibilityRole="button"
                        accessibilityLabel="See more events"
                    >
                        <Text
                            style={
                                styles.seeMore
                            }
                        >
                            See more
                        </Text>
                    </Pressable>
                </View>

                {eventsLoading ? (
                    <View
                        style={
                            styles.eventsLoading
                        }
                    >
                        <ActivityIndicator
                            size="small"
                            color={
                                colors.primary
                            }
                        />

                        <Text
                            style={
                                styles.loadingText
                            }
                        >
                            Loading events...
                        </Text>
                    </View>
                ) : error ? (
                    <Text
                        style={
                            styles.inlineError
                        }
                    >
                        {error}
                    </Text>
                ) : eventCardData.length ===
                  0 ? (
                    <Text
                        style={
                            styles.emptyText
                        }
                    >
                        No events found for this
                        category.
                    </Text>
                ) : (
                    <FlatList
                        data={eventCardData}
                        horizontal
                        renderItem={
                            renderEventItem
                        }
                        keyExtractor={
                            keyExtractor
                        }
                        showsHorizontalScrollIndicator={
                            false
                        }
                        contentContainerStyle={
                            styles.horizontalList
                        }
                        ItemSeparatorComponent={
                            renderSeparator
                        }
                        initialNumToRender={5}
                        windowSize={5}
                        removeClippedSubviews
                    />
                )}
            </View>
        </ScrollView>
    );
}

const createStyles = (colors: {
    primary: string;
    primaryLight: string;
    primaryMedium: string;
    text: string;
    textSecondary: string;
    background: string;
    border: string;
    card: string;
    success: string;
    error: string;
}) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                colors.background,
        },

        content: {
            padding: SPACING.lg,
        },

        header: {
            marginBottom: SPACING.md,
        },

        greeting: {
            ...TYPOGRAPHY.regular,
            fontSize: 12,
            color: colors.textSecondary,
            marginBottom: 4,
        },

        title: {
            ...TYPOGRAPHY.bold,
            fontSize: 22,
            color: colors.text,
        },

        searchContainer: {
            marginBottom: SPACING.md,
        },

        categoryContainer: {
            marginBottom: SPACING.lg,
        },

        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:
                'space-between',
            marginBottom: SPACING.sm,
        },

        sectionTitle: {
            ...TYPOGRAPHY.semiBold,
            fontSize: 14,
            color: colors.text,
        },

        seeMore: {
            ...TYPOGRAPHY.medium,
            fontSize: 10,
            color: colors.primary,
        },

        horizontalList: {
            paddingRight: SPACING.lg,
        },

        eventSeparator: {
            width: SPACING.md,
        },

        eventsLoading: {
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
        },

        loadingText: {
            marginTop: SPACING.sm,
            ...TYPOGRAPHY.regular,
            fontSize: 13,
            color: colors.textSecondary,
        },

        emptyText: {
            ...TYPOGRAPHY.regular,
            fontSize: 14,
            color: colors.textSecondary,
            paddingVertical: SPACING.lg,
        },

        inlineError: {
            ...TYPOGRAPHY.regular,
            fontSize: 13,
            color: colors.error,
            paddingVertical: SPACING.lg,
        },

        center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal:
                SPACING.lg,
            backgroundColor:
                colors.background,
        },

        statusText: {
            marginTop: SPACING.sm,
            ...TYPOGRAPHY.regular,
            fontSize: 14,
            color: colors.textSecondary,
        },

        errorTitle: {
            ...TYPOGRAPHY.bold,
            fontSize: 18,
            color: colors.text,
            marginBottom: SPACING.sm,
        },

        errorText: {
            ...TYPOGRAPHY.regular,
            fontSize: 14,
            color: colors.error,
            textAlign: 'center',
        },
    });