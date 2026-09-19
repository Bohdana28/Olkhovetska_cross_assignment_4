import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
    ChevronDown,
    MapPin,
    SlidersHorizontal,
} from 'lucide-react-native';

import {
    searchEvents,
    type TicketmasterEvent,
} from '../api/api';

import SearchBar from '../components/SearchBar';

import {
    COLORS,
    RADIUS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

import {
    SCREENS,
} from '../constants/screens';

import type {
    SearchStackScreenProps,
} from '../navigation/types';

type Props =
    SearchStackScreenProps<'SearchResults'>;

export default function SearchResultsScreen({
    navigation,
    route,
}: Props) {
    const insets =
        useSafeAreaInsets();

    const {
        query,
        category,
        minPrice,
        maxPrice,
        location,
        sort: initialSort = 'date',
        startDateTime,
        endDateTime,
    } = route.params;

    const [
        searchQuery,
        setSearchQuery,
    ] = useState(query);

    const [
        events,
        setEvents,
    ] = useState<TicketmasterEvent[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState('');

    const [
        currentSort,
        setCurrentSort,
    ] = useState(initialSort);

    const [
        sortMenuVisible,
        setSortMenuVisible,
    ] = useState(false);

    useEffect(() => {
        setSearchQuery(query);
    }, [query]);

    useEffect(() => {
        setCurrentSort(
            initialSort,
        );
    }, [initialSort]);

    

    useEffect(() => {
    const loadEvents = async () => {
        const trimmedQuery =
            searchQuery.trim();

        if (!trimmedQuery) {
            return;
        }

        try {
            setLoading(true);
            setError('');

            const data =
                await searchEvents(
                    trimmedQuery,
                    {
                        category,
                        sort: currentSort,
                        minPrice,
                        maxPrice,
                        location,
                        startDateTime,
                        endDateTime,
                    },
                );

            setEvents(data);
        } catch (err) {
            console.error(
                'Search failed:',
                err,
            );

            setEvents([]);

            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to load events.',
            );
        } finally {
            setLoading(false);
        }
    };

    loadEvents();
}, [
    searchQuery,
    category,
    minPrice,
    maxPrice,
    location,
    currentSort,
    startDateTime,
    endDateTime,
]);

    const handleSearch = () => {
        const value =
            searchQuery.trim();

        if (!value) {
            return;
        }

        navigation.navigate(
            SCREENS.SEARCH_RESULTS,
            {
                query: value,
                category,
                minPrice,
                maxPrice,
                location,
                sort: currentSort,
                startDateTime,
                endDateTime,
            },
        );
    };

    const handleOpenFilter = () => {
        navigation.navigate(
            SCREENS.SEARCH_FILTER,
            {
                query: searchQuery.trim(),
                category,
                minPrice,
                maxPrice,
                location,
                sort: currentSort,
                startDateTime,
                endDateTime,
            },
        );
    };

    const handleSelectSort = (
        sort: 'date' | 'name',
    ) => {
        setCurrentSort(sort);
        setSortMenuVisible(false);
    };

    const handleEventPress = (
        eventId: string,
    ) => {
        navigation
            .getParent()
            ?.navigate(
                SCREENS.HOME,
                {
                    screen:
                        SCREENS.EVENT_DETAILS,
                    params: {
                        eventId,
                    },
                },
            );
    };

    const filterCount =
        useMemo(() => {
            let count = 0;

            if (category) {
                count += 1;
            }

            if (
                minPrice !==
                undefined
            ) {
                count += 1;
            }

            if (
                maxPrice !==
                undefined
            ) {
                count += 1;
            }

            if (location) {
                count += 1;
            }

            if (
                startDateTime ||
                endDateTime
            ) {
                count += 1;
            }

            return count;
        }, [
            category,
            minPrice,
            maxPrice,
            location,
            startDateTime,
            endDateTime,
        ]);

    const getImageUrl = (
        event: TicketmasterEvent,
    ) => {
        if (
            !event.images?.length
        ) {
            return undefined;
        }

        const sortedImages =
            [...event.images].sort(
                (a, b) =>
                    (b.width ?? 0) -
                    (a.width ?? 0),
            );

        return sortedImages[0]?.url;
    };

    const formatEventDate = (
        event: TicketmasterEvent,
    ) => {
        const date =
            event.dates?.start
                ?.localDate;

        if (!date) {
            return 'Date TBA';
        }

        const parsedDate =
            new Date(
                `${date}T12:00:00`,
            );

        return parsedDate.toLocaleDateString(
            'en-GB',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            },
        );
    };

    const getLocation = (
        event: TicketmasterEvent,
    ) => {
        const venue =
            event._embedded
                ?.venues?.[0];

        if (!venue) {
            return 'Location TBA';
        }

        const city =
            venue.city?.name;

        const venueName =
            venue.name;

        if (
            venueName &&
            city
        ) {
            return `${venueName}, ${city}`;
        }

        return (
            venueName ||
            city ||
            'Location TBA'
        );
    };

    const renderEvent = ({
        item,
    }: {
        item: TicketmasterEvent;
    }) => {
        const imageUrl =
            getImageUrl(item);

        return (
            <Pressable
                onPress={() =>
                    handleEventPress(
                        item.id,
                    )
                }
                style={
                    styles.eventCard
                }
            >
                {imageUrl ? (
                    <Image
                        source={{
                            uri: imageUrl,
                        }}
                        style={
                            styles.eventImage
                        }
                    />
                ) : (
                    <View
                        style={
                            styles.imagePlaceholder
                        }
                    >
                        <Text
                            style={
                                styles.placeholderText
                            }
                        >
                            No image
                        </Text>
                    </View>
                )}

                <View
                    style={
                        styles.eventInfo
                    }
                >
                    <Text
                        style={
                            styles.eventName
                        }
                        numberOfLines={2}
                    >
                        {item.name}
                    </Text>

                    <View
                        style={
                            styles.locationRow
                        }
                    >
                        <MapPin
                            size={12}
                            color={
                                COLORS.textSecondary
                            }
                        />

                        <Text
                            style={
                                styles.locationText
                            }
                            numberOfLines={1}
                        >
                            {getLocation(
                                item,
                            )}
                        </Text>
                    </View>

                    <Text
                        style={
                            styles.eventDate
                        }
                    >
                        {formatEventDate(
                            item,
                        )}
                    </Text>
                </View>
            </Pressable>
        );
    };

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
            <View
                style={
                    styles.header
                }
            >
                <Text
                    style={
                        styles.title
                    }
                >
                    Search
                </Text>
            </View>

            {/* REAL SEARCH INPUT */}

            <View
                style={
                    styles.searchContainer
                }
            >
                <SearchBar
                    value={searchQuery}
                    onChangeText={
                        setSearchQuery
                    }
                    onSubmitEditing={
                        handleSearch
                    }
                    placeholder="Search events"
                />
            </View>

            {/* SORT + FILTER */}

            <View
                style={
                    styles.controls
                }
            >
                <View
                    style={
                        styles.sortWrapper
                    }
                >
                    <Pressable
                        onPress={() =>
                            setSortMenuVisible(
                                !sortMenuVisible,
                            )
                        }
                        style={
                            styles.controlButton
                        }
                    >
                        <Text
                            style={
                                styles.controlText
                            }
                        >
                            Sort
                        </Text>

                        <ChevronDown
                            size={15}
                            color={
                                COLORS.textSecondary
                            }
                        />
                    </Pressable>

                    {sortMenuVisible && (
                        <View
                            style={
                                styles.sortMenu
                            }
                        >
                            <Pressable
                                onPress={() =>
                                    handleSelectSort(
                                        'date',
                                    )
                                }
                                style={
                                    styles.sortOption
                                }
                            >
                                <Text
                                    style={[
                                        styles.sortOptionText,
                                        currentSort ===
                                            'date' &&
                                            styles.sortOptionActive,
                                    ]}
                                >
                                    By date
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() =>
                                    handleSelectSort(
                                        'name',
                                    )
                                }
                                style={
                                    styles.sortOption
                                }
                            >
                                <Text
                                    style={[
                                        styles.sortOptionText,
                                        currentSort ===
                                            'name' &&
                                            styles.sortOptionActive,
                                    ]}
                                >
                                    By name
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                <Pressable
                    onPress={
                        handleOpenFilter
                    }
                    style={
                        styles.controlButton
                    }
                >
                    <SlidersHorizontal
                        size={15}
                        color={
                            COLORS.textSecondary
                        }
                    />

                    <Text
                        style={
                            styles.controlText
                        }
                    >
                        Filter
                    </Text>

                    {filterCount >
                        0 && (
                        <View
                            style={
                                styles.filterBadge
                            }
                        >
                            <Text
                                style={
                                    styles.filterBadgeText
                                }
                            >
                                {
                                    filterCount
                                }
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>

            {/* CONTENT */}

            {loading ? (
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
                </View>
            ) : error ? (
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
                        Search failed
                    </Text>

                    <Text
                        style={
                            styles.errorText
                        }
                    >
                        {error}
                    </Text>
                </View>
            ) : events.length ===
              0 ? (
                <View
                    style={
                        styles.center
                    }
                >
                    <Text
                        style={
                            styles.emptyTitle
                        }
                    >
                        No events found
                    </Text>

                    <Text
                        style={
                            styles.emptyText
                        }
                    >
                        Try another search
                        or change your
                        filters.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={events}
                    renderItem={
                        renderEvent
                    }
                    keyExtractor={
                        item =>
                            item.id
                    }
                    numColumns={2}
                    columnWrapperStyle={
                        styles.row
                    }
                    contentContainerStyle={[
                        styles.listContent,
                        {
                            paddingBottom:
                                insets.bottom +
                                80,
                        },
                    ]}
                    showsVerticalScrollIndicator={
                        false
                    }
                />
            )}
        </View>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                COLORS.background,
        },

        header: {
            height: 52,
            alignItems:
                'center',
            justifyContent:
                'center',
        },

        title: {
            ...TYPOGRAPHY.semiBold,
            fontSize: 15,
            color: COLORS.text,
        },

        searchContainer: {
            paddingHorizontal:
                SPACING.lg,
        },

        controls: {
            width: '100%',
            flexDirection:
                'row',
            alignItems:
                'center',
            justifyContent:
                'space-between',
            paddingHorizontal:
                SPACING.lg,
            marginTop:
                SPACING.md,
            marginBottom:
                SPACING.md,
        },

        sortWrapper: {
            position:
                'relative',
            zIndex: 10,
        },

        controlButton: {
            minHeight: 34,
            flexDirection:
                'row',
            alignItems:
                'center',
            justifyContent:
                'center',
            gap: 6,
            paddingHorizontal:
                12,
            borderRadius: 18,
            borderWidth: 1,
            borderColor:
                COLORS.border,
            backgroundColor:
                COLORS.card,
        },

        controlText: {
            ...TYPOGRAPHY.regular,
            fontSize: 11,
            color: COLORS.text,
        },

        filterBadge: {
            minWidth: 17,
            height: 17,
            paddingHorizontal: 4,
            borderRadius: 9,
            alignItems:
                'center',
            justifyContent:
                'center',
            backgroundColor:
                COLORS.primary,
        },

        filterBadgeText: {
            ...TYPOGRAPHY.semiBold,
            fontSize: 9,
            color: '#FFFFFF',
        },

        sortMenu: {
            position:
                'absolute',
            top: 40,
            left: 0,
            zIndex: 20,
            minWidth: 120,
            paddingVertical: 6,
            borderRadius:
                RADIUS.md,
            backgroundColor:
                COLORS.card,
            borderWidth: 1,
            borderColor:
                COLORS.border,

            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.12,
            shadowRadius: 6,
            elevation: 5,
        },

        sortOption: {
            paddingHorizontal:
                14,
            paddingVertical:
                10,
        },

        sortOptionText: {
            ...TYPOGRAPHY.regular,
            fontSize: 12,
            color: COLORS.text,
        },

        sortOptionActive: {
            color: COLORS.primary,
        },

        listContent: {
            paddingHorizontal:
                SPACING.lg,
        },

        row: {
            justifyContent:
                'space-between',
            marginBottom:
                SPACING.md,
        },

        eventCard: {
            width: '48%',
            overflow:
                'hidden',
            borderRadius:
                RADIUS.md,
            backgroundColor:
                COLORS.card,
            borderWidth: 1,
            borderColor:
                COLORS.border,
        },

        eventImage: {
            width: '100%',
            height: 105,
            resizeMode:
                'cover',
        },

        imagePlaceholder: {
            width: '100%',
            height: 105,
            alignItems:
                'center',
            justifyContent:
                'center',
            backgroundColor:
                COLORS.border,
        },

        placeholderText: {
            ...TYPOGRAPHY.regular,
            fontSize: 10,
            color:
                COLORS.textSecondary,
        },

        eventInfo: {
            padding: 9,
        },

        eventName: {
            ...TYPOGRAPHY.semiBold,
            fontSize: 11,
            lineHeight: 15,
            color: COLORS.text,
        },

        locationRow: {
            flexDirection:
                'row',
            alignItems:
                'center',
            gap: 4,
            marginTop: 6,
        },

        locationText: {
            flex: 1,
            ...TYPOGRAPHY.regular,
            fontSize: 9,
            color:
                COLORS.textSecondary,
        },

        eventDate: {
            marginTop: 5,
            ...TYPOGRAPHY.semiBold,
            fontSize: 9,
            color: COLORS.text,
        },

        center: {
            flex: 1,
            alignItems:
                'center',
            justifyContent:
                'center',
            paddingHorizontal:
                SPACING.lg,
        },

        errorTitle: {
            ...TYPOGRAPHY.semiBold,
            fontSize: 15,
            color: COLORS.text,
            marginBottom: 8,
        },

        errorText: {
            ...TYPOGRAPHY.regular,
            fontSize: 12,
            lineHeight: 18,
            textAlign: 'center',
            color: COLORS.error,
        },

        emptyTitle: {
            ...TYPOGRAPHY.semiBold,
            fontSize: 15,
            color: COLORS.text,
        },

        emptyText: {
            marginTop: 8,
            ...TYPOGRAPHY.regular,
            fontSize: 12,
            textAlign: 'center',
            color:
                COLORS.textSecondary,
        },
    });