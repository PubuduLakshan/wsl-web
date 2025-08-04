// Theme configuration for Wild Sri Lanka website
export const theme = {
  colors: {
    primary: {
      50: '#fef7e6',
      100: '#fdecc3',
      200: '#fbd98a',
      300: '#f8c04d',
      400: '#f5a623',
      500: '#F0A641', // Main primary color
      600: '#d8942e',
      700: '#b37425',
      800: '#8f5c1f',
      900: '#744a1c',
    },
    secondary: {
      50: '#f8f6f2',
      100: '#f0ede4',
      200: '#e1d9c8',
      300: '#c9bba0',
      400: '#b09a7a',
      500: '#9a7f5f',
      600: '#8a6f4f',
      700: '#725a42',
      800: '#5e4a37',
      900: '#4d3e2f',
    },
    accent: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  }
}

// CSS Custom Properties for easy usage
export const cssVariables = {
  '--color-primary-50': theme.colors.primary[50],
  '--color-primary-100': theme.colors.primary[100],
  '--color-primary-200': theme.colors.primary[200],
  '--color-primary-300': theme.colors.primary[300],
  '--color-primary-400': theme.colors.primary[400],
  '--color-primary-500': theme.colors.primary[500],
  '--color-primary-600': theme.colors.primary[600],
  '--color-primary-700': theme.colors.primary[700],
  '--color-primary-800': theme.colors.primary[800],
  '--color-primary-900': theme.colors.primary[900],
  
  '--color-secondary-50': theme.colors.secondary[50],
  '--color-secondary-100': theme.colors.secondary[100],
  '--color-secondary-200': theme.colors.secondary[200],
  '--color-secondary-300': theme.colors.secondary[300],
  '--color-secondary-400': theme.colors.secondary[400],
  '--color-secondary-500': theme.colors.secondary[500],
  '--color-secondary-600': theme.colors.secondary[600],
  '--color-secondary-700': theme.colors.secondary[700],
  '--color-secondary-800': theme.colors.secondary[800],
  '--color-secondary-900': theme.colors.secondary[900],
  
  '--color-accent-50': theme.colors.accent[50],
  '--color-accent-100': theme.colors.accent[100],
  '--color-accent-200': theme.colors.accent[200],
  '--color-accent-300': theme.colors.accent[300],
  '--color-accent-400': theme.colors.accent[400],
  '--color-accent-500': theme.colors.accent[500],
  '--color-accent-600': theme.colors.accent[600],
  '--color-accent-700': theme.colors.accent[700],
  '--color-accent-800': theme.colors.accent[800],
  '--color-accent-900': theme.colors.accent[900],
}

// Utility functions for theme usage
export const getThemeColor = (color: string, shade: number = 500) => {
  const colorMap: Record<string, Record<number, string>> = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    accent: theme.colors.accent,
    neutral: theme.colors.neutral,
  }
  return colorMap[color]?.[shade] || theme.colors.primary[500]
}

export const getThemeSpacing = (size: string) => {
  return theme.spacing[size as keyof typeof theme.spacing] || theme.spacing.md
}

export const getThemeBorderRadius = (size: string) => {
  return theme.borderRadius[size as keyof typeof theme.borderRadius] || theme.borderRadius.md
} 