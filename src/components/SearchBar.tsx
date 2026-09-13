import {
    Platform,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { COLORS, RADIUS, TYPOGRAPHY } from "../constants/theme";
import { Search } from "lucide-react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: 343,
        height: 44,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.card,
        paddingHorizontal: 16,
        gap: 16,
    },

    input: {
        ...TYPOGRAPHY.regular,
        fontSize: 14,
        flex: 1,
        padding: 0,

        ...Platform.select({
            ios: {
                paddingTop: 1,
            },
            android: {
                textAlignVertical: "center",
            },
        }),
    },
});

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
}

export default function SearchBar({
    value,
    onChangeText,
}: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Search />

            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder="Search..."
                placeholderTextColor={COLORS.textSecondary}
            />
        </View>
    );
}