import { View, Text, StyleSheet } from "react-native";
import { TYPOGRAPHY, COLORS } from "../constants/theme";

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },

    title: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 14,
        color: COLORS.text,
    },

    price: {
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    section: {
        gap: 6,
    },

    sectionTitle: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 9,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color: COLORS.textSecondary,
    },

    description: {
        ...TYPOGRAPHY.regular,
        fontSize: 10,
        lineHeight: 14,
        color: COLORS.textSecondary,
    },

    detail: {
        gap: 2,
    },

    detailLabel: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 8,
        textTransform: "uppercase",
        color: COLORS.textSecondary,
    },

    detailValue: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 9,
        color: COLORS.text,
    },
});

interface EventInfoProps {
    title: string;
    price: number;
    description: string;
    time: string;
    location: string;
    date: string;
}

export default function EventInfo({
    title,
    price,
    description,
    time,
    location,
    date,
}: EventInfoProps) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>From £{price}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.description}>{description}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Event details</Text>

                <View style={styles.detail}>
                    <Text style={styles.detailLabel}>Time</Text>
                    <Text style={styles.detailValue}>{time}</Text>
                </View>

                <View style={styles.detail}>
                    <Text style={styles.detailLabel}>Location</Text>
                    <Text style={styles.detailValue}>{location}</Text>
                </View>

                <View style={styles.detail}>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>{date}</Text>
                </View>
            </View>
        </View>
    );
}