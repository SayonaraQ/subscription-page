import { describe, expect, it } from 'vitest'

import { getBoardState } from './board-state'

const now = new Date('2026-11-27T12:00:00Z')
const at = (hours: number) => new Date(now.getTime() + hours * 3_600_000)

describe('getBoardState', () => {
    it('is active with more than three days left', () => {
        expect(getBoardState({ userStatus: 'ACTIVE', expiresAt: at(240) }, now)).toBe('active')
    })

    it('is expiring with three days or less left', () => {
        expect(getBoardState({ userStatus: 'ACTIVE', expiresAt: at(71) }, now)).toBe('expiring')
        expect(getBoardState({ userStatus: 'ACTIVE', expiresAt: at(72) }, now)).toBe('expiring')
    })

    it('is inactive once the date has passed even if the status is ACTIVE', () => {
        expect(getBoardState({ userStatus: 'ACTIVE', expiresAt: at(-1) }, now)).toBe('inactive')
    })

    it.each(['EXPIRED', 'DISABLED', 'LIMITED'])('is inactive for status %s', (userStatus) => {
        expect(getBoardState({ userStatus, expiresAt: at(240) }, now)).toBe('inactive')
    })

    it('is lifetime for the year 2099', () => {
        expect(
            getBoardState(
                { userStatus: 'ACTIVE', expiresAt: new Date('2099-01-01T00:00:00Z') },
                now
            )
        ).toBe('lifetime')
    })
})
