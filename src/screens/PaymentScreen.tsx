import { useState } from 'react';

import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import Check from 'lucide-react-native/icons/check';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { HomeStackScreenProps } from '../navigation/types';

import CustomButton from '../components/CustomButton';

import {
    COLORS,
    RADIUS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

type Props = HomeStackScreenProps<'Payment'>;

type PaymentMethod = 'card' | 'applePay';

type CardType = 'mastercard' | 'visa';

const SERVICE_FEE = 2.5;

export default function PaymentScreen({
    navigation,
    route,
}: Props) {
    const insets = useSafeAreaInsets();

    const {
        eventId,
        quantity,
        ticketType,
        ticketPrice,
    } = route.params;

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>('card');

    const [cardType, setCardType] =
        useState<CardType>('mastercard');

    const [cardNumber, setCardNumber] =
        useState('');

    const [cardName, setCardName] =
        useState('');

    const [expiry, setExpiry] =
        useState('');

    const [cvv, setCvv] =
        useState('');

    const [billingSame, setBillingSame] =
        useState(true);

    const [showNewCard, setShowNewCard] =
        useState(false);

    const total =
        quantity * ticketPrice + SERVICE_FEE;

    const cleanCardNumber =
        cardNumber.replace(/\D/g, '');

    const cardLastFour =
        cleanCardNumber.slice(-4);

    const handlePay = () => {
        const paymentName =
            paymentMethod === 'card'
                ? cardType === 'mastercard'
                    ? 'Mastercard'
                    : 'Visa'
                : 'Apple Pay';

        navigation.navigate(
            'BookingConfirmed',
            {
                eventId,
                quantity,
                ticketType,
                ticketPrice,
                paymentMethod: paymentName,
                cardLastFour:
                    paymentMethod === 'card'
                        ? cardLastFour || '1234'
                        : undefined,
            },
        );
    };

    const handleCardNumberChange = (
        value: string,
    ) => {
        const digits = value
            .replace(/\D/g, '')
            .slice(0, 16);

        const formatted = digits
            .replace(/(.{4})/g, '$1 ')
            .trim();

        setCardNumber(formatted);
    };

    const handleExpiryChange = (
        value: string,
    ) => {
        const digits = value
            .replace(/\D/g, '')
            .slice(0, 4);

        if (digits.length <= 2) {
            setExpiry(digits);
            return;
        }

        setExpiry(
            `${digits.slice(0, 2)}/${digits.slice(2)}`,
        );
    };

    const handleCvvChange = (
        value: string,
    ) => {
        const digits = value
            .replace(/\D/g, '')
            .slice(0, 3);

        setCvv(digits);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingTop: insets.top,
                        paddingBottom:
                            insets.bottom + 110,
                    },
                ]}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        onPress={() =>
                            navigation.goBack()
                        }
                        hitSlop={8}
                    >
                        <Text style={styles.cancel}>
                            Cancel
                        </Text>
                    </Pressable>

                    <Text style={styles.headerTitle}>
                        Payment
                    </Text>

                    <View style={styles.spacer} />
                </View>

                {/* Progress steps */}
                <View style={styles.steps}>
                    <View style={styles.stepItem}>
                        <View
                            style={
                                styles.completedCircle
                            }
                        >
                            <Check
                                size={13}
                                color={COLORS.primary}
                            />
                        </View>

                        <Text style={styles.stepText}>
                            Tickets
                        </Text>
                    </View>

                    <View style={styles.stepLine} />

                    <View style={styles.stepItem}>
                        <View
                            style={
                                styles.completedCircle
                            }
                        >
                            <Check
                                size={13}
                                color={COLORS.primary}
                            />
                        </View>

                        <Text style={styles.stepText}>
                            Summary
                        </Text>
                    </View>

                    <View style={styles.stepLine} />

                    <View style={styles.stepItem}>
                        <View
                            style={
                                styles.activeCircle
                            }
                        >
                            <Text
                                style={
                                    styles.activeNumber
                                }
                            >
                                3
                            </Text>
                        </View>

                        <Text style={styles.activeText}>
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

                {/* Intro */}
                <View style={styles.intro}>
                    <Text style={styles.title}>
                        Choose a payment method
                    </Text>

                    <Text style={styles.subtitle}>
                        You won't be charged until you
                        review the order on the next page
                    </Text>
                </View>

                {/* Credit Card */}
                <View
                    style={[
                        styles.paymentCard,
                        paymentMethod === 'card' &&
                            styles.paymentCardSelected,
                    ]}
                >
                    <Pressable
                        onPress={() =>
                            setPaymentMethod('card')
                        }
                        style={styles.paymentHeader}
                    >
                        <View
                            style={[
                                styles.radio,
                                paymentMethod ===
                                    'card' &&
                                    styles.radioSelected,
                            ]}
                        >
                            {paymentMethod === 'card' && (
                                <View
                                    style={
                                        styles.radioDot
                                    }
                                />
                            )}
                        </View>

                        <Text style={styles.paymentTitle}>
                            Credit Card
                        </Text>
                    </Pressable>

                    {paymentMethod === 'card' && (
                        <View>
                            {/* Mastercard */}
                            <Pressable
                                onPress={() =>
                                    setCardType(
                                        'mastercard',
                                    )
                                }
                                style={[
                                    styles.card,
                                    cardType ===
                                        'mastercard' &&
                                        styles.cardSelected,
                                ]}
                            >
                                <View
                                    style={
                                        styles.cardContent
                                    }
                                >
                                    <Text
                                        style={
                                            styles.cardName
                                        }
                                    >
                                        Mastercard
                                    </Text>

                                    <Text
                                        style={
                                            styles.cardNumber
                                        }
                                    >
                                        {cardType ===
                                            'mastercard' &&
                                        cardNumber
                                            ? cardNumber
                                            : 'XXXX XXXX XXXX 1234'}
                                    </Text>
                                </View>

                                {cardType ===
                                    'mastercard' && (
                                    <Check
                                        size={18}
                                        color={
                                            COLORS.primary
                                        }
                                    />
                                )}
                            </Pressable>

                            {/* Visa */}
                            <Pressable
                                onPress={() =>
                                    setCardType('visa')
                                }
                                style={[
                                    styles.card,
                                    cardType === 'visa' &&
                                        styles.cardSelected,
                                ]}
                            >
                                <View
                                    style={
                                        styles.cardContent
                                    }
                                >
                                    <Text
                                        style={
                                            styles.cardName
                                        }
                                    >
                                        Visa
                                    </Text>

                                    <Text
                                        style={
                                            styles.cardNumber
                                        }
                                    >
                                        XXXX XXXX XXXX 9876
                                    </Text>
                                </View>

                                {cardType === 'visa' && (
                                    <Check
                                        size={18}
                                        color={
                                            COLORS.primary
                                        }
                                    />
                                )}
                            </Pressable>

                            {/* Add new card */}
                            <Pressable
                                onPress={() =>
                                    setShowNewCard(
                                        current =>
                                            !current,
                                    )
                                }
                                style={styles.addCard}
                            >
                                <Text style={styles.plus}>
                                    {showNewCard
                                        ? '−'
                                        : '+'}
                                </Text>

                                <Text
                                    style={
                                        styles.addCardText
                                    }
                                >
                                    {showNewCard
                                        ? 'Hide card form'
                                        : 'Add new card'}
                                </Text>
                            </Pressable>

                            {/* New card form */}
                            {showNewCard && (
                                <View
                                    style={
                                        styles.newCardForm
                                    }
                                >
                                    <TextInput
                                        value={cardName}
                                        onChangeText={
                                            setCardName
                                        }
                                        placeholder="Cardholder name"
                                        placeholderTextColor={
                                            COLORS.textSecondary
                                        }
                                        autoCapitalize="words"
                                        style={
                                            styles.input
                                        }
                                    />

                                    <TextInput
                                        value={cardNumber}
                                        onChangeText={
                                            handleCardNumberChange
                                        }
                                        placeholder="Card number"
                                        placeholderTextColor={
                                            COLORS.textSecondary
                                        }
                                        keyboardType="numeric"
                                        maxLength={19}
                                        style={
                                            styles.input
                                        }
                                    />

                                    <View
                                        style={
                                            styles.inputRow
                                        }
                                    >
                                        <TextInput
                                            value={expiry}
                                            onChangeText={
                                                handleExpiryChange
                                            }
                                            placeholder="MM/YY"
                                            placeholderTextColor={
                                                COLORS.textSecondary
                                            }
                                            keyboardType="numeric"
                                            maxLength={5}
                                            style={[
                                                styles.input,
                                                styles.halfInput,
                                            ]}
                                        />

                                        <TextInput
                                            value={cvv}
                                            onChangeText={
                                                handleCvvChange
                                            }
                                            placeholder="CVV"
                                            placeholderTextColor={
                                                COLORS.textSecondary
                                            }
                                            keyboardType="numeric"
                                            maxLength={3}
                                            secureTextEntry
                                            style={[
                                                styles.input,
                                                styles.halfInput,
                                            ]}
                                        />
                                    </View>
                                </View>
                            )}

                            {/* Billing address */}
                            <Pressable
                                onPress={() =>
                                    setBillingSame(
                                        current =>
                                            !current,
                                    )
                                }
                                style={styles.billing}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        !billingSame &&
                                            styles.checkboxEmpty,
                                    ]}
                                >
                                    {billingSame && (
                                        <Check
                                            size={13}
                                            color={
                                                COLORS.background
                                            }
                                        />
                                    )}
                                </View>

                                <Text
                                    style={
                                        styles.billingText
                                    }
                                >
                                    My billing address is
                                    the same as my shipping
                                    address
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                {/* Apple Pay */}
                <Pressable
                    onPress={() =>
                        setPaymentMethod('applePay')
                    }
                    style={[
                        styles.applePay,
                        paymentMethod === 'applePay' &&
                            styles.applePaySelected,
                    ]}
                >
                    <View
                        style={[
                            styles.radio,
                            paymentMethod ===
                                'applePay' &&
                                styles.radioSelected,
                        ]}
                    >
                        {paymentMethod === 'applePay' && (
                            <View
                                style={
                                    styles.radioDot
                                }
                            />
                        )}
                    </View>

                    <Text style={styles.applePayText}>
                        Apple Pay
                    </Text>
                </Pressable>

                {/* Order information */}
                <View style={styles.orderInfo}>
                    <View>
                        <Text
                            style={
                                styles.orderInfoText
                            }
                        >
                            {quantity} × {ticketType}
                        </Text>

                        <Text
                            style={
                                styles.serviceFeeText
                            }
                        >
                            Service fee included
                        </Text>
                    </View>

                    <Text
                        style={styles.orderInfoPrice}
                    >
                        £{total.toFixed(2)}
                    </Text>
                </View>
            </ScrollView>

            {/* Footer */}
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
                    title={`Pay £${total.toFixed(2)}`}
                    variant="primary"
                    onPress={handlePay}
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

    spacer: {
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

    paymentCard: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
    },

    paymentCardSelected: {
        borderColor: COLORS.primaryMedium,
    },

    paymentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    radioSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
    },

    radioDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.background,
    },

    paymentTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
    },

    card: {
        minHeight: 74,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.sm,
        padding: SPACING.md,
        marginTop: SPACING.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cardSelected: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primaryLight,
    },

    cardContent: {
        flex: 1,
    },

    cardName: {
        ...TYPOGRAPHY.medium,
        fontSize: 12,
        color: COLORS.text,
        marginBottom: 4,
    },

    cardNumber: {
        ...TYPOGRAPHY.regular,
        fontSize: 10,
        color: COLORS.textSecondary,
    },

    addCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: SPACING.md,
    },

    plus: {
        fontSize: 20,
        color: COLORS.primary,
    },

    addCardText: {
        ...TYPOGRAPHY.medium,
        fontSize: 11,
        color: COLORS.primary,
    },

    newCardForm: {
        gap: SPACING.sm,
        paddingTop: SPACING.sm,
    },

    input: {
        height: 46,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.sm,
        paddingHorizontal: SPACING.md,
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.text,
        backgroundColor: COLORS.background,
    },

    inputRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },

    halfInput: {
        flex: 1,
    },

    billing: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingTop: SPACING.md,
    },

    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkboxEmpty: {
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    billingText: {
        flex: 1,
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        lineHeight: 16,
        color: COLORS.textSecondary,
    },

    applePay: {
        height: 52,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        marginTop: SPACING.md,
        paddingHorizontal: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    applePaySelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryLight,
    },

    applePayText: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.lg,
        paddingVertical: SPACING.sm,
    },

    orderInfoText: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        color: COLORS.textSecondary,
    },

    serviceFeeText: {
        ...TYPOGRAPHY.regular,
        fontSize: 9,
        color: COLORS.textSecondary,
        marginTop: 2,
    },

    orderInfoPrice: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 13,
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