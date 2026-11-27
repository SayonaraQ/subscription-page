import { TSubscriptionPageBlockConfig } from '@remnawave/subscription-page-types'
import { describe, expect, it } from 'vitest'

import { findPrimaryBlockIndex, isWarningBlock } from './steps'

const block = (...types: string[]) =>
    ({
        svgIconKey: 'x',
        svgIconColor: 'grape',
        title: { en: 't', ru: 't' },
        description: { en: 'd', ru: 'd' },
        buttons: types.map((type) => ({
            type,
            link: 'https://x',
            text: { en: 'b', ru: 'b' },
            svgIconKey: 'x'
        }))
    }) as unknown as TSubscriptionPageBlockConfig

describe('findPrimaryBlockIndex', () => {
    it('finds the first block with a subscriptionLink button (Koala on Windows → 2)', () => {
        expect(
            findPrimaryBlockIndex([
                block('external'),
                block(),
                block('subscriptionLink'),
                block(),
                block()
            ])
        ).toBe(2)
    })

    it('returns -1 when no block adds the subscription', () => {
        expect(findPrimaryBlockIndex([block('external'), block('copyButton')])).toBe(-1)
    })
})

describe('isWarningBlock', () => {
    const colored = (svgIconColor: string) =>
        ({ ...block(), svgIconColor }) as TSubscriptionPageBlockConfig

    it.each(['red', 'orange', 'yellow'])('treats a %s icon as a warning step', (color) => {
        expect(isWarningBlock(colored(color))).toBe(true)
    })

    it.each(['grape', 'violet', 'cyan', 'blue'])('treats a %s icon as a regular step', (color) => {
        expect(isWarningBlock(colored(color))).toBe(false)
    })
})
