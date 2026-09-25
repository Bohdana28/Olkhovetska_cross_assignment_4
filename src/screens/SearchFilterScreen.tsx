import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChevronDown from 'lucide-react-native/icons/chevron-down';
import ChevronUp from 'lucide-react-native/icons/chevron-up';
import Search from 'lucide-react-native/icons/search';

import { fetchCategories } from '../api/api';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { SCREENS } from '../constants/screens';
import type { SearchStackScreenProps } from '../navigation/types';

type Props = SearchStackScreenProps<'SearchFilter'>;

interface DateOption {
    label: string;
    date: Date;
}

const getDateOptions = (): DateOption[] => {
    const today = new Date();

    return Array.from({ length: 14 }, (_, index) => {
        const date = new Date(today);
        date.setHours(12, 0, 0, 0);
        date.setDate(today.getDate() + index);

        return {
            label:
                index === 0
                    ? 'Today'
                    : date.toLocaleDateString('en-GB', {
                          weekday: 'short',
                          day: 'numeric',
                      }),
            date,
        };
    });
};

const formatDateTime = (
    date: Date,
    endOfDay = false,
): string => {
    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1,
        ).padStart(2, '0');

    const day =
        String(
            date.getDate(),
        ).padStart(2, '0');

    const time =
        endOfDay
            ? '23:59:59Z'
            : '00:00:00Z';

    return `${year}-${month}-${day}T${time}`;
};

export default function SearchFilterScreen({
    navigation,
    route,
}: Props) {
    const insets = useSafeAreaInsets();

    const {
        query,
        category: initialCategory,
        minPrice: initialMinPrice,
        maxPrice: initialMaxPrice,
        location: initialLocation,
        sort,
        startDateTime: initialStartDateTime,
    } = route.params;

    const [categories, setCategories] = useState<string[]>(
        [],
    );

    const [loadingCategories, setLoadingCategories] =
        useState(true);

    const [selectedCategory, setSelectedCategory] = useState(
        initialCategory ?? '',
    );

    const [minPrice, setMinPrice] = useState(
        initialMinPrice !== undefined
            ? String(initialMinPrice)
            : '',
    );

    const [maxPrice, setMaxPrice] = useState(
        initialMaxPrice !== undefined
            ? String(initialMaxPrice)
            : '',
    );

    const [location, setLocation] = useState(
        initialLocation ?? '',
    );

    const [selectedDate, setSelectedDate] =
        useState<Date | null>(() => {
            if (!initialStartDateTime) {
                return null;
            }

            const date = new Date(initialStartDateTime);

            return Number.isNaN(date.getTime())
                ? null
                : date;
        });

    const [dateExpanded, setDateExpanded] = useState(true);
    const [priceExpanded, setPriceExpanded] = useState(true);
    const [categoryExpanded, setCategoryExpanded] =
        useState(true);
    const [locationExpanded, setLocationExpanded] =
        useState(true);

    const dateOptions = getDateOptions();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();

                setCategories(data);
            } catch (error) {
                console.error(
                    'Failed to load categories:',
                    error,
                );
            } finally {
                setLoadingCategories(false);
            }
        };

        loadCategories();
    }, []);

    const handleClearAll = () => {
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        setLocation('');
        setSelectedDate(null);
    };

    const handleApplyFilters = () => {
        navigation.navigate(
            SCREENS.SEARCH_RESULTS,
            {
                query,
                sort: sort ?? 'date',

                category:
                    selectedCategory ||
                    undefined,

                minPrice:
                    minPrice.trim()
                        ? Number(minPrice)
                        : undefined,

                maxPrice:
                    maxPrice.trim()
                        ? Number(maxPrice)
                        : undefined,

                location:
                    location.trim() ||
                    undefined,

                startDateTime:
                    selectedDate
                        ? formatDateTime(
                            selectedDate,
                        )
                        : undefined,

                endDateTime:
                    selectedDate
                        ? formatDateTime(
                            selectedDate,
                            true,
                        )
                        : undefined,
            },
        );
    };

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                },
            ]}
        >
            {/* HEADER */}

            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.headerAction}>
                        Cancel
                    </Text>
                </Pressable>

                <Text style={styles.title}>
                    Filter
                </Text>

                <Pressable
                    onPress={handleClearAll}
                >
                    <Text style={styles.headerAction}>
                        Clear All
                    </Text>
                </Pressable>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingBottom:
                            insets.bottom + 100,
                    },
                ]}
            >
                {/* DATE */}

                <View style={styles.section}>
                    <Pressable
                        style={styles.sectionHeader}
                        onPress={() =>
                            setDateExpanded(
                                !dateExpanded,
                            )
                        }
                    >
                        <View style={styles.sectionTitleRow}>
                            <Text
                                style={styles.sectionTitle}
                            >
                                Date
                            </Text>

                            {selectedDate && (
                                <View
                                    style={styles.badge}
                                >
                                    <Text
                                        style={
                                            styles.badgeText
                                        }
                                    >
                                        1
                                    </Text>
                                </View>
                            )}
                        </View>

                        {dateExpanded ? (
                            <ChevronUp
                                size={18}
                                color={
                                    COLORS.textSecondary
                                }
                            />
                        ) : (
                            <ChevronDown
                                size={18}
                                color={
                                    COLORS.textSecondary
                                }
                            />
                        )}
                    </Pressable>

                    {dateExpanded && (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={
                                false
                            }
                            contentContainerStyle={
                                styles.dateList
                            }
                        >
                            {dateOptions.map(
                                option => {
                                    const selected =
                                        selectedDate?.toDateString() ===
                                        option.date.toDateString();

                                    return (
                                        <Pressable
                                            key={option.date.toISOString()}
                                            onPress={() =>
                                                setSelectedDate(
                                                    option.date,
                                                )
                                            }
                                            style={[
                                                styles.dateButton,
                                                selected &&
                                                    styles.dateButtonActive,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.dateButtonText,
                                                    selected &&
                                                        styles.dateButtonTextActive,
                                                ]}
                                            >
                                                {
                                                    option.label
                                                }
                                            </Text>
                                        </Pressable>
                                    );
                                },
                            )}

                            {selectedDate && (
                                <Pressable
                                    onPress={() =>
                                        setSelectedDate(
                                            null,
                                        )
                                    }
                                    style={
                                        styles.dateButton
                                    }
                                >
                                    <Text
                                        style={
                                            styles.dateButtonText
                                        }
                                    >
                                        Clear
                                    </Text>
                                </Pressable>
                            )}
                        </ScrollView>
                    )}
                </View>

                {/* PRICE */}

                <View style={styles.section}>
                    <Pressable
                        style={styles.sectionHeader}
                        onPress={() =>
                            setPriceExpanded(
                                !priceExpanded,
                            )
                        }
                    >
                        <Text
                            style={styles.sectionTitle}
                        >
                            Price Range
                        </Text>

                        {priceExpanded ? (
                            <ChevronUp
                                size={18}
                                color={
                                    COLORS.textSecondary
                                }
                            />
                        ) : (
                            <ChevronDown
                                size={18}
                                color={
                                    COLORS.textSecondary
                                }
                            />
                        )}
                    </Pressable>

                    {priceExpanded && (
                        <View
                            style={styles.priceRow}
                        >
                            <TextInput
                                value={minPrice}
                                onChangeText={
                                    setMinPrice
                                }
                                placeholder="Min £"
                                placeholderTextColor={
                                    COLORS.textSecondary
                                }
                                keyboardType="numeric"
                                style={
                                    styles.priceInput
                                }
                            />

                            <Text
                                style={styles.toText}
                            >
                                to
                            </Text>

                            <TextInput
                                value={maxPrice}
                                onChangeText={
                                    setMaxPrice
                                }
                                placeholder="Max £"
                                placeholderTextColor={
                                    COLORS.textSecondary
                                }
                                keyboardType="numeric"
                                style={
                                    styles.priceInput
                                }
                            />
                        </View>
                    )}
                </View>

                {/* CATEGORY */}

                <View style={styles.section}>
                    <Pressable
                        style={styles.sectionHeader}
                        onPress={() =>
                            setCategoryExpanded(
                                !categoryExpanded,
                            )
                        }
                    >
                        <Text
                            style={styles.sectionTitle}
                        >
                            Category
                        </Text>

                        {categoryExpanded ? (
                            <ChevronUp
                                size={18}
                                color={
                                    COLORS.textSecondary
                                }
                            />
                        ) : (
                            <ChevronDown
                                size={18}
                                color={
                                    COLORS.textSecondary
                                }
                            />
                        )}
                    </Pressable>

                    {categoryExpanded && (
                        <View
                            style={
                                styles.categoryContainer
                            }
                        >
                            {loadingCategories ? (
                                <ActivityIndicator
                                    color={
                                        COLORS.primary
                                    }
                                />
                            ) : categories.length ===
                              0 ? (
                                <Text
                                    style={
                                        styles.emptyCategoryText
                                    }
                                >
                                    No categories
                                    available
                                </Text>
                            ) : (
                                categories.map(
                                    categoryName => {
                                        const selected =
                                            selectedCategory ===
                                            categoryName;

                                        return (
                                            <Pressable
                                                key={
                                                    categoryName
                                                }
                                                onPress={() =>
                                                    setSelectedCategory(
                                                        selected
                                                            ? ''
                                                            : categoryName,
                                                    )
                                                }
                                                style={[
                                                    styles.categoryButton,
                                                    selected &&
                                                        styles.categoryButtonActive,
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.categoryText,
                                                        selected &&
                                                            styles.categoryTextActive,
                                                    ]}
                                                >
                                                    {
                                                        categoryName
                                                    }
                                                </Text>
                                            </Pressable>
                                        );
                                    },
                                )
                            )}
                        </View>
                    )}
                </View>

                {/* LOCATION */}

                <View style={styles.section}>
                    <Pressable
                        style={styles.sectionHeader}
                        onPress={() =>
                            setLocationExpanded(
                                !locationExpanded,
                            )
                        }
                    >
                        <Text
                            style={styles.sectionTitle}
                        >
                            Location
                        </Text>

                        {locationExpanded ? (
                            <ChevronUp
                                size={18}
                                color={
                                    COLORS.textSecondary
                                }
                            />
                        ) : (
                            <ChevronDown
                                size={18}
                                color={
                                    COLORS.textSecondary
                                }
                            />
                        )}
                    </Pressable>

                    {locationExpanded && (
                        <View
                            style={
                                styles.locationInput
                            }
                        >
                            <Search
                                size={18}
                                color={
                                    COLORS.textSecondary
                                }
                            />

                            <TextInput
                                value={location}
                                onChangeText={
                                    setLocation
                                }
                                placeholder="Enter city"
                                placeholderTextColor={
                                    COLORS.textSecondary
                                }
                                style={
                                    styles.locationTextInput
                                }
                            />
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* FOOTER */}

            <View
                style={[
                    styles.footer,
                    {
                        paddingBottom: Math.max(
                            insets.bottom,
                            SPACING.md,
                        ),
                    },
                ]}
            >
                <Pressable
                    onPress={handleApplyFilters}
                    style={styles.applyButton}
                >
                    <Text
                        style={
                            styles.applyButtonText
                        }
                    >
                        Apply Filters
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
    },

    headerAction: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.primary,
    },

    title: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 15,
        color: COLORS.text,
    },

    content: {
        paddingHorizontal: SPACING.lg,
    },

    section: {
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    sectionHeader: {
        minHeight: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    sectionTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 13,
        color: COLORS.text,
    },

    badge: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: COLORS.primary,
    },

    badgeText: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 10,
        color: '#FFFFFF',
    },

    dateList: {
        gap: 8,
        paddingTop: SPACING.sm,
    },

    dateButton: {
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.card,
    },

    dateButtonActive: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
    },

    dateButtonText: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        color: COLORS.text,
    },

    dateButtonTextActive: {
        color: '#FFFFFF',
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingTop: SPACING.sm,
    },

    priceInput: {
        flex: 1,
        height: 42,
        paddingHorizontal: 12,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.card,
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.text,
    },

    toText: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingTop: SPACING.sm,
    },

    categoryButton: {
        paddingHorizontal: 13,
        paddingVertical: 8,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.card,
    },

    categoryButtonActive: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
    },

    categoryText: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        color: COLORS.text,
    },

    categoryTextActive: {
        color: '#FFFFFF',
    },

    emptyCategoryText: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    locationInput: {
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        marginTop: SPACING.sm,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.card,
    },

    locationTextInput: {
        flex: 1,
        padding: 0,
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.text,
    },

    footer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },

    applyButton: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.primary,
    },

    applyButtonText: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 13,
        color: '#FFFFFF',
    },
});