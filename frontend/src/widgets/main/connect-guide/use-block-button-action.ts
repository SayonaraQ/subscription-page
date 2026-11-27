import type { TSubscriptionPageButtonConfig } from '@remnawave/subscription-page-types'

import { useClipboard } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import { useTranslation } from '@shared/hooks'
import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { TemplateEngine } from '@shared/utils/template-engine'

import { useSubscription } from '@entities/subscription-info-store'

export function useBlockButtonAction(): (button: TSubscriptionPageButtonConfig) => void {
    const { t, baseTranslations } = useTranslation()
    const { copy } = useClipboard({ timeout: 2_000 })
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

                copy(formattedUrl)
                notifications.show({
                    title: t(baseTranslations.linkCopied),
                    message: t(baseTranslations.linkCopiedToClipboard),
                    color: 'violet'
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
