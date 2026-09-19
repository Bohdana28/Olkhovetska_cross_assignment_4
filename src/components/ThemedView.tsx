import {
    StyleSheet,
    View,
    type ViewProps,
} from 'react-native';

import type { ReactNode } from 'react';

import { useTheme } from '../context/ThemeContext';

interface ThemedViewProps extends ViewProps {
    children: ReactNode;
}

export default function ThemedView({
    children,
    style,
    ...props
}: ThemedViewProps) {
    const { colors } = useTheme();

    return (
        <View
            {...props}
            style={[
                styles.container,
                {
                    backgroundColor:
                        colors.background,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});