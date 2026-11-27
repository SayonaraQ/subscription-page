const violet: [number, number, number] = [147, 51, 234]
const success: [number, number, number] = [34, 197, 94]
const warning: [number, number, number] = [245, 158, 11]

const COLORS: Record<string, [number, number, number]> = {
    teal: success,
    green: success,
    lime: [130, 201, 30],
    yellow: warning,
    orange: warning,
    red: [239, 68, 68],
    pink: [230, 73, 128],
    grape: [190, 75, 219],
    violet,
    indigo: [92, 124, 250],
    blue: violet,
    gray: [178, 167, 198],
    dark: [58, 47, 77]
}

export const getIconColor = (color: string): string =>
    Object.hasOwn(COLORS, color) || color.startsWith('#') ? color : 'violet'

const hexToRgb = (hex: string): [number, number, number] | null => {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return match ? [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)] : null
}

const getRgb = (color: string): [number, number, number] =>
    COLORS[color] ?? hexToRgb(color) ?? violet

export interface ColorGradientStyle {
    background: string
    border: string
    boxShadow?: string
}

export const getColorGradient = (color: string): ColorGradientStyle => {
    const [r, g, b] = getRgb(color)
    return {
        background: `linear-gradient(135deg, rgba(${r},${g},${b},0.15) 0%, rgba(${r},${g},${b},0.08) 100%)`,
        border: `1px solid rgba(${r},${g},${b},0.3)`
    }
}

export const getColorGradientSolid = (color: string): ColorGradientStyle => {
    const [r, g, b] = getRgb(color)
    const dark1 = [22 + r * 0.08, 13 + g * 0.08, 35 + b * 0.08].map(Math.floor)
    const dark2 = [14 + r * 0.05, 8 + g * 0.05, 24 + b * 0.05].map(Math.floor)

    return {
        background: `linear-gradient(135deg, rgb(${dark1}) 0%, rgb(${dark2}) 100%)`,
        border: `1px solid rgba(${r},${g},${b},0.4)`,
        boxShadow: `inset 0 0 20px rgba(${r},${g},${b},0.15)`
    }
}
