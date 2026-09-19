import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../constants/theme';
import CustomButton from './CustomButton';

interface EventCardProps {
    title: string;
    imageUrl: ImageSourcePropType;
    date: string;
    location: string;
    onPress: () => void;
}

export default function EventCard({
    title,
    imageUrl,
    date,
    location,
    onPress,
}: EventCardProps) {
    const { width } = useWindowDimensions();

    const cardWidth = Math.min(
        250,
        width - SPACING.lg * 2,
    );

    return (
        <View
            style={[
                styles.card,
                {
                    width: cardWidth,
                },
            ]}
        >
            <Image
                source={imageUrl}
                style={[
                    styles.imageCard,
                    {
                        width: cardWidth,
                    },
                ]}
            />

            <Text style={styles.date}>
                {date}
            </Text>

            <View style={styles.content}>
                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.location}>
                    {location}
                </Text>

                <CustomButton
                    title="View details"
                    variant="secondary"
                    onPress={onPress}
                    style={{
                        ...styles.cardButton,
                        width:
                            cardWidth -
                            SPACING.md * 2,
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        height: 245,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.card,
        overflow: 'hidden',
    },

    imageCard: {
        height: 120,
    },

    date: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 61,
        height: 24,
        paddingVertical: 6,
        borderRadius: RADIUS.sm,
        backgroundColor: COLORS.primary,
        color: COLORS.background,
        ...TYPOGRAPHY.semiBold,
        fontSize: 10,
        letterSpacing: 0.5,
        textAlign: 'center',
        textTransform: 'uppercase',
    },

    content: {
        padding: SPACING.md,
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

    cardButton: {
        height: 40,
        marginTop: SPACING.md,
    },
});