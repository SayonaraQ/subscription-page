import { ActionIcon, Group } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import {
    IconBrandDiscord,
    IconBrandTelegram,
    IconBrandVk,
    IconLink,
    IconMessageChatbot
} from '@tabler/icons-react'

import { useTranslation } from '@shared/hooks'
import { openSubscriptionQrModal } from '@shared/ui'
import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { nc } from '@shared/utils/nullcore'

import { useSubscription } from '@entities/subscription-info-store'

interface IProps {
    hideGetLink: boolean
    supportUrl: string
}

export const SubscriptionLinkWidget = ({ supportUrl, hideGetLink }: IProps) => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const subscription = useSubscription()

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

    const renderSupportLink = (supportUrl: string) => {
        const iconConfig = {
            't.me': { icon: IconBrandTelegram, color: '#0088cc' },
            'discord.com': { icon: IconBrandDiscord, color: '#5865F2' },
            'vk.com': { icon: IconBrandVk, color: '#0077FF' }
        }

        const matchedPlatform = Object.entries(iconConfig).find(([domain]) =>
            supportUrl.includes(domain)
        )

        const { icon: Icon, color } = matchedPlatform
            ? matchedPlatform[1]
            : { icon: IconMessageChatbot, color: 'var(--nc-accent-300)' }

        return (
            <ActionIcon
                aria-label={nc('support', currentLang)}
                component="a"
                href={supportUrl}
                radius="md"
                rel="noopener noreferrer"
                size="xl"
                target="_blank"
                variant="default"
            >
                <Icon color={color} />
            </ActionIcon>
        )
    }

    const handleGetLink = () => {
        openSubscriptionQrModal({ subscriptionUrl, t, baseTranslations, onCopied: showCopied })
    }

    return (
        <Group gap="xs" ml="auto" wrap="nowrap">
            {!hideGetLink && (
                <ActionIcon
                    aria-label={t(baseTranslations.getLink)}
                    onClick={handleGetLink}
                    radius="md"
                    size="xl"
                    variant="default"
                >
                    <IconLink />
                </ActionIcon>
            )}

            {supportUrl !== '' && renderSupportLink(supportUrl)}
        </Group>
    )
}
