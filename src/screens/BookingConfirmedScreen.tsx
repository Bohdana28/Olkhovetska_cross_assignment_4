import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    Check,
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

type Props =
    HomeStackScreenProps<'BookingConfirmed'>;

const SERVICE_FEE = 2.5;

export default function BookingConfirmedScreen({
    navigation,
    route,
}: Props) {
    const insets = useSafeAreaInsets();

    const {
        eventId,
        quantity,
        ticketType,
        ticketPrice,
        paymentMethod,
        cardLastFour,
    } = route.params;

    const total =
        quantity * ticketPrice + SERVICE_FEE;

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                },
            ]}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Booking confirmed
                    </Text>
                </View>

                <View style={styles.success}>
                    <View style={styles.successCircle}>
                        <Check
                            size={28}
                            color={COLORS.primary}
                        />
                    </View>

                    <Text style={styles.title}>
                        Booking confirmed! 🎉
                    </Text>

                    <Text style={styles.subtitle}>
                        Your ticket has been successfully
                        booked.
                    </Text>
                </View>

                <View style={styles.ticket}>
                    <View style={styles.ticketImage}>
                        <Text style={styles.ticketImageText}>
                            EVENT
                        </Text>
                    </View>

                    <View style={styles.ticketInfo}>
                        <Text style={styles.eventTitle}>
                            Sheffield Music Festival
                        </Text>

                        <Text style={styles.eventDetails}>
                            Sep 20 • 18:00
                        </Text>

                        <Text style={styles.eventDetails}>
                            Sheffield, UK
                        </Text>

                        <Text style={styles.label}>
                            Ticket
                        </Text>

                        <Text style={styles.value}>
                            {ticketType} × {quantity}
                        </Text>

                        <Text style={styles.label}>
                            Payment
                        </Text>

                        <Text style={styles.value}>
                            {paymentMethod}
                            {cardLastFour
                                ? ` •••• ${cardLastFour}`
                                : ''}
                        </Text>

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>
                                Total
                            </Text>

                            <Text style={styles.totalValue}>
                                £{total.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.eventId}>
                    Event: {eventId}
                </Text>
            </View>

            <View style={styles.footer}>
                <CustomButton
                    title="View ticket"
                    variant="primary"
                    onPress={() =>
                        navigation.popToTop()
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
        flex: 1,
        paddingHorizontal: SPACING.lg,
    },

    header: {
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
    },

    success: {
        alignItems: 'center',
        marginTop: 90,
    },

    successCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.md,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
    },

    subtitle: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 4,
    },

    ticket: {
        flexDirection: 'row',
        marginTop: 40,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.card,
    },

    ticketImage: {
        width: 58,
        height: 58,
        borderRadius: RADIUS.sm,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    ticketImageText: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 8,
        color: COLORS.primary,
    },

    ticketInfo: {
        flex: 1,
        marginLeft: SPACING.md,
    },

    eventTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
        marginBottom: 3,
    },

    eventDetails: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },

    label: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        color: COLORS.textSecondary,
        marginTop: 7,
    },

    value: {
        ...TYPOGRAPHY.medium,
        fontSize: 10,
        color: COLORS.text,
    },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.md,
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },

    totalLabel: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 10,
        color: COLORS.text,
    },

    totalValue: {
        ...TYPOGRAPHY.bold,
        fontSize: 11,
        color: COLORS.text,
    },

    eventId: {
        ...TYPOGRAPHY.regular,
        fontSize: 8,
        color: COLORS.textSecondary,
        marginTop: SPACING.md,
    },

    footer: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
    },
});