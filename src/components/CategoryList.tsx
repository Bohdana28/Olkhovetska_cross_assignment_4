import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { COLORS, RADIUS, TYPOGRAPHY } from "../constants/theme";


const categoryBase = {
    height: 24,
    paddingHorizontal: 8,
    borderRadius: RADIUS.sm,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 8,
};

const styles = StyleSheet.create({
    category: {
        ...categoryBase,
        backgroundColor: COLORS.primaryLight,
    },

    selected: {
        ...categoryBase,
        backgroundColor: COLORS.primary,
    },

    text: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 10,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        color: COLORS.primary,
    },

    selectedText: {
        color: COLORS.background,
    },
});

interface CategoryListProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;

}


export default function CategoryList({
    categories,
    selectedCategory,
    onSelectCategory
}: CategoryListProps) {
    return (
        <ScrollView horizontal>
            {categories.map((category) => (
                <Pressable
                    key={category}
                    onPress={() => onSelectCategory(category)}
                    style={
                        category === selectedCategory
                            ? styles.selected
                            : styles.category
                    }
                >
                    <Text
                        style={
                            category === selectedCategory
                                ? [styles.text, styles.selectedText]
                                : styles.text
                        }
                    >
                        {category}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}