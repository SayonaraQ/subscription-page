import {
    createTheme,
    CSSVariablesResolver,
    v8CssVariablesResolver,
    virtualColor
} from '@mantine/core'

import components from './overrides'

const fontFamily = 'Manrope, Apple Color Emoji, Twemoji Country Flags, sans-serif'

export const cssVariablesResolver: CSSVariablesResolver = (theme) => {
    const variables = v8CssVariablesResolver(theme)

    return {
        ...variables,
        dark: {
            ...variables.dark,
            '--mantine-color-body': 'var(--nc-bg)',
            '--mantine-color-success': 'var(--nc-success)',
            '--mantine-color-error': 'var(--nc-error)'
        }
    }
}

export const theme = createTheme({
    components,
    cursorType: 'pointer',
    fontFamily,
    fontFamilyMonospace: 'Fira Mono, monospace',
    breakpoints: {
        xs: '25em',
        sm: '30em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        '3xl': '120em',
        '4xl': '160em'
    },
    scale: 1,
    fontSmoothing: true,
    focusRing: 'never',
    white: '#F5F0FF',
    black: '#07040C',
    colors: {
        dark: [
            '#F5F0FF',
            '#DCD3EA',
            '#B2A7C6',
            '#8E83A3',
            '#6E6383',
            '#3A2F4D',
            '#241834',
            '#160D23',
            '#0E0818',
            '#07040C'
        ],
        violet: [
            '#F7F3FC',
            '#F1E9F9',
            '#E0C5F9',
            '#CA9DF5',
            '#B06CF0',
            '#9333EA',
            '#7B17D8',
            '#6212AE',
            '#4A0E83',
            '#340A5C'
        ],
        green: [
            '#F0FDF4',
            '#DCFCE7',
            '#BBF7D0',
            '#86EFAC',
            '#4ADE80',
            '#22C55E',
            '#16A34A',
            '#15803D',
            '#166534',
            '#14532D'
        ],
        yellow: [
            '#FFFBEB',
            '#FEF3C7',
            '#FDE68A',
            '#FCD34D',
            '#FBBF24',
            '#F59E0B',
            '#D97706',
            '#B45309',
            '#92400E',
            '#78350F'
        ],
        red: [
            '#FEF2F2',
            '#FEE2E2',
            '#FECACA',
            '#FCA5A5',
            '#F87171',
            '#EF4444',
            '#DC2626',
            '#B91C1C',
            '#991B1B',
            '#7F1D1D'
        ],
        blue: virtualColor({ name: 'blue', dark: 'violet', light: 'violet' }),
        teal: virtualColor({ name: 'teal', dark: 'green', light: 'green' }),
        orange: virtualColor({ name: 'orange', dark: 'yellow', light: 'yellow' })
    },
    primaryShade: 5,
    primaryColor: 'violet',
    autoContrast: true,
    luminanceThreshold: 0.3,
    headings: {
        fontFamily,
        fontWeight: '800'
    },
    defaultRadius: 'md'
})
