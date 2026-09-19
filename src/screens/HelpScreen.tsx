import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    COLORS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

export default function HelpScreen() {
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
                    Help
                </Text>

                <Text style={styles.text}>
                    Find answers to common questions about events,
                    bookings and your Evently account.
                </Text>
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
});