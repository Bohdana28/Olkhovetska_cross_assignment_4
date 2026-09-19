import { useState } from 'react';

import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import EventCard from '../components/EventCard';

import {
    COLORS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

const categories = [
    'Music',
    'Sports',
    'Festival',
    'Art',
    'Theatre',
];

const events = [
    {
        id: 'sheffield-music-festival',
        title: 'Sheffield Music Festival',
        imageUrl: require('../../assets/images/festival.jpg'),
        date: 'Sep 20',
        location: 'Sheffield, UK',
        category: 'Music',
    },
];

export default function SearchScreen() {
    const insets = useSafeAreaInsets();

    const [searchQuery, setSearchQuery] =
        useState('');

    const [selectedCategory, setSelectedCategory] =
        useState('Music');

    const query = searchQuery.trim().toLowerCase();

    const filteredEvents =
        query.length === 0
            ? []
            : events.filter((event) => {
                  const matchesSearch =
                      event.title
                          .toLowerCase()
                          .includes(query) ||
                      event.location
                          .toLowerCase()
                          .includes(query) ||
                      event.category
                          .toLowerCase()
                          .includes(query);

                  const matchesCategory =
                      event.category ===
                      selectedCategory;

                  return (
                      matchesSearch &&
                      matchesCategory
                  );
              });

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
                keyboardShouldPersistTaps="always"
            >
                <Text style={styles.title}>
                    Search events
                </Text>

                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                <Text style={styles.sectionTitle}>
                    Categories
                </Text>

                <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={
                        setSelectedCategory
                    }
                />

                <Text style={styles.sectionTitle}>
                    Results
                </Text>

                {query.length === 0 ? (
                    <Text style={styles.message}>
                        Start typing to search for events.
                    </Text>
                ) : filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            title={event.title}
                            imageUrl={event.imageUrl}
                            date={event.date}
                            location={event.location}
                            onPress={() => {}}
                        />
                    ))
                ) : (
                    <Text style={styles.message}>
                        No events found.
                    </Text>
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

    sectionTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 14,
        color: COLORS.text,
        marginTop: SPACING.sm,
    },

    message: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: SPACING.sm,
    },
});