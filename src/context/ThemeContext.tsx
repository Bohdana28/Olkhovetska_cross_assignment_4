import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import {
    DARK_COLORS,
    LIGHT_COLORS,
} from '../constants/theme';

type ThemeMode = 'light' | 'dark';

type ThemeColors =
    | typeof LIGHT_COLORS
    | typeof DARK_COLORS;

interface ThemeContextValue {
    theme: ThemeMode;
    colors: ThemeColors;
    toggleTheme: () => void;
}

const ThemeContext =
    createContext<
        ThemeContextValue | undefined
    >(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [theme, setTheme] =
        useState<ThemeMode>('light');

    const toggleTheme = () => {
        setTheme(currentTheme =>
            currentTheme === 'light'
                ? 'dark'
                : 'light',
        );
    };

    const colors =
        theme === 'light'
            ? LIGHT_COLORS
            : DARK_COLORS;

    const value = useMemo(
        () => ({
            theme,
            colors,
            toggleTheme,
        }),
        [theme, colors],
    );

    return (
        <ThemeContext.Provider
            value={value}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context =
        useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'useTheme must be used inside ThemeProvider',
        );
    }

    return context;
}