export type TBoardState = 'active' | 'expiring' | 'inactive' | 'lifetime'

const EXPIRING_THRESHOLD_MS = 72 * 60 * 60 * 1000

export function getBoardState(
    user: { userStatus: string; expiresAt: Date },
    now: Date
): TBoardState {
    if (user.userStatus !== 'ACTIVE') return 'inactive'
    if (user.expiresAt.getUTCFullYear() === 2099) return 'lifetime'

    const remaining = user.expiresAt.getTime() - now.getTime()
    if (remaining <= 0) return 'inactive'

    return remaining <= EXPIRING_THRESHOLD_MS ? 'expiring' : 'active'
}
