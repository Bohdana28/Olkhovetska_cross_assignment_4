import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    COLORS,
    RADIUS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

export default function ContactScreen() {
    const insets = useSafeAreaInsets();

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
                <Text style={styles.title}>
                    Contact us
                </Text>

                <Text style={styles.text}>
                    Need help with your booking? Our support team
                    is here to help.
                </Text>

                <View style={styles.card}>
                    <Text style={styles.label}>
                        Email
                    </Text>

                    <Text style={styles.value}>
                        support@evently.app
                    </Text>
                </View>
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
        padding: SPACING.lg,
        gap: SPACING.md,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 22,
        color: COLORS.text,
    },

    text: {
        ...TYPOGRAPHY.regular,
        fontSize: 13,
        lineHeight: 20,
        color: COLORS.textSecondary,
    },

    card: {
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.primaryLight,
    },

    label: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 10,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },

    value: {
        ...TYPOGRAPHY.medium,
        fontSize: 13,
        color: COLORS.primary,
    },
});