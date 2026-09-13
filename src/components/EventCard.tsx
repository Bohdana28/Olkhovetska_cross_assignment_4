import {
    Image,
    Text,
    View,
    ImageSourcePropType,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../constants/theme";
import CustomButton from "./CustomButton";

const styles = StyleSheet.create({
    card: {
        position: "relative",
        height: 245,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.card,
    },

    imageCard: {
        height: 120,
        borderTopLeftRadius: RADIUS.md,
        borderTopRightRadius: RADIUS.md,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 4,
    },

    location: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.12,
        color: COLORS.textSecondary,
    },

    date: {
        position: "absolute",
        top: 10,
        right: 10,
        borderRadius: RADIUS.sm,
        backgroundColor: COLORS.primary,
        color: COLORS.background,
        width: 61,
        height: 24,
        ...TYPOGRAPHY.semiBold,
        fontSize: 10,
        letterSpacing: 0.5,
        textAlign: "center",
        textTransform: "uppercase",
        paddingVertical: 6,
    },

    cardButton: {
        height: 40,
        marginTop: SPACING.md,
    },

    content: {
        padding: SPACING.md,
    },
});

interface EventCardProps {
    title: string;
    imageUrl: ImageSourcePropType;
    date: string;
    location: string;
}

export default function EventCard({
    title,
    imageUrl,
    date,
    location,
}: EventCardProps) {
    const { width } = useWindowDimensions();

    const cardWidth = Math.min(250, width - SPACING.lg * 2);

    return (
        <View style={[styles.card, { width: cardWidth }]}>
            <Image
                style={[styles.imageCard, { width: cardWidth }]}
                source={imageUrl}
            />

            <Text style={styles.date}>{date}</Text>

            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.location}>{location}</Text>

                <CustomButton
                    style={{
                        ...styles.cardButton,
                        width: cardWidth - SPACING.md * 2,
                    }}
                    title="View event"
                    variant="secondary"
                    onPress={() => alert("Secondary")}
                />
            </View>
        </View>
    );
}