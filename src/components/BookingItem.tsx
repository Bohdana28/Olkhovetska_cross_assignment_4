import {
    Image,
    Text,
    View,
    ImageSourcePropType,
    StyleSheet,
    Pressable,
    useWindowDimensions,
} from 'react-native';

import { useEffect } from 'react';

import Minus from 'lucide-react-native/icons/minus';
import Plus from 'lucide-react-native/icons/plus';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

import {
    COLORS,
    RADIUS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

interface BookingItemProps {
    title: string;
    imageUrl: ImageSourcePropType;
    date: string;
    location: string;
    ticketType: string;
    quantity: number;
    price: number;
    onQuantityChange: (quantity: number) => void;
}

export default function BookingItem({
    title,
    imageUrl,
    date,
    location,
    ticketType,
    quantity,
    price,
    onQuantityChange,
}: BookingItemProps) {
    const { width } = useWindowDimensions();

    const quantityScale = useSharedValue(1);

    useEffect(() => {
    quantityScale.value = withSequence(
        withTiming(1.15, {
            duration: 100,
        }),
        withSpring(1, {
            damping: 10,
            stiffness: 200,
        }),
    );
}, [quantityScale, quantity]);

    const quantityAnimatedStyle =
        useAnimatedStyle(() => ({
            transform: [
                {
                    scale: quantityScale.value,
                },
            ],
        }));

    const containerWidth = Math.min(
        327,
        width - SPACING.lg * 2,
    );

    const decreaseQuantity = () => {
        onQuantityChange(quantity - 1);
    };

    const increaseQuantity = () => {
        onQuantityChange(quantity + 1);
    };

    return (
        <View
            style={[
                styles.container,
                {
                    width: containerWidth,
                },
            ]}
        >
            <Image
                source={imageUrl}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text
                    style={styles.title}
                    numberOfLines={1}
                >
                    {title}
                </Text>

                <Text style={styles.info}>
                    {date}
                </Text>

                <Text style={styles.info}>
                    {location}
                </Text>

                <Text style={styles.ticketLabel}>
                    Ticket
                </Text>

                <Text style={styles.ticketType}>
                    {ticketType}
                </Text>

                <View style={styles.bottomRow}>
                    <View style={styles.quantity}>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel={
                                quantity > 1
                                    ? 'Decrease ticket quantity'
                                    : 'Cancel booking'
                            }
                            style={[
                                styles.quantityButton,
                                quantity === 1 &&
                                    styles.cancelButton,
                            ]}
                            onPress={decreaseQuantity}
                        >
                            {quantity === 1 ? (
                                <Text
                                    style={
                                        styles.cancelText
                                    }
                                >
                                    Cancel
                                </Text>
                            ) : (
                                <Minus
                                    size={12}
                                    color={
                                        COLORS.primary
                                    }
                                />
                            )}
                        </Pressable>

                        <Animated.Text
                            style={[
                                styles.quantityText,
                                quantityAnimatedStyle,
                            ]}
                        >
                            {quantity}
                        </Animated.Text>

                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Increase ticket quantity"
                            style={
                                styles.quantityButton
                            }
                            onPress={
                                increaseQuantity
                            }
                        >
                            <Plus
                                size={12}
                                color={
                                    COLORS.primary
                                }
                            />
                        </Pressable>
                    </View>

                    <Text style={styles.price}>
                        £{price}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 171,
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.sm,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    image: {
        width: 90,
        height: 100,
        borderRadius: RADIUS.md,
    },

    content: {
        flex: 1,
        height: '100%',
        marginLeft: SPACING.sm,
        justifyContent: 'center',
    },

    title: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
        marginBottom: 2,
    },

    info: {
        ...TYPOGRAPHY.regular,
        fontSize: 10,
        lineHeight: 14,
        color: COLORS.textSecondary,
    },

    ticketLabel: {
        ...TYPOGRAPHY.regular,
        fontSize: 10,
        color: COLORS.textSecondary,
        marginTop: 8,
    },

    ticketType: {
        ...TYPOGRAPHY.regular,
        fontSize: 10,
        lineHeight: 14,
        color: COLORS.textSecondary,
    },

    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
    },

    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    quantityButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelButton: {
        width: 58,
        borderRadius: 12,
    },

    cancelText: {
        ...TYPOGRAPHY.medium,
        fontSize: 9,
        color: COLORS.primary,
    },

    quantityText: {
        ...TYPOGRAPHY.regular,
        minWidth: 12,
        fontSize: 12,
        color: COLORS.text,
        textAlign: 'center',
    },

    price: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
    },
});