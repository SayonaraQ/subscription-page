import { describe, expect, it, vi } from 'vitest'

import { copyOrShowQr } from './copy-or-show-qr'

describe('copyOrShowQr', () => {
    it('reports success when the clipboard accepts the link', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined)
        const onCopied = vi.fn()
        const onFailed = vi.fn()

        await copyOrShowQr('https://speed.null-core.com/abc', { writeText, onCopied, onFailed })

        expect(writeText).toHaveBeenCalledWith('https://speed.null-core.com/abc')
        expect(onCopied).toHaveBeenCalledTimes(1)
        expect(onFailed).not.toHaveBeenCalled()
    })

    it('falls back to the QR window when the clipboard rejects', async () => {
        const onCopied = vi.fn()
        const onFailed = vi.fn()

        await copyOrShowQr('https://x', {
            writeText: vi.fn().mockRejectedValue(new Error('denied')),
            onCopied,
            onFailed
        })

        expect(onFailed).toHaveBeenCalledTimes(1)
        expect(onCopied).not.toHaveBeenCalled()
    })

    it('falls back when writeText throws synchronously (no clipboard API)', async () => {
        const onCopied = vi.fn()
        const onFailed = vi.fn()

        await copyOrShowQr('https://x', {
            writeText: () => {
                throw new TypeError('navigator.clipboard is undefined')
            },
            onCopied,
            onFailed
        })

        expect(onFailed).toHaveBeenCalledTimes(1)
        expect(onCopied).not.toHaveBeenCalled()
    })
})
