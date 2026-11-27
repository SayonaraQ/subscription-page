import { useEffect, useState } from 'react'

import { useTranslation } from '@shared/hooks'
import { formatDate } from '@shared/utils/config-parser'
import {
    formatTraffic,
    getBoardState,
    nc,
    pluralUnit,
    splitRemaining
} from '@shared/utils/nullcore'

import { useSubscription } from '@entities/subscription-info-store'

import classes from './subscription-board.module.css'

const countdownUnits = ['days', 'hours', 'minutes'] as const

export const SubscriptionBoardWidget = () => {
    const { user } = useSubscription()
    const { t, currentLang: lang, baseTranslations } = useTranslation()
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const interval = window.setInterval(() => setNow(new Date()), 60_000)
        return () => window.clearInterval(interval)
    }, [])

    // The subscription is loaded from JSON, where dates are ISO strings.
    const expiresAt = new Date(user.expiresAt)
    const state = getBoardState({ userStatus: user.userStatus, expiresAt }, now)
    const inactiveLabel = expiresAt <= now ? baseTranslations.expired : baseTranslations.inactive
    const statusLabel = t(state === 'inactive' ? inactiveLabel : baseTranslations.active)
    const remaining = splitRemaining(expiresAt, now)
    const {
        text: trafficText,
        percent,
        level
    } = formatTraffic(user.trafficUsedBytes, user.trafficLimitBytes, lang)
    const trafficWidth =
        percent !== null && percent > 0 ? Math.min(Math.max(percent, 2), 100) : percent
    const subscriptionLabel = nc('subscription', lang)
    const [initial = ''] = user.username

    return (
        <section aria-label={subscriptionLabel} className={classes.board} data-state={state}>
            <div className={classes.summary}>
                <span aria-hidden="true" className={classes.avatar}>
                    {initial.toUpperCase()}
                </span>
                <div className={classes.account}>
                    <div className={classes.caption}>{subscriptionLabel}</div>
                    <div className={classes.username}>{user.username}</div>
                </div>
                <div className={classes.chip}>
                    <span aria-hidden="true" className={classes.dot} />
                    {statusLabel}
                </div>
            </div>

            {state === 'inactive' || state === 'lifetime' ? (
                <div className={classes.plate}>
                    {state === 'inactive' ? statusLabel : t(baseTranslations.indefinitely)}
                </div>
            ) : (
                <>
                    <div className={classes.details}>
                        <span className={classes.caption}>{nc('remaining', lang)}</span>
                        <span className={classes.caption}>
                            {nc('until', lang, {
                                date: formatDate(expiresAt, lang, baseTranslations)
                            })}
                        </span>
                    </div>
                    <div className={classes.countdown}>
                        {countdownUnits
                            .filter((unit) => unit !== 'days' || remaining.days > 0)
                            .map((unit) => {
                                const value = remaining[unit]

                                return (
                                    <div className={classes.cell} data-unit={unit} key={unit}>
                                        <div className={classes.value}>
                                            {unit === 'days'
                                                ? value
                                                : String(value).padStart(2, '0')}
                                        </div>
                                        <div className={classes.unit}>
                                            {pluralUnit(unit, value, lang)}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </>
            )}

            <div className={classes.traffic}>
                <div className={classes.details}>
                    <span className={classes.caption}>{nc('traffic', lang)}</span>
                    <span>{trafficText}</span>
                </div>
                {trafficWidth !== null && (
                    <div aria-label={trafficText} className={classes.track} role="img">
                        <div
                            className={classes.fill}
                            data-level={level}
                            style={{ width: `${trafficWidth}%` }}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}
