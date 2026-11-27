const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24
const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR
const MS_PER_MINUTE = 60 * 1000

export function splitRemaining(
    expiresAt: Date,
    now: Date
): { days: number; hours: number; minutes: number } {
    const totalMinutes = Math.max(
        0,
        Math.floor((expiresAt.getTime() - now.getTime()) / MS_PER_MINUTE)
    )

    return {
        days: Math.floor(totalMinutes / MINUTES_PER_DAY),
        hours: Math.floor((totalMinutes % MINUTES_PER_DAY) / MINUTES_PER_HOUR),
        minutes: totalMinutes % MINUTES_PER_HOUR
    }
}
