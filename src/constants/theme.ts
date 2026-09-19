export const LIGHT_COLORS = {
    primary: '#6C5CE7',
    primaryLight: '#EEECFC',
    primaryMedium: '#C8C3F7',

    text: '#1F2024',
    textSecondary: '#71727A',

    background: '#FFFFFF',
    border: '#E8E9F1',
    card: '#F8F9FE',

    success: '#298267',
    error: '#ED3241',
} as const;

export const DARK_COLORS = {
    primary: '#8B80F5',
    primaryLight: '#302B5C',
    primaryMedium: '#5149A0',

    text: '#F5F5F7',
    textSecondary: '#A7A8B0',

    background: '#15151A',
    border: '#303039',
    card: '#202027',

    success: '#4CAF8A',
    error: '#FF6670',
} as const;

// Keeps the existing light theme for components
// that have not yet been connected to ThemeContext.
export const COLORS = LIGHT_COLORS;

export const TYPOGRAPHY = {
    regular: {
        fontFamily: 'Inter 18pt',
        fontWeight: '400',
    },

    medium: {
        fontFamily: 'Inter 18pt',
        fontWeight: '500',
    },

    semiBold: {
        fontFamily: 'Inter 18pt',
        fontWeight: '600',
    },

    bold: {
        fontFamily: 'Inter 18pt',
        fontWeight: '700',
    },
} as const;

export const SPACING = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
} as const;

export const RADIUS = {
    sm: 12,
    md: 16,
    lg: 24,
} as const;

export const SERVICE_FEE = 2.5;