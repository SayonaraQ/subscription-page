import { describe, expect, it } from 'vitest'

import { appMonogram, nc, NC_KEYS, pluralUnit } from './i18n'

describe('nc', () => {
    it('returns Russian and falls back to English for other languages', () => {
        expect(nc('remaining', 'ru')).toBe('Осталось')
        expect(nc('remaining', 'fa')).toBe('Time left')
    })

    it('substitutes the date', () => {
        expect(nc('until', 'ru', { date: '27 февраля 2027' })).toBe('до 27 февраля 2027')
    })

    it('never mentions VPN', () => {
        for (const key of NC_KEYS) {
            for (const lang of ['ru', 'en']) {
                expect(nc(key, lang)).not.toMatch(/vpn|впн/i)
            }
        }
    })
})

describe('pluralUnit', () => {
    it.each([
        [1, 'день'],
        [2, 'дня'],
        [5, 'дней'],
        [11, 'дней'],
        [21, 'день'],
        [92, 'дня'],
        [112, 'дней']
    ])('ru days %i → %s', (n, word) => {
        expect(pluralUnit('days', n, 'ru')).toBe(word)
    })

    it('ru hours and minutes', () => {
        expect(pluralUnit('hours', 1, 'ru')).toBe('час')
        expect(pluralUnit('hours', 4, 'ru')).toBe('часа')
        expect(pluralUnit('hours', 17, 'ru')).toBe('часов')
        expect(pluralUnit('minutes', 3, 'ru')).toBe('минуты')
        expect(pluralUnit('minutes', 17, 'ru')).toBe('минут')
        expect(pluralUnit('minutes', 21, 'ru')).toBe('минута')
    })

    it('en singular and plural', () => {
        expect(pluralUnit('days', 1, 'en')).toBe('day')
        expect(pluralUnit('days', 2, 'en')).toBe('days')
    })
})

describe('appMonogram', () => {
    it.each([
        ['INCY', 'IN'],
        ['OneXray', 'OX'],
        ['Happ', 'H'],
        ['Koala Clash', 'KC']
    ])('%s → %s', (name, mono) => {
        expect(appMonogram(name)).toBe(mono)
    })
})
