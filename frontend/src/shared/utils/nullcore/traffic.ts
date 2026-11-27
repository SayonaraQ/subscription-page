import { nc } from './i18n'

export type TTrafficLevel = 'ok' | 'warn' | 'full'

const MIB = 1024 ** 2
const GIB = 1024 ** 3

function formatAmount(bytes: number, lang: string): { value: string; unit: string } {
    const gib = bytes / GIB
    const russian = lang === 'ru'

    if (gib < 0.1) {
        return { value: (bytes / MIB).toFixed(0), unit: russian ? 'МБ' : 'MB' }
    }

    const value = gib.toFixed(1).replace(/\.0$/, '')
    return {
        value: russian ? value.replace('.', ',') : value,
        unit: russian ? 'ГБ' : 'GB'
    }
}

export function formatTraffic(
    usedBytes: string,
    limitBytes: string,
    lang: string
): { text: string; percent: number | null; level: TTrafficLevel } {
    const used = Number(usedBytes)
    const limit = Number(limitBytes)
    const usedAmount = formatAmount(used, lang)
    const usedText = `${usedAmount.value} ${usedAmount.unit}`

    if (limit === 0) {
        return { text: `${usedText} · ${nc('unlimited', lang)}`, percent: null, level: 'ok' }
    }

    const limitAmount = formatAmount(limit, lang)
    const usedLabel = usedAmount.unit === limitAmount.unit ? usedAmount.value : usedText
    const percent = (used / limit) * 100
    const level = percent >= 100 ? 'full' : percent >= 90 ? 'warn' : 'ok'

    return {
        text: `${usedLabel} ${nc('of', lang)} ${limitAmount.value} ${limitAmount.unit}`,
        percent,
        level
    }
}
