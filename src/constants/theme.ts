export const COLORS = {
  primary: '#6C5CE7',
  primaryLight: '#EEECFC',
  primaryMedium: '#C8C3F7',

  text: '#1F2024',
  textSecondary: '#71727A',

  background: '#FFFFFF',
  border: '#E8E9F1',
  card: '#f8f9fe',

  success: '#298267',
  error: '#ED3241',
} as const;

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
