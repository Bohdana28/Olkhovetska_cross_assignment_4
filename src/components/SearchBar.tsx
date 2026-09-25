import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

import Search from 'lucide-react-native/icons/search';

import {
    COLORS,
    TYPOGRAPHY,
} from '../constants/theme';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onSubmitEditing?: () => void;
}

export default function SearchBar({
    value,
    onChangeText,
    placeholder = 'Search events',
    onSubmitEditing,
}: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Search
                size={20}
                color={COLORS.textSecondary}
            />

            <TextInput
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                placeholder={placeholder}
                placeholderTextColor={
                    COLORS.textSecondary
                }
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="search"
                keyboardAppearance="light"
                selectionColor={COLORS.primary}
                textContentType="none"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderRadius: 24,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    input: {
        flex: 1,
        marginLeft: 12,
        paddingVertical: 0,
        ...TYPOGRAPHY.regular,
        fontSize: 12,
        color: COLORS.text,
    },
});