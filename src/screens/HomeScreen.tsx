import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useEffect, useState } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { HomeStackScreenProps } from '../navigation/types';

import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import EventCard from '../components/EventCard';

import {
    COLORS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

import {
    fetchCategories,
    fetchEvents,
    fetchEventsByCategory,
    TicketmasterEvent,
} from '../api/api';

type Props = HomeStackScreenProps<'HomeScreen'>;

export default function HomeScreen({
    navigation,
}: Props) {
    const insets = useSafeAreaInsets();

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

    useEffect(() => {
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

                setEvents(eventsData);
                setCategories(categoriesData);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load data.',
                );
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const handleSearchPress = () => {
        navigation
            .getParent()
            ?.navigate('Search');
    };

    const handleSeeMorePress = () => {
        navigation
            .getParent()
            ?.navigate('Search');
    };

    const handleCategorySelect = async (
        category: string,
    ) => {
        setSelectedCategory(
            category === 'All'
                ? null
                : category,
        );

        setEventsLoading(true);
        setError(null);

        if (category === 'All') {
            try {
                const data = await fetchEvents();

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

            /*
             * If Ticketmaster returns events for the
             * selected category, use them.
             */
            if (categoryEvents.length > 0) {
                setEvents(categoryEvents);
                return;
            }

            /*
             * If there are no results from the API,
             * filter the already loaded events locally.
             * This prevents an empty screen when the
             * current API result has no matching events.
             */
            const localEvents = events.filter(
                (event) =>
                    event.classifications?.some(
                        (classification) =>
                            classification.segment
                                ?.name ===
                            category,
                    ) ?? false,
            );

            setEvents(localEvents);
        } catch (err) {
            /*
             * If the category request itself fails,
             * fall back to the events already loaded.
             */
            const localEvents = events.filter(
                (event) =>
                    event.classifications?.some(
                        (classification) =>
                            classification.segment
                                ?.name ===
                            category,
                    ) ?? false,
            );

            setEvents(localEvents);

            /*
             * Only show an error if the local fallback
             * also has no events.
             */
            if (localEvents.length === 0) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load category.',
                );
            }
        } finally {
            setEventsLoading(false);
        }
    };

    const formatDate = (date?: string) => {
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
    };

    const getLocation = (
        event: TicketmasterEvent,
    ) => {
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
    };

    const getImage = (
        event: TicketmasterEvent,
    ) => {
        return event.images?.[0]?.url;
    };

    const renderEventItem = ({
        item,
    }: {
        item: TicketmasterEvent;
    }) => {
        const imageUrl = getImage(item);

        if (!imageUrl) {
            return null;
        }

        return (
            <EventCard
                title={item.name}
                imageUrl={{
                    uri: imageUrl,
                }}
                date={formatDate(
                    item.dates?.start
                        ?.localDate,
                )}
                location={getLocation(item)}
                onPress={() =>
                    navigation.navigate(
                        'EventDetails',
                        {
                            eventId: item.id,
                        },
                    )
                }
            />
        );
    };

    const renderHeader = () => (
        <View style={styles.headerContent}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.greeting}>
                    Discover events
                </Text>

                <Text style={styles.title}>
                    Find your next event
                </Text>
            </View>

            {/* Search */}
            <Pressable
                onPress={handleSearchPress}
                accessibilityRole="button"
                accessibilityLabel="Open event search"
                style={styles.searchContainer}
            >
                <View pointerEvents="none">
                    <SearchBar
                        value=""
                        onChangeText={() => {}}
                    />
                </View>
            </Pressable>

            {/* Categories */}
            <View
                style={styles.categoryContainer}
            >
                <CategoryList
                    categories={[
                        'All',
                        ...categories,
                    ]}
                    selectedCategory={
                        selectedCategory ??
                        'All'
                    }
                    onSelectCategory={
                        handleCategorySelect
                    }
                />
            </View>

            {/* Near you */}
            <View>
                <View
                    style={styles.sectionHeader}
                >
                    <Text
                        style={styles.sectionTitle}
                    >
                        Near you
                    </Text>

                    <Pressable
                        onPress={
                            handleSeeMorePress
                        }
                        accessibilityRole="button"
                    >
                        <Text
                            style={styles.seeMore}
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
                                COLORS.primary
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
                ) : events.length === 0 ? (
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
                        data={events}
                        horizontal
                        renderItem={
                            renderEventItem
                        }
                        keyExtractor={(item) =>
                            item.id
                        }
                        showsHorizontalScrollIndicator={
                            false
                        }
                        contentContainerStyle={
                            styles.horizontalList
                        }
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    width:
                                        SPACING.md,
                                }}
                            />
                        )}
                    />
                )}
            </View>
        </View>
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
                    color={COLORS.primary}
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
        <View
            style={[
                styles.container,
                {
                    paddingTop:
                        insets.top,
                },
            ]}
        >
            <FlatList
                data={[]}
                ListHeaderComponent={
                    renderHeader
                }
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
            />
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
        padding: SPACING.lg,
    },

    headerContent: {
        gap: 0,
    },

    header: {
        marginBottom: SPACING.md,
    },

    greeting: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 22,
        color: COLORS.text,
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
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },

    sectionTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 14,
        color: COLORS.text,
    },

    seeMore: {
        ...TYPOGRAPHY.medium,
        fontSize: 10,
        color: COLORS.primary,
    },

    horizontalList: {
        paddingRight: SPACING.lg,
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
        color: COLORS.textSecondary,
    },

    emptyText: {
        ...TYPOGRAPHY.regular,
        fontSize: 14,
        color: COLORS.textSecondary,
        paddingVertical: SPACING.lg,
    },

    inlineError: {
        ...TYPOGRAPHY.regular,
        fontSize: 13,
        color: COLORS.error,
        paddingVertical: SPACING.lg,
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        backgroundColor:
            COLORS.background,
    },

    statusText: {
        marginTop: SPACING.sm,
        ...TYPOGRAPHY.regular,
        fontSize: 14,
        color: COLORS.textSecondary,
    },

    errorTitle: {
        ...TYPOGRAPHY.bold,
        fontSize: 18,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    },

    errorText: {
        ...TYPOGRAPHY.regular,
        fontSize: 14,
        color: COLORS.error,
        textAlign: 'center',
    },
});