import {
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useEffect,
    useState,
} from 'react';

import Clock3 from 'lucide-react-native/icons/clock-3';
import Search from 'lucide-react-native/icons/search';

import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

import SearchBar from '../components/SearchBar';

import type {
    SearchStackScreenProps,
} from '../navigation/types';

import {
    COLORS,
    RADIUS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

type Props =
    SearchStackScreenProps<'Search'>;



export default function SearchScreen({
    navigation,
}: Props) {
    const insets =
        useSafeAreaInsets();

    const [
        searchQuery,
        setSearchQuery,
    ] = useState('');

    const [
        recentSearch,
        setRecentSearch,
    ] = useState('');

    /*
     * Search is intentionally kept in memory
     * for this assignment.
     *
     * The last search is displayed on the
     * Search screen after returning to it.
     */
    useEffect(() => {
        /*
         * The previous search is passed through
         * navigation when returning from results.
         *
         * Nothing is loaded from the API here.
         */
    }, []);

    /*
     * Open SearchResults with the current query.
     */
    const handleSearch = () => {
        const value =
            searchQuery.trim();

        if (!value) {
            return;
        }

        Keyboard.dismiss();

        setRecentSearch(value);

        navigation.navigate(
            'SearchResults',
            {
                query: value,
                sort: 'date',
            },
        );
    };

    /*
     * Use the recent search again.
     */
    const handleRecentSearch = () => {
        if (!recentSearch) {
            return;
        }

        setSearchQuery(
            recentSearch,
        );

        navigation.navigate(
            'SearchResults',
            {
                query:
                    recentSearch,
                sort: 'date',
            },
        );
    };

    /*
     * Remove the recent search.
     */
    const clearRecentSearch = () => {
        setRecentSearch('');
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
                style={[
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
                    style={
                        styles.header
                    }
                >
                    <Text
                        style={
                            styles.title
                        }
                    >
                        Search events
                    </Text>
                </View>

                {/* Search input */}
                <View
                    style={
                        styles.searchContainer
                    }
                >
                    <SearchBar
                        value={
                            searchQuery
                        }
                        onChangeText={
                            setSearchQuery
                        }
                        onSubmitEditing={
                            handleSearch
                        }
                        placeholder="Search events"
                    />
                </View>

                {/* Recent search */}
                {recentSearch ? (
                    <View
                        style={
                            styles.recentSection
                        }
                    >
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
                                Recent search
                            </Text>

                            <Pressable
                                onPress={
                                    clearRecentSearch
                                }
                                hitSlop={8}
                                accessibilityRole="button"
                                accessibilityLabel="Clear recent search"
                            >
                                <Text
                                    style={
                                        styles.clearText
                                    }
                                >
                                    Clear
                                </Text>
                            </Pressable>
                        </View>

                        <Pressable
                            onPress={
                                handleRecentSearch
                            }
                            style={
                                styles.recentItem
                            }
                        >
                            <View
                                style={
                                    styles.recentIcon
                                }
                            >
                                <Clock3
                                    size={16}
                                    color={
                                        COLORS.textSecondary
                                    }
                                />
                            </View>

                            <Text
                                style={
                                    styles.recentText
                                }
                                numberOfLines={
                                    1
                                }
                            >
                                {
                                    recentSearch
                                }
                            </Text>

                            <Search
                                size={16}
                                color={
                                    COLORS.primary
                                }
                            />
                        </Pressable>
                    </View>
                ) : null}

                {/* Search hint */}
                {!recentSearch &&
                    !searchQuery.trim() && (
                        <View
                            style={
                                styles.emptyState
                            }
                        >
                            <View
                                style={
                                    styles.emptyIcon
                                }
                            >
                                <Search
                                    size={22}
                                    color={
                                        COLORS.primary
                                    }
                                />
                            </View>

                            <Text
                                style={
                                    styles.emptyTitle
                                }
                            >
                                Find your next event
                            </Text>

                            <Text
                                style={
                                    styles.emptyText
                                }
                            >
                                Search for concerts,
                                sports, theatre,
                                festivals and more.
                            </Text>
                        </View>
                    )}

                {/* Search action */}
                {searchQuery.trim() ? (
                    <Pressable
                        onPress={
                            handleSearch
                        }
                        style={
                            styles.searchButton
                        }
                        accessibilityRole="button"
                    >
                        <Search
                            size={18}
                            color={
                                COLORS.background
                            }
                        />

                        <Text
                            style={
                                styles.searchButtonText
                            }
                        >
                            Search
                        </Text>
                    </Pressable>
                ) : null}
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

    header: {
        paddingTop:
            SPACING.lg,
        marginBottom:
            SPACING.md,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 22,
        color: COLORS.text,
    },

    searchContainer: {
        width: '100%',
    },

    recentSection: {
        marginTop:
            SPACING.lg,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'space-between',
        marginBottom:
            SPACING.sm,
    },

    sectionTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 13,
        color: COLORS.text,
    },

    clearText: {
        ...TYPOGRAPHY.medium,
        fontSize: 10,
        color: COLORS.primary,
    },

    recentItem: {
        minHeight: 48,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:
            SPACING.md,
        borderRadius:
            RADIUS.md,
        backgroundColor:
            COLORS.card,
        borderWidth: 1,
        borderColor:
            COLORS.border,
    },

    recentIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent:
            'center',
        backgroundColor:
            COLORS.primaryLight,
    },

    recentText: {
        flex: 1,
        marginHorizontal:
            SPACING.sm,
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.text,
    },

    emptyState: {
        alignItems: 'center',
        justifyContent:
            'center',
        paddingHorizontal:
            SPACING.lg,
        marginTop: 100,
    },

    emptyIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent:
            'center',
        backgroundColor:
            COLORS.primaryLight,
        marginBottom:
            SPACING.md,
    },

    emptyTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 15,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 6,
    },

    emptyText: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        lineHeight: 16,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },

    searchButton: {
        height: 44,
        marginTop:
            SPACING.lg,
        borderRadius:
            RADIUS.sm,
        backgroundColor:
            COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'center',
        gap: 8,
    },

    searchButtonText: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.background,
    },
});