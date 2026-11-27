import type { TSubscriptionPageBlockConfig } from '@remnawave/subscription-page-types'

import { useClipboard } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconCopy, IconQrcode } from '@tabler/icons-react'
import clsx from 'clsx'

import { useTranslation } from '@shared/hooks'
import { openSubscriptionQrModal } from '@shared/ui'
import { getIconFromLibrary, getLocalizedText } from '@shared/utils/config-parser'
import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { findPrimaryBlockIndex, nc } from '@shared/utils/nullcore'

import { useAppConfig } from '@entities/app-config-store'
import { useSubscription } from '@entities/subscription-info-store'

import classes from './connect-guide.module.css'
import { copyOrShowQr } from './copy-or-show-qr'
import { useBlockButtonAction } from './use-block-button-action'

interface StepsListProps {
    blocks: TSubscriptionPageBlockConfig[]
    isMobile: boolean
}

export const StepsList = ({ blocks, isMobile }: StepsListProps) => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const { baseSettings, svgLibrary } = useAppConfig()
    const subscription = useSubscription()
    const { copy } = useClipboard({ timeout: 10_000 })
    const handleButtonClick = useBlockButtonAction()
    const primaryIndex = findPrimaryBlockIndex(blocks)
    const subscriptionUrl = constructSubscriptionUrl(
        window.location.href,
        subscription.user.shortUuid
    )

    const showCopied = () => {
        notifications.show({
            title: t(baseTranslations.linkCopied),
            message: t(baseTranslations.linkCopiedToClipboard),
            color: 'violet'
        })
    }

    const showQr = () => {
        openSubscriptionQrModal({
            subscriptionUrl,
            t,
            baseTranslations,
            onCopy: () => {
                showCopied()
                copy(subscriptionUrl)
            }
        })
    }

    const copyLink = () => {
        void copyOrShowQr(subscriptionUrl, {
            writeText: (text) => navigator.clipboard.writeText(text),
            onCopied: showCopied,
            onFailed: showQr
        })
    }

    const linkActions = !baseSettings.hideGetLinkButton && (
        <div className={classes.linkActions}>
            <button className={classes.linkButton} onClick={copyLink} type="button">
                <IconCopy aria-hidden="true" size={16} />
                <span>
                    {primaryIndex === -1
                        ? t(baseTranslations.copyLink)
                        : nc('notOpened', currentLang)}
                </span>
            </button>
            <button className={classes.linkButton} onClick={showQr} type="button">
                <IconQrcode aria-hidden="true" size={16} />
                <span>{nc('qrCode', currentLang)}</span>
            </button>
        </div>
    )

    return (
        <div className={clsx(classes.steps, isMobile && classes.mobileSteps)}>
            {blocks.length > 0 && (
                <ol className={classes.stepList} role="list">
                    {blocks.map((block, index) => {
                        const isPrimary = index === primaryIndex

                        return (
                            <li
                                className={clsx(classes.step, isPrimary && classes.primaryStep)}
                                key={index}
                            >
                                <span aria-hidden="true" className={classes.stepNumber}>
                                    {index + 1}
                                </span>
                                <div className={classes.stepContent}>
                                    <h3
                                        className={classes.stepTitle}
                                        dangerouslySetInnerHTML={{
                                            __html: getLocalizedText(block.title, currentLang)
                                        }}
                                    />
                                    <div
                                        className={classes.stepDescription}
                                        dangerouslySetInnerHTML={{
                                            __html: getLocalizedText(block.description, currentLang)
                                        }}
                                    />
                                    {block.buttons.length > 0 && (
                                        <div className={classes.stepActions}>
                                            {block.buttons.map((button, buttonIndex) => (
                                                <button
                                                    className={clsx(
                                                        classes.stepButton,
                                                        isPrimary &&
                                                            button.type === 'subscriptionLink' &&
                                                            classes.primaryButton
                                                    )}
                                                    key={buttonIndex}
                                                    onClick={() => handleButtonClick(button)}
                                                    type="button"
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={classes.stepButtonIcon}
                                                        dangerouslySetInnerHTML={{
                                                            __html: getIconFromLibrary(
                                                                button.svgIconKey,
                                                                svgLibrary
                                                            )
                                                        }}
                                                    />
                                                    <span>{t(button.text)}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {isPrimary && linkActions}
                            </li>
                        )
                    })}
                </ol>
            )}
            {primaryIndex === -1 && linkActions}
        </div>
    )
}
