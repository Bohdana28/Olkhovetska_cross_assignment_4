import {
    Image,
    Text,
    View,
    ImageSourcePropType,
    StyleSheet,
    Pressable,
} from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { COLORS, RADIUS, TYPOGRAPHY } from "../constants/theme";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: 327,
        height: 171,
        padding: 8,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.background,
    },

    image: {
        width: 90,
        height: 100,
        borderRadius: RADIUS.md,
    },

    content: {
        flex: 1,
        height: "100%",
        marginLeft: 10,
        justifyContent: "center",
    },

    title: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
        marginBottom: 2,
    },

    info: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.12,
        color: COLORS.textSecondary,
    },

    ticketType: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        lineHeight: 16,
        color: COLORS.textSecondary,
        marginTop: 10,
    },

    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 4,
    },

    quantity: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    quantityButton: {
        width: 24,
        height: 24,
        borderRadius: 26,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },

    quantityText: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.text,
    },

    price: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,
        color: COLORS.text,
    },
});

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
    return (
        <View style={styles.container}>
            <Image source={imageUrl} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.info}>{date}</Text>
                <Text style={styles.info}>{location}</Text>

                <Text style={styles.ticketType}>{ticketType}</Text>

                <View style={styles.bottomRow}>
                    <View style={styles.quantity}>
                        <Pressable
                            style={styles.quantityButton}
                            onPress={() =>
                                onQuantityChange(Math.max(1, quantity - 1))
                            }
                        >
                            <Minus size={12} color={COLORS.primary} />
                        </Pressable>

                        <Text style={styles.quantityText}>{quantity}</Text>

                        <Pressable
                            style={styles.quantityButton}
                            onPress={() =>
                                onQuantityChange(quantity + 1)
                            }
                        >
                            <Plus size={12} color={COLORS.primary} />
                        </Pressable>
                    </View>

                    <Text style={styles.price}>£{price}</Text>
                </View>
            </View>
        </View>
    );
}