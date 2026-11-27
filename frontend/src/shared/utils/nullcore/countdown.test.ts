import { describe, expect, it } from 'vitest'

import { splitRemaining } from './countdown'

describe('splitRemaining', () => {
    it('splits the time left into days, hours and minutes', () => {
        expect(
            splitRemaining(new Date('2027-02-27T00:00:00Z'), new Date('2026-11-27T19:43:00Z'))
        ).toEqual({ days: 91, hours: 4, minutes: 17 })
    })

    it('never goes negative after expiry', () => {
        expect(
            splitRemaining(new Date('2026-11-01T00:00:00Z'), new Date('2026-11-27T00:00:00Z'))
        ).toEqual({ days: 0, hours: 0, minutes: 0 })
    })
})
