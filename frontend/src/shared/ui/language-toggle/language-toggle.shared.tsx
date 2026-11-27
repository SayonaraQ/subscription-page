import { useDirection } from '@mantine/core'
import { getLanguageInfo, TSubscriptionPageLanguageCode } from '@remnawave/subscription-page-types'
import { useEffect } from 'react'

import { nc } from '@shared/utils/nullcore'
import { vibrate } from '@shared/utils/vibrate'

import { LanguagePicker } from '../language-picker/language-picker.shared'
import classes from '../nullcore-control.module.css'

interface ILanguageToggleProps {
    currentLang: TSubscriptionPageLanguageCode
    locales: TSubscriptionPageLanguageCode[]
    onLanguageChange: (lang: TSubscriptionPageLanguageCode) => void
}

export function LanguageToggle(props: ILanguageToggleProps) {
    const { currentLang, locales, onLanguageChange } = props
    const { toggleDirection, dir } = useDirection()
    const hasLanguageMenu = locales.length >= 3

    useEffect(() => {
        if (hasLanguageMenu) return

        if (currentLang === 'fa' && dir === 'ltr') {
            toggleDirection()
        }
        if (currentLang !== 'fa' && dir === 'rtl') {
            toggleDirection()
        }
    }, [currentLang, dir, hasLanguageMenu, toggleDirection])

    if (hasLanguageMenu) return <LanguagePicker {...props} />
    if (locales.length !== 2) return null

    const otherLocale = locales.find((locale) => locale !== currentLang)
    if (!otherLocale) return null

    const nativeName = getLanguageInfo(currentLang)?.nativeName ?? currentLang

    return (
        <button
            aria-label={`${nc('language', 'en')}: ${nativeName}`}
            className={classes.control}
            onClick={() => {
                vibrate('doubleTap')
                onLanguageChange(otherLocale)
            }}
            type="button"
        >
            {currentLang.toUpperCase()}
        </button>
    )
}
