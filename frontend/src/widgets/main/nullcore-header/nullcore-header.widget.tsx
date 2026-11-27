import {
    IconBrandDiscord,
    IconBrandTelegram,
    IconBrandVk,
    IconMessageChatbot
} from '@tabler/icons-react'

import { LanguageToggle, RemnawaveLogo } from '@shared/ui'
import controlClasses from '@shared/ui/nullcore-control.module.css'
import { nc } from '@shared/utils/nullcore'

import { useAppConfig, useAppConfigStoreActions, useCurrentLang } from '@entities/app-config-store'

import classes from './nullcore-header.module.css'

const supportIcons = {
    't.me': { icon: IconBrandTelegram, color: 'var(--nc-accent-300)' },
    'discord.com': { icon: IconBrandDiscord, color: '#5865F2' },
    'vk.com': { icon: IconBrandVk, color: '#0077FF' }
}

export const NullcoreHeaderWidget = () => {
    const { brandingSettings, locales } = useAppConfig()
    const { logoUrl, supportUrl, title } = brandingSettings
    const currentLang = useCurrentLang()
    const { setLanguage } = useAppConfigStoreActions()

    const hasCustomLogo = logoUrl !== '' && !logoUrl.includes('docs.rw')
    const supportPlatform = Object.entries(supportIcons).find(([domain]) =>
        supportUrl.includes(domain)
    )
    const { icon: SupportIcon, color } = supportPlatform?.[1] ?? {
        icon: IconMessageChatbot,
        color: 'var(--nc-accent-300)'
    }

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
            {supportUrl !== '' && (
                <a
                    aria-label={nc('support', 'en')}
                    className={controlClasses.control}
                    href={supportUrl}
                    rel="noopener"
                    target="_blank"
                >
                    <SupportIcon aria-hidden="true" color={color} size={20} />
                </a>
            )}
        </header>
    )
}
