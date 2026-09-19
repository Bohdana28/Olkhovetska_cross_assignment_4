import { useState } from 'react';

import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { HomeStackScreenProps } from '../navigation/types';

import BookingItem from '../components/BookingItem';
import CustomButton from '../components/CustomButton';

import {
    COLORS,
    RADIUS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

type Props = HomeStackScreenProps<'Booking'>;

const SERVICE_FEE = 2.5;

export default function BookingScreen({
    navigation,
    route,
}: Props) {
    const insets = useSafeAreaInsets();

    const {
        eventId,
        quantity: initialQuantity,
        ticketType,
        ticketPrice,
    } = route.params;

    const [quantity, setQuantity] =
        useState(initialQuantity);

    /**
     * Calculate the ticket price based on
     * the current quantity.
     */
    const ticketTotal =
        quantity * ticketPrice;

    /**
     * Service fee is fixed for this demo.
     */
    const total =
        ticketTotal + SERVICE_FEE;

    /**
     * Return to the previous screen.
     */
    const handleCancel = () => {
        navigation.goBack();
    };

    /**
     * Continue to payment with the current
     * quantity and ticket information.
     */
    const handleContinue = () => {
        navigation.navigate(
            'Payment',
            {
                eventId,
                quantity,
                ticketType,
                ticketPrice,
            },
        );
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
                            insets.bottom + 110,
                    },
                ]}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        onPress={handleCancel}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Cancel booking"
                    >
                        <Text style={styles.cancel}>
                            Cancel
                        </Text>
                    </Pressable>

                    <Text style={styles.headerTitle}>
                        Booking Summary
                    </Text>

                    <View
                        style={styles.headerSpacer}
                    />
                </View>

                {/* Booking progress */}
                <View style={styles.steps}>
                    <View style={styles.stepItem}>
                        <View
                            style={
                                styles.completedCircle
                            }
                        >
                            <Text
                                style={
                                    styles.completedNumber
                                }
                            >
                                ✓
                            </Text>
                        </View>

                        <Text style={styles.stepText}>
                            Tickets
                        </Text>
                    </View>

                    <View style={styles.stepLine} />

                    <View style={styles.stepItem}>
                        <View
                            style={styles.activeCircle}
                        >
                            <Text
                                style={
                                    styles.activeNumber
                                }
                            >
                                2
                            </Text>
                        </View>

                        <Text style={styles.activeText}>
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

                {/* Page introduction */}
                <View style={styles.intro}>
                    <Text style={styles.title}>
                        Review your booking
                    </Text>

                    <Text style={styles.subtitle}>
                        Check your tickets before
                        continuing to payment.
                    </Text>
                </View>

                {/* Selected tickets */}
                <BookingItem
                    title="Sheffield Music Festival"
                    imageUrl={require('../../assets/images/festival.jpg')}
                    date="Sep 20 • 18:00"
                    location="Sheffield, UK"
                    ticketType={ticketType}
                    quantity={quantity}
                    price={ticketPrice}
                    onQuantityChange={setQuantity}
                />

                {/* Order summary */}
                <View style={styles.summary}>
                    <Text style={styles.summaryTitle}>
                        Order Summary
                    </Text>

                    {/* Tickets */}
                    <View style={styles.priceRow}>
                        <Text style={styles.label}>
                            {quantity} × {ticketType}
                        </Text>

                        <Text style={styles.value}>
                            £{ticketTotal.toFixed(2)}
                        </Text>
                    </View>

                    {/* Service fee */}
                    <View style={styles.priceRow}>
                        <View>
                            <Text style={styles.label}>
                                Service fee
                            </Text>

                            <Text
                                style={
                                    styles.secondaryLabel
                                }
                            >
                                Booking service fee
                            </Text>
                        </View>

                        <Text style={styles.value}>
                            £{SERVICE_FEE.toFixed(2)}
                        </Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Total */}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>
                            Total
                        </Text>

                        <Text style={styles.totalValue}>
                            £{total.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom action */}
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
                    title="Continue to Payment"
                    variant="primary"
                    onPress={handleContinue}
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
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cancel: {
        ...TYPOGRAPHY.medium,
        fontSize: 11,
        color: COLORS.primary,
    },

    headerTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 14,
        color: COLORS.text,
    },

    headerSpacer: {
        width: 45,
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

    completedCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.card,
        alignItems: 'center',
        justifyContent: 'center',
    },

    completedNumber: {
        ...TYPOGRAPHY.bold,
        fontSize: 11,
        color: COLORS.primary,
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
        color: COLORS.text,
    },

    stepText: {
        ...TYPOGRAPHY.medium,
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

    intro: {
        marginTop: SPACING.lg,
        marginBottom: SPACING.lg,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 18,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    },

    subtitle: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        lineHeight: 17,
        color: COLORS.textSecondary,
    },

    summary: {
        marginTop: SPACING.lg,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.card,
    },

    summaryTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 13,
        color: COLORS.text,
        marginBottom: SPACING.md,
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },

    label: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        color: COLORS.textSecondary,
    },

    secondaryLabel: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        color: COLORS.textSecondary,
        marginTop: 2,
    },

    value: {
        ...TYPOGRAPHY.medium,
        fontSize: 11,
        color: COLORS.text,
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.sm,
    },

    totalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    totalLabel: {
        ...TYPOGRAPHY.bold,
        fontSize: 14,
        color: COLORS.text,
    },

    totalValue: {
        ...TYPOGRAPHY.bold,
        fontSize: 16,
        color: COLORS.primary,
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