import { Container, Stack } from '@mantine/core'
import { TSubscriptionPagePlatformKey } from '@remnawave/subscription-page-types'
import { IconMessageCircle } from '@tabler/icons-react'
import {
    ConnectGuideWidget,
    NullcoreHeaderWidget,
    RawKeysWidget,
    SubscriptionBoardWidget
} from '@widgets/main'

import { Page } from '@shared/ui'
import { nc } from '@shared/utils/nullcore'

import { useAppConfig, useCurrentLang } from '@entities/app-config-store'

import classes from './main-page.module.css'

interface IMainPageComponentProps {
    isMobile: boolean
    platform: TSubscriptionPagePlatformKey | undefined
}

export const MainPageComponent = ({ isMobile, platform }: IMainPageComponentProps) => {
    const config = useAppConfig()
    const currentLang = useCurrentLang()
    const { supportUrl } = config.brandingSettings

    const hasPlatformApps: Record<TSubscriptionPagePlatformKey, boolean> = {
        ios: Boolean(config.platforms.ios?.apps.length),
        android: Boolean(config.platforms.android?.apps.length),
        linux: Boolean(config.platforms.linux?.apps.length),
        macos: Boolean(config.platforms.macos?.apps.length),
        windows: Boolean(config.platforms.windows?.apps.length),
        androidTV: Boolean(config.platforms.androidTV?.apps.length),
        appleTV: Boolean(config.platforms.appleTV?.apps.length)
    }

    const atLeastOnePlatformApp = Object.values(hasPlatformApps).some((value) => value)

    return (
        <Page>
            <Container
                maw={640}
                pb={28}
                pt={16}
                px={{ base: 16, sm: 24 }}
                style={{ position: 'relative', zIndex: 1 }}
            >
                <Stack gap={16}>
                    <NullcoreHeaderWidget />

                    {config.uiConfig.subscriptionInfoBlockType !== 'hidden' && (
                        <SubscriptionBoardWidget />
                    )}

                    {atLeastOnePlatformApp && (
                        <ConnectGuideWidget
                            hasPlatformApps={hasPlatformApps}
                            isMobile={isMobile}
                            platform={platform}
                        />
                    )}

                    <RawKeysWidget isMobile={isMobile} />

                    {supportUrl !== '' && (
                        <footer className={classes.footer}>
                            <a
                                className={classes.supportLink}
                                href={supportUrl}
                                rel="noopener"
                                target="_blank"
                            >
                                <IconMessageCircle aria-hidden="true" size={17} />
                                {nc('help', currentLang)}
                            </a>
                        </footer>
                    )}
                </Stack>
            </Container>
        </Page>
    )
}
