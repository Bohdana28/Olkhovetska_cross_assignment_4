import { StyleSheet, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import {
    COLORS,
    RADIUS,
    SPACING,
    TYPOGRAPHY,
} from '../constants/theme';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    value,
    onChangeText,
    placeholder = 'Search events',
}: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Search
                size={18}
                color={COLORS.textSecondary}
            />

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textSecondary}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                textContentType="none"
                returnKeyType="search"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    input: {
        flex: 1,
        marginLeft: SPACING.sm,
        paddingVertical: 0,
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.text,
    },
});