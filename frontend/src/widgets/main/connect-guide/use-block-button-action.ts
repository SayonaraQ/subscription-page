import type { TSubscriptionPageButtonConfig } from '@remnawave/subscription-page-types'

import { notifications } from '@mantine/notifications'

import { useTranslation } from '@shared/hooks'
import { openSubscriptionQrModal } from '@shared/ui'
import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { copyOrShowQr } from '@shared/utils/nullcore'
import { TemplateEngine } from '@shared/utils/template-engine'

import { useSubscription } from '@entities/subscription-info-store'

export function useBlockButtonAction(): (button: TSubscriptionPageButtonConfig) => void {
    const { t, baseTranslations } = useTranslation()
    const subscription = useSubscription()
    const subscriptionUrl = constructSubscriptionUrl(
        window.location.href,
        subscription.user.shortUuid
    )

    return (button) => {
        let formattedUrl: string | undefined

        if (button.type === 'subscriptionLink' || button.type === 'copyButton') {
            formattedUrl = TemplateEngine.formatWithMetaInfo(button.link, {
                username: subscription.user.username,
                subscriptionUrl
            })
        }

        switch (button.type) {
            case 'copyButton': {
                if (!formattedUrl) return

                const showCopied = () =>
                    notifications.show({
                        title: t(baseTranslations.linkCopied),
                        message: t(baseTranslations.linkCopiedToClipboard),
                        color: 'violet'
                    })
                const payload = formattedUrl
                // Report success only after the write; when the clipboard is blocked, show the payload
                // in the link window so it can be copied by hand.
                void copyOrShowQr(payload, {
                    writeText: (text) => navigator.clipboard.writeText(text),
                    onCopied: showCopied,
                    onFailed: () =>
                        openSubscriptionQrModal({
                            subscriptionUrl: payload,
                            t,
                            baseTranslations,
                            onCopied: showCopied
                        })
                })
                break
            }
            case 'external': {
                window.open(button.link, '_blank')
                break
            }
            case 'subscriptionLink': {
                if (!formattedUrl) return

                window.open(formattedUrl, '_blank')
                break
            }
            default:
                break
        }
    }
}
