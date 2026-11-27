import type { TSubscriptionPagePlatformKey } from '@remnawave/subscription-page-types'

import { useState } from 'react'

import { nc } from '@shared/utils/nullcore'
import { vibrate } from '@shared/utils/vibrate'

import { useAppConfig, useCurrentLang } from '@entities/app-config-store'

import { AppPicker } from './app-picker'
import classes from './connect-guide.module.css'
import { PlatformChips } from './platform-chips'
import { StepsList } from './steps-list'

interface ConnectGuideProps {
    isMobile: boolean
    platform: TSubscriptionPagePlatformKey | undefined
    hasPlatformApps: Record<TSubscriptionPagePlatformKey, boolean>
}

export const ConnectGuideWidget = ({ isMobile, platform, hasPlatformApps }: ConnectGuideProps) => {
    const { platforms } = useAppConfig()
    const currentLang = useCurrentLang()
    const availablePlatforms = (
        Object.keys(hasPlatformApps) as TSubscriptionPagePlatformKey[]
    ).filter((key) => hasPlatformApps[key])
    const [selectedPlatform, setSelectedPlatform] = useState<TSubscriptionPagePlatformKey>(() =>
        platform && hasPlatformApps[platform] ? platform : availablePlatforms[0]!
    )
    const [selectedAppIndex, setSelectedAppIndex] = useState(0)

    const platformApps = platforms[selectedPlatform]!.apps
    const selectedApp = platformApps[selectedAppIndex] ?? platformApps[0]

    const selectPlatform = (value: TSubscriptionPagePlatformKey) => {
        if (value === selectedPlatform) return

        vibrate([80])
        setSelectedPlatform(value)
        setSelectedAppIndex(0)
    }

    return (
        <section className={classes.guide}>
            <h2 className={classes.title}>{nc('connect', currentLang)}</h2>
            {availablePlatforms.length > 1 && (
                <PlatformChips
                    availablePlatforms={availablePlatforms}
                    isDeviceDetected={Boolean(platform && hasPlatformApps[platform])}
                    onSelect={selectPlatform}
                    selectedPlatform={selectedPlatform}
                />
            )}
            {selectedApp && (
                <>
                    <AppPicker
                        onSelect={setSelectedAppIndex}
                        platformApps={platformApps}
                        selectedAppIndex={selectedAppIndex}
                    />
                    <StepsList blocks={selectedApp.blocks} isMobile={isMobile} />
                </>
            )}
        </section>
    )
}
