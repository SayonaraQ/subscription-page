import { describe, expect, it } from 'vitest'

import { formatTraffic } from './traffic'

const LIMIT = '80530636800' // 75 GiB

describe('formatTraffic', () => {
    it('formats used of limit in GB with a decimal comma for ru', () => {
        const r = formatTraffic('644403200', LIMIT, 'ru')
        expect(r.text).toBe('0,6 из 75 ГБ')
        expect(r.percent).toBeCloseTo(0.8, 1)
        expect(r.level).toBe('ok')
    })

    it('uses a decimal point and English words for en', () => {
        expect(formatTraffic('644403200', LIMIT, 'en').text).toBe('0.6 of 75 GB')
    })

    it('shows small amounts in whole MB', () => {
        expect(formatTraffic('52428800', LIMIT, 'ru').text).toBe('50 МБ из 75 ГБ')
        expect(formatTraffic('0', LIMIT, 'ru').text).toBe('0 МБ из 75 ГБ')
    })

    it('marks a zero limit as unlimited with no percent', () => {
        expect(formatTraffic('644403200', '0', 'ru')).toEqual({
            text: '0,6 ГБ · без лимита',
            percent: null,
            level: 'ok'
        })
        expect(formatTraffic('644403200', '0', 'en').text).toBe('0.6 GB · unlimited')
    })

    it('warns from 90 percent and is full at 100 percent', () => {
        expect(formatTraffic('72477573120', LIMIT, 'ru').level).toBe('warn')
        expect(formatTraffic('80530636800', LIMIT, 'ru').level).toBe('full')
    })
})
