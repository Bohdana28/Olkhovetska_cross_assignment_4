import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

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

type Props = HomeStackScreenProps<'HomeScreen'>;

const categories = [
    'Music',
    'Sports',
    'Festival',
    'Art',
    'Theatre',
];

export default function HomeScreen({
    navigation,
}: Props) {
    const insets = useSafeAreaInsets();

    /**
     * Search belongs to the main bottom tabs,
     * while Home is inside its own stack.
     *
     * getParent() moves from HomeStack to MainTabs,
     * allowing us to open the Search tab.
     */
    const handleSearchPress = () => {
        navigation.getParent()?.navigate('Search');
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
            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingBottom:
                            insets.bottom + SPACING.lg,
                    },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>
                        Discover events
                    </Text>

                    <Text style={styles.title}>
                        Find your next event
                    </Text>
                </View>

                {/* Search preview.
                    It opens the Search tab instead of
                    activating a text input on Home. */}
                <Pressable
                    onPress={handleSearchPress}
                    accessibilityRole="button"
                    accessibilityLabel="Open event search"
                >
                    <View pointerEvents="none">
                        <SearchBar
                            value=""
                            onChangeText={() => {}}
                        />
                    </View>
                </Pressable>

                {/* Categories */}
                <View>
                    <Text style={styles.sectionTitle}>
                        Categories
                    </Text>

                    <CategoryList
                        categories={categories}
                        selectedCategory="Music"
                        onSelectCategory={() => {}}
                    />
                </View>

                {/* Events */}
                <View>
                    <Text style={styles.sectionTitle}>
                        Near you
                    </Text>

                    <EventCard
                        title="Sheffield Music Festival"
                        imageUrl={require('../../assets/images/festival.jpg')}
                        date="Sep 20"
                        location="Sheffield, UK"
                        onPress={() =>
                            navigation.navigate(
                                'EventDetails',
                                {
                                    eventId:
                                        'sheffield-music-festival',
                                },
                            )
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
        backgroundColor: COLORS.background,
    },

    content: {
        padding: SPACING.lg,
        gap: SPACING.lg,
    },

    header: {
        marginBottom: SPACING.xs,
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

    sectionTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 14,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    },
});