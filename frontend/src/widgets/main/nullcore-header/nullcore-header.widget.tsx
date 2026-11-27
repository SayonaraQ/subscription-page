import { notifications } from '@mantine/notifications'
import { IconQrcode } from '@tabler/icons-react'

import { useTranslation } from '@shared/hooks'
import { LanguageToggle, openSubscriptionQrModal, RemnawaveLogo } from '@shared/ui'
import controlClasses from '@shared/ui/nullcore-control.module.css'
import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { nc } from '@shared/utils/nullcore'

import { useAppConfig, useAppConfigStoreActions, useCurrentLang } from '@entities/app-config-store'
import { useSubscription } from '@entities/subscription-info-store'

import classes from './nullcore-header.module.css'

export const NullcoreHeaderWidget = () => {
    const { baseSettings, brandingSettings, locales } = useAppConfig()
    const { logoUrl, title } = brandingSettings
    const currentLang = useCurrentLang()
    const { setLanguage } = useAppConfigStoreActions()
    const { t, baseTranslations } = useTranslation()
    const subscription = useSubscription()

    const hasCustomLogo = logoUrl !== '' && !logoUrl.includes('docs.rw')

    // Support lives in the footer; the header keeps the link/QR window one tap away
    // (on a computer it is the quickest way to get the subscription onto a phone).
    const showQr = () =>
        openSubscriptionQrModal({
            subscriptionUrl: constructSubscriptionUrl(
                window.location.href,
                subscription.user.shortUuid
            ),
            t,
            baseTranslations,
            onCopied: () =>
                notifications.show({
                    title: t(baseTranslations.linkCopied),
                    message: t(baseTranslations.linkCopiedToClipboard),
                    color: 'violet'
                })
        })

    return (
        <header className={classes.header}>
            {hasCustomLogo ? (
                <img alt="" className={classes.logo} height={38} src={logoUrl} width={38} />
            ) : (
                <RemnawaveLogo aria-hidden="true" c="violet" className={classes.logo} size={38} />
            )}
            <h1 className={classes.title}>{title}</h1>
            <LanguageToggle
                currentLang={currentLang}
                locales={locales}
                onLanguageChange={setLanguage}
            />
            {!baseSettings.hideGetLinkButton && (
                <button
                    aria-label={nc('qrCode', currentLang)}
                    className={controlClasses.control}
                    onClick={showQr}
                    type="button"
                >
                    <IconQrcode aria-hidden="true" color="var(--nc-accent-300)" size={20} />
                </button>
            )}
        </header>
    )
}
