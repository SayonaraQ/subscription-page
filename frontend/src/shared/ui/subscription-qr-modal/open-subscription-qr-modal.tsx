import type {
    TSubscriptionPageLocalizedText,
    TSubscriptionPageRawConfig
} from '@remnawave/subscription-page-types'

import { Button, Image, Stack, Text, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconCopy } from '@tabler/icons-react'
import { useRef } from 'react'
import { renderSVG } from 'uqr'

import { copyOrShowQr } from '@shared/utils/nullcore'
import { vibrate } from '@shared/utils/vibrate'

import classes from './subscription-qr-modal.module.css'

interface IQrModalArgs {
    /** The text encoded in the QR code, shown in the field and copied by the button. */
    subscriptionUrl: string
    t: (x: TSubscriptionPageLocalizedText) => string
    baseTranslations: TSubscriptionPageRawConfig['baseTranslations']
    /** Called only after the clipboard write succeeded. */
    onCopied: () => void
}

const QrModalBody = ({ subscriptionUrl, t, baseTranslations, onCopied }: IQrModalArgs) => {
    const fieldRef = useRef<HTMLInputElement>(null)

    const selectField = () => {
        fieldRef.current?.focus()
        fieldRef.current?.select()
    }

    const subscriptionQrCode = renderSVG(subscriptionUrl, {
        whiteColor: '#160D23',
        blackColor: '#D68CFF'
    })

    return (
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

            {/* The link itself, selectable: when the clipboard API is blocked (in-app browsers),
                the user can still long-press and copy it by hand. */}
            <TextInput
                aria-label={t(baseTranslations.copyLink)}
                classNames={{ input: classes.linkField }}
                onFocus={(event) => event.currentTarget.select()}
                readOnly
                ref={fieldRef}
                value={subscriptionUrl}
                w="100%"
            />

            <Button
                fullWidth
                leftSection={<IconCopy />}
                onClick={() =>
                    void copyOrShowQr(subscriptionUrl, {
                        writeText: (text) => navigator.clipboard.writeText(text),
                        onCopied,
                        onFailed: selectField
                    })
                }
                radius="md"
                variant="light"
            >
                {t(baseTranslations.copyLink)}
            </Button>
        </Stack>
    )
}

export function openSubscriptionQrModal(args: IQrModalArgs): void {
    vibrate('tap')

    modals.open({
        centered: true,
        title: args.t(args.baseTranslations.getLink),
        classNames: {
            content: classes.modalContent,
            header: classes.modalHeader,
            title: classes.modalTitle
        },
        children: <QrModalBody {...args} />
    })
}
