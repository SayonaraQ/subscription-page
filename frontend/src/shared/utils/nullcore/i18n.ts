export type TNcKey =
    | 'subscription'
    | 'remaining'
    | 'until'
    | 'traffic'
    | 'of'
    | 'unlimited'
    | 'connect'
    | 'device'
    | 'deviceDetected'
    | 'app'
    | 'recommended'
    | 'notOpened'
    | 'qrCode'
    | 'help'

const translations = {
    subscription: { ru: 'Подписка', en: 'Subscription' },
    remaining: { ru: 'Осталось', en: 'Time left' },
    until: { ru: 'до {date}', en: 'until {date}' },
    traffic: { ru: 'Трафик', en: 'Traffic' },
    of: { ru: 'из', en: 'of' },
    unlimited: { ru: 'без лимита', en: 'unlimited' },
    connect: { ru: 'Подключение', en: 'Connect' },
    device: { ru: 'Устройство', en: 'Device' },
    deviceDetected: {
        ru: 'Устройство · определили автоматически',
        en: 'Device · detected automatically'
    },
    app: { ru: 'Приложение', en: 'App' },
    recommended: { ru: 'Рекомендуем', en: 'Recommended' },
    notOpened: { ru: 'Не открылось? Скопировать ссылку', en: "Didn't open? Copy link" },
    qrCode: { ru: 'QR-код', en: 'QR code' },
    help: { ru: 'Нужна помощь? Напишите нам', en: 'Need help? Message us' }
} satisfies Record<TNcKey, { ru: string; en: string }>

export const NC_KEYS: readonly TNcKey[] = Object.keys(translations) as TNcKey[]

const russianUnits = {
    days: ['день', 'дня', 'дней'],
    hours: ['час', 'часа', 'часов'],
    minutes: ['минута', 'минуты', 'минут']
} as const

const englishSingularUnits = {
    days: 'day',
    hours: 'hour',
    minutes: 'minute'
}

export function nc(key: TNcKey, lang: string, vars?: Record<string, string>): string {
    const template = translations[key][lang === 'ru' ? 'ru' : 'en']
    const date = vars?.date

    return date === undefined ? template : template.replace('{date}', () => date)
}

export function pluralUnit(unit: 'days' | 'hours' | 'minutes', n: number, lang: string): string {
    const count = Math.abs(n)
    if (lang !== 'ru') return count === 1 ? englishSingularUnits[unit] : unit

    const [one, few, many] = russianUnits[unit]
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return many
    if (lastDigit === 1) return one
    if (lastDigit >= 2 && lastDigit <= 4) return few

    return many
}

export function appMonogram(name: string): string {
    const [first, second] = name.trim().split(/\s+/, 2)
    const [initial = ''] = first

    if (second) {
        const [secondInitial] = second
        return (initial + secondInitial).toUpperCase()
    }

    const uppercase = first.match(/\p{Lu}/gu)
    if (uppercase && uppercase.length >= 2) return uppercase.slice(0, 2).join('')

    return initial.toUpperCase()
}
