import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

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
    const { theme, colors, toggleTheme } = useTheme();

    const styles = createStyles(colors);

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

                    <View style={styles.item}>
                        <Text style={styles.itemText}>
                            Dark mode
                        </Text>

                        <Pressable
                            accessibilityRole="switch"
                            accessibilityState={{
                                checked: theme === 'dark',
                            }}
                            onPress={toggleTheme}
                            style={[
                                styles.switch,
                                theme === 'dark' &&
                                    styles.switchActive,
                            ]}
                        >
                            <View
                                style={[
                                    styles.switchThumb,
                                    theme === 'dark' &&
                                        styles.switchThumbActive,
                                ]}
                            />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const createStyles = (colors: {
    primary: string;
    primaryLight: string;
    primaryMedium: string;
    text: string;
    textSecondary: string;
    background: string;
    border: string;
    card: string;
    success: string;
    error: string;
}) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },

        content: {
            padding: SPACING.lg,
            gap: SPACING.lg,
        },

        title: {
            ...TYPOGRAPHY.bold,
            fontSize: 22,
            color: colors.text,
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
            backgroundColor: colors.primaryLight,
            alignItems: 'center',
            justifyContent: 'center',
        },

        avatarText: {
            ...TYPOGRAPHY.bold,
            fontSize: 20,
            color: colors.primary,
        },

        name: {
            ...TYPOGRAPHY.semiBold,
            fontSize: 14,
            color: colors.text,
        },

        email: {
            ...TYPOGRAPHY.regular,
            fontSize: 11,
            color: colors.textSecondary,
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
            borderBottomColor: colors.border,
        },

        itemText: {
            ...TYPOGRAPHY.regular,
            fontSize: 13,
            color: colors.text,
        },

        arrow: {
            fontSize: 22,
            color: colors.textSecondary,
        },

        switch: {
            width: 44,
            height: 24,
            borderRadius: 12,
            backgroundColor: colors.border,
            justifyContent: 'center',
            paddingHorizontal: 3,
        },

        switchActive: {
            backgroundColor: colors.primary,
        },

        switchThumb: {
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: colors.background,
        },

        switchThumbActive: {
            alignSelf: 'flex-end',
        },
    });