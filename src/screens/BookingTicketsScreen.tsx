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
} from 'lucide-react-native';

import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useState } from 'react';

import type { HomeStackScreenProps } from '../navigation/types';

import CustomButton from '../components/CustomButton';

import {
    COLORS,
    RADIUS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

type Props = HomeStackScreenProps<'BookingTickets'>;

type TicketType = 'General Admission' | 'VIP';

const TICKETS = {
    'General Admission': 25,
    VIP: 45,
} as const;

export default function BookingTicketsScreen({
    navigation,
    route,
}: Props) {
    const insets = useSafeAreaInsets();
    const { eventId } = route.params;

    const [ticketType, setTicketType] =
        useState<TicketType>('General Admission');

    const [quantity, setQuantity] = useState(1);

    const ticketPrice = TICKETS[ticketType];

    const decreaseQuantity = () => {
        setQuantity((current) =>
            Math.max(1, current - 1),
        );
    };

    const increaseQuantity = () => {
        setQuantity((current) => current + 1);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingTop:
                            insets.top + SPACING.sm,
                        paddingBottom:
                            insets.bottom + 100,
                    },
                ]}
            >
                <View style={styles.header}>
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <ChevronLeft
                            size={24}
                            color={COLORS.primary}
                        />
                    </Pressable>

                    <Text style={styles.headerTitle}>
                        Booking
                    </Text>

                    <View style={styles.headerSpacer} />
                </View>

                <View style={styles.steps}>
                    <View style={styles.stepItem}>
                        <View style={styles.activeCircle}>
                            <Text style={styles.activeNumber}>
                                1
                            </Text>
                        </View>

                        <Text style={styles.activeText}>
                            Tickets
                        </Text>
                    </View>

                    <View style={styles.stepLine} />

                    <View style={styles.stepItem}>
                        <View style={styles.circle}>
                            <Text style={styles.number}>
                                2
                            </Text>
                        </View>

                        <Text style={styles.stepText}>
                            Summary
                        </Text>
                    </View>

                    <View style={styles.stepLine} />

                    <View style={styles.stepItem}>
                        <View style={styles.circle}>
                            <Text style={styles.number}>
                                3
                            </Text>
                        </View>

                        <Text style={styles.stepText}>
                            Payment
                        </Text>
                    </View>

                    <View style={styles.stepLine} />

                    <View style={styles.stepItem}>
                        <View style={styles.circle}>
                            <Text style={styles.number}>
                                4
                            </Text>
                        </View>

                        <Text style={styles.stepText}>
                            Confirmation
                        </Text>
                    </View>
                </View>

                <Image
                    source={require('../../assets/images/festival.jpg')}
                    style={styles.eventImage}
                />

                <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>
                        Sheffield Music Festival
                    </Text>

                    <Text style={styles.eventDate}>
                        Sep 20 • 18:00
                    </Text>

                    <Text style={styles.eventDescription}>
                        Join us for Sheffield Music Festival
                        featuring live music, local artists and
                        great entertainment. Enjoy an unforgettable
                        evening with music and performances in
                        Sheffield.
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>
                    Ticket type
                </Text>

                <View style={styles.ticketTypes}>
                    <Pressable
                        onPress={() =>
                            setTicketType(
                                'General Admission',
                            )
                        }
                        style={[
                            styles.ticket,
                            ticketType ===
                                'General Admission' &&
                                styles.ticketSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.ticketText,
                                ticketType ===
                                    'General Admission' &&
                                    styles.ticketTextSelected,
                            ]}
                        >
                            GENERAL ADMISSION — £25
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() =>
                            setTicketType('VIP')
                        }
                        style={[
                            styles.ticket,
                            ticketType === 'VIP' &&
                                styles.ticketSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.ticketText,
                                ticketType === 'VIP' &&
                                    styles.ticketTextSelected,
                            ]}
                        >
                            VIP — £45
                        </Text>
                    </Pressable>
                </View>

                <Text style={styles.selectedTicket}>
                    Selected: {ticketType} • £{ticketPrice}
                </Text>

                <Text style={styles.sectionTitle}>
                    Quantity
                </Text>

                <View style={styles.quantity}>
                    <Pressable
                        onPress={decreaseQuantity}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityIcon}>
                            −
                        </Text>
                    </Pressable>

                    <Text style={styles.quantityText}>
                        {quantity}
                    </Text>

                    <Pressable
                        onPress={increaseQuantity}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityIcon}>
                            +
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>

            <View
                style={[
                    styles.footer,
                    {
                        paddingBottom:
                            insets.bottom + SPACING.sm,
                    },
                ]}
            >
                <CustomButton
                    title="Continue"
                    variant="primary"
                    onPress={() =>
                        navigation.navigate(
                            'Booking',
                            {
                                eventId,
                                quantity,
                                ticketType,
                                ticketPrice,
                            },
                        )
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        paddingHorizontal: SPACING.lg,
    },

    header: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    backButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 14,
        color: COLORS.text,
    },

    headerSpacer: {
        width: 32,
    },

    steps: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: SPACING.lg,
    },

    stepItem: {
        alignItems: 'center',
        gap: 4,
    },

    activeCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeNumber: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 10,
        color: COLORS.background,
    },

    number: {
        ...TYPOGRAPHY.medium,
        fontSize: 10,
        color: COLORS.textSecondary,
    },

    activeText: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 9,
        color: COLORS.primary,
    },

    stepText: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        color: COLORS.textSecondary,
    },

    stepLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
        marginHorizontal: 4,
        marginBottom: 18,
    },

    eventImage: {
        width: '100%',
        height: 220,
        borderRadius: RADIUS.md,
        marginBottom: SPACING.md,
    },

    eventInfo: {
        marginBottom: SPACING.lg,
    },

    eventTitle: {
        ...TYPOGRAPHY.bold,
        fontSize: 20,
        color: COLORS.text,
        marginBottom: 4,
    },

    eventDate: {
        ...TYPOGRAPHY.regular,
        fontSize: 14,
        color: COLORS.text,
    },

    eventDescription: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        lineHeight: 17,
        color: COLORS.textSecondary,
        marginTop: SPACING.lg,
    },

    sectionTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
    },

    ticketTypes: {
        flexDirection: 'row',
        gap: SPACING.sm,
        flexWrap: 'wrap',
    },

    ticket: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.primaryLight,
    },

    ticketSelected: {
        backgroundColor: COLORS.primary,
    },

    ticketText: {
        ...TYPOGRAPHY.medium,
        fontSize: 9,
        color: COLORS.primary,
    },

    ticketTextSelected: {
        color: COLORS.background,
    },

    selectedTicket: {
        ...TYPOGRAPHY.regular,
        fontSize: 10,
        color: COLORS.textSecondary,
        marginTop: 8,
    },

    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: SPACING.lg,
    },

    quantityButton: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    quantityIcon: {
        fontSize: 18,
        color: COLORS.primary,
        lineHeight: 20,
    },

    quantityText: {
        ...TYPOGRAPHY.regular,
        fontSize: 14,
        color: COLORS.text,
    },

    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
});