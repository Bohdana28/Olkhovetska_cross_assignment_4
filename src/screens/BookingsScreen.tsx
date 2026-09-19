import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BookingItem from '../components/BookingItem';

import {
    COLORS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

export default function BookingsScreen() {
    const insets = useSafeAreaInsets();

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
            >
                <Text style={styles.title}>
                    My bookings
                </Text>

                <BookingItem
                    title="Sheffield Music Festival"
                    imageUrl={require('../../assets/images/festival.jpg')}
                    date="Sep 20 · 18:00"
                    location="Sheffield, UK"
                    ticketType="General Admission"
                    quantity={1}
                    price={25}
                    onQuantityChange={() => {}}
                />
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
});