import type { TSubscriptionPageBlockConfig } from '@remnawave/subscription-page-types'

export function findPrimaryBlockIndex(blocks: TSubscriptionPageBlockConfig[]): number {
    return blocks.findIndex((block) =>
        block.buttons.some((button) => button.type === 'subscriptionLink')
    )
}

// A step whose icon the panel colors red/orange/yellow is a warning ("remove Clash Verge Rev first"):
// the page paints it yellow so it is not skimmed past.
const WARNING_ICON_COLORS = new Set(['red', 'orange', 'yellow'])

export function isWarningBlock(block: TSubscriptionPageBlockConfig): boolean {
    return WARNING_ICON_COLORS.has(block.svgIconColor)
}
