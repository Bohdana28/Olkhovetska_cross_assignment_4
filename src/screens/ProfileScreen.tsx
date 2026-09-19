import {
    ScrollView,
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

const profileItems = [
    'My bookings',
    'Saved events',
    'Personal information',
    'Notifications',
    'Language',
    'Privacy & Security',
];

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                },
            ]}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingBottom:
                            insets.bottom + SPACING.lg,
                    },
                ]}
            >
                <Text style={styles.title}>
                    Profile
                </Text>

                <View style={styles.profile}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            B
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.name}>
                            Bohdana
                        </Text>

                        <Text style={styles.email}>
                            Evently user
                        </Text>
                    </View>
                </View>

                <View style={styles.list}>
                    {profileItems.map(item => (
                        <View
                            key={item}
                            style={styles.item}
                        >
                            <Text style={styles.itemText}>
                                {item}
                            </Text>

                            <Text style={styles.arrow}>
                                ›
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
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
        gap: SPACING.lg,
    },

    title: {
        ...TYPOGRAPHY.bold,
        fontSize: 22,
        color: COLORS.text,
    },

    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },

    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        ...TYPOGRAPHY.bold,
        fontSize: 20,
        color: COLORS.primary,
    },

    name: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 14,
        color: COLORS.text,
    },

    email: {
        ...TYPOGRAPHY.regular,
        fontSize: 11,
        color: COLORS.textSecondary,
    },

    list: {
        gap: 4,
    },

    item: {
        minHeight: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    itemText: {
        ...TYPOGRAPHY.regular,
        fontSize: 13,
        color: COLORS.text,
    },

    arrow: {
        fontSize: 22,
        color: COLORS.textSecondary,
    },
});