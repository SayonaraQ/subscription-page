import type {
    TSubscriptionPageLocalizedText,
    TSubscriptionPageRawConfig
} from '@remnawave/subscription-page-types'

import { Button, Image, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconCopy } from '@tabler/icons-react'
import { renderSVG } from 'uqr'

import { vibrate } from '@shared/utils/vibrate'

import classes from './subscription-qr-modal.module.css'

export function openSubscriptionQrModal({
    subscriptionUrl,
    t,
    baseTranslations,
    onCopy
}: {
    subscriptionUrl: string
    t: (x: TSubscriptionPageLocalizedText) => string
    baseTranslations: TSubscriptionPageRawConfig['baseTranslations']
    onCopy: () => void
}): void {
    vibrate('tap')

    const subscriptionQrCode = renderSVG(subscriptionUrl, {
        whiteColor: '#160D23',
        blackColor: '#D68CFF'
    })

    modals.open({
        centered: true,
        title: t(baseTranslations.getLink),
        classNames: {
            content: classes.modalContent,
            header: classes.modalHeader,
            title: classes.modalTitle
        },
        children: (
            <Stack align="center">
                <Image
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(subscriptionQrCode)}`}
                    style={{ borderRadius: 'var(--mantine-radius-md)' }}
                />
                <Text c="white" fw={600} size="lg" ta="center">
                    {t(baseTranslations.scanQrCode)}
                </Text>
                <Text c="dimmed" size="sm" ta="center">
                    {t(baseTranslations.scanQrCodeDescription)}
                </Text>

                <Button
                    fullWidth
                    leftSection={<IconCopy />}
                    onClick={onCopy}
                    radius="md"
                    variant="light"
                >
                    {t(baseTranslations.copyLink)}
                </Button>
            </Stack>
        )
    })
}
