import type { TSubscriptionPagePlatformKey } from '@remnawave/subscription-page-types'

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

    return (
        <div className={classes.options}>
            <div className={classes.label}>
                {nc(isDeviceDetected ? 'deviceDetected' : 'device', currentLang)}
            </div>
            <div className={classes.platforms}>
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
