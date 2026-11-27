export async function copyOrShowQr(
    text: string,
    deps: {
        writeText: (s: string) => Promise<void> | void
        onCopied: () => void
        onFailed: () => void
    }
): Promise<void> {
    let reportResult = deps.onCopied
    try {
        await deps.writeText(text)
    } catch {
        reportResult = deps.onFailed
    }

    try {
        reportResult()
    } catch {
        // Reporting the result must not reject the copy operation.
    }
}
