import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';

import {
    ChevronLeft,
    Heart,
} from 'lucide-react-native';

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

type Props = HomeStackScreenProps<'EventDetails'>;

export default function EventDetailsScreen({
    navigation,
    route,
}: Props) {
    const insets = useSafeAreaInsets();

    // eventId comes from navigation params.
    // Optional access prevents the screen from crashing
    // if the parameter is missing.
    const eventId = route.params?.eventId;

    // Graceful error state for a missing eventId.
    if (!eventId) {
        return (
            <View
                style={[
                    styles.errorContainer,
                    {
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                    },
                ]}
            >
                <Text style={styles.errorTitle}>
                    Event not found
                </Text>

                <Text style={styles.errorText}>
                    We couldn't find this event.
                </Text>

                <CustomButton
                    title="Go back"
                    variant="primary"
                    onPress={() => navigation.goBack()}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingBottom:
                            insets.bottom + SPACING.lg,
                    },
                ]}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/festival.jpg')}
                        style={styles.image}
                    />

                    <View style={styles.imageHeader}>
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={styles.headerButton}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Go back"
                        >
                            <ChevronLeft
                                size={24}
                                color={COLORS.primary}
                            />
                        </Pressable>

                        <Pressable
                            style={styles.headerButton}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Save event"
                        >
                            <Heart
                                size={22}
                                color={COLORS.text}
                            />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.details}>
                    <Text style={styles.title}>
                        Sheffield Music Festival
                    </Text>

                    <Text style={styles.date}>
                        Sep 20 • 18:00
                    </Text>

                    <Text style={styles.price}>
                        From £25
                    </Text>

                    <Text style={styles.sectionLabel}>
                        ABOUT
                    </Text>

                    <Text style={styles.description}>
                        A live music festival featuring local
                        and international artists, food, drinks
                        and entertainment in Sheffield.
                    </Text>

                    <Text style={styles.sectionLabel}>
                        EVENT DETAILS
                    </Text>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>
                            TIME
                        </Text>

                        <Text style={styles.infoValue}>
                            18:00 – 23:00
                        </Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>
                            LOCATION
                        </Text>

                        <Text style={styles.infoValue}>
                            Sheffield, UK
                        </Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>
                            DATE
                        </Text>

                        <Text style={styles.infoValue}>
                            SEPTEMBER 20, 2026
                        </Text>
                    </View>

                    <Text style={styles.eventId}>
                        Event: {eventId}
                    </Text>

                    <CustomButton
                        title="Book ticket"
                        variant="secondary"
                        onPress={() =>
                            navigation.navigate(
                                'BookingTickets',
                                {
                                    eventId,
                                },
                            )
                        }
                        style={styles.button}
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
        paddingTop: 0,
    },

    imageContainer: {
        position: 'relative',
    },

    image: {
        width: '100%',
        height: 300,
    },

    imageHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 50,
        paddingHorizontal: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },

    details: {
        padding: SPACING.lg,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 20,
        color: COLORS.text,
        marginBottom: 4,
    },

    date: {
        ...TYPOGRAPHY.regular,
        fontSize: 14,
        color: COLORS.text,
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
        marginTop: SPACING.lg,
        marginBottom: SPACING.sm,
        letterSpacing: 0.5,
    },

    description: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        lineHeight: 17,
        color: COLORS.textSecondary,
    },

    infoBlock: {
        marginBottom: SPACING.sm,
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
        color: COLORS.text,
    },

    eventId: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        color: COLORS.textSecondary,
        marginTop: SPACING.sm,
    },

    button: {
        marginTop: SPACING.lg,
        borderRadius: RADIUS.sm,
    },

    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.lg,
        backgroundColor: COLORS.background,
    },

    errorTitle: {
        ...TYPOGRAPHY.bold,
        fontSize: 20,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    },

    errorText: {
        ...TYPOGRAPHY.regular,
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: SPACING.lg,
        textAlign: 'center',
    },
});