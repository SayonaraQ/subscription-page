import type { TSubscriptionPageBlockConfig } from '@remnawave/subscription-page-types'

export function findPrimaryBlockIndex(blocks: TSubscriptionPageBlockConfig[]): number {
    return blocks.findIndex((block) =>
        block.buttons.some((button) => button.type === 'subscriptionLink')
    )
}
