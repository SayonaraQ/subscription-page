import type { TSubscriptionPagePlatformKey } from '@remnawave/subscription-page-types'

import { useLayoutEffect, useRef } from 'react'

import { useTranslation } from '@shared/hooks'
import { getIconFromLibrary } from '@shared/utils/config-parser'
import { nc } from '@shared/utils/nullcore'

import { useAppConfig } from '@entities/app-config-store'

import classes from './connect-guide.module.css'

interface PlatformChipsProps {
    availablePlatforms: TSubscriptionPagePlatformKey[]
    isDeviceDetected: boolean
    selectedPlatform: TSubscriptionPagePlatformKey
    onSelect: (platform: TSubscriptionPagePlatformKey) => void
}

export const PlatformChips = ({
    availablePlatforms,
    isDeviceDetected,
    selectedPlatform,
    onSelect
}: PlatformChipsProps) => {
    const { t, currentLang } = useTranslation()
    const { platforms, svgLibrary } = useAppConfig()
    const rowRef = useRef<HTMLDivElement>(null)

    // Keep the selected chip visible: the detected platform may sit past the row's right edge.
    // Scroll the row itself, not scrollIntoView, so the page never jumps vertically.
    useLayoutEffect(() => {
        const row = rowRef.current
        const chip = row?.querySelector<HTMLElement>('[aria-pressed="true"]')
        if (!row || !chip) return
        const chipStart = chip.offsetLeft - row.offsetLeft
        const chipEnd = chipStart + chip.offsetWidth
        if (chipStart < row.scrollLeft || chipEnd > row.scrollLeft + row.clientWidth) {
            row.scrollLeft = Math.max(0, chipStart - (row.clientWidth - chip.offsetWidth) / 2)
        }
    }, [selectedPlatform])

    return (
        <div className={classes.options}>
            <div className={classes.label}>
                {nc(isDeviceDetected ? 'deviceDetected' : 'device', currentLang)}
            </div>
            <div className={classes.platforms} ref={rowRef}>
                {availablePlatforms.map((key) => {
                    const platform = platforms[key]!

                    return (
                        <button
                            aria-pressed={key === selectedPlatform}
                            className={classes.platformChip}
                            key={key}
                            onClick={() => onSelect(key)}
                            type="button"
                        >
                            <span
                                aria-hidden="true"
                                className={classes.platformIcon}
                                dangerouslySetInnerHTML={{
                                    __html: getIconFromLibrary(platform.svgIconKey, svgLibrary)
                                }}
                            />
                            {t(platform.displayName)}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
