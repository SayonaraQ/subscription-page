import type { TSubscriptionPageAppConfig } from '@remnawave/subscription-page-types'

import { IconCheck } from '@tabler/icons-react'

import { getIconFromLibrary } from '@shared/utils/config-parser'
import { appMonogram, nc } from '@shared/utils/nullcore'
import { vibrate } from '@shared/utils/vibrate'

import { useAppConfig, useCurrentLang } from '@entities/app-config-store'

import classes from './connect-guide.module.css'

interface AppPickerProps {
    platformApps: TSubscriptionPageAppConfig[]
    selectedAppIndex: number
    onSelect: (index: number) => void
}

export const AppPicker = ({ platformApps, selectedAppIndex, onSelect }: AppPickerProps) => {
    const { svgLibrary } = useAppConfig()
    const currentLang = useCurrentLang()

    const renderApp = (app: TSubscriptionPageAppConfig, index: number) => {
        const isSelected = index === selectedAppIndex
        const icon = app.svgIconKey && getIconFromLibrary(app.svgIconKey, svgLibrary)

        return (
            <button
                aria-pressed={isSelected}
                className={classes.appCard}
                key={index}
                onClick={() => {
                    vibrate('toggle')
                    onSelect(index)
                }}
                type="button"
            >
                {icon ? (
                    <span
                        aria-hidden="true"
                        className={classes.appIcon}
                        dangerouslySetInnerHTML={{ __html: icon }}
                    />
                ) : (
                    <span aria-hidden="true" className={classes.appIcon}>
                        {appMonogram(app.name)}
                    </span>
                )}
                <span className={classes.appDetails}>
                    <span className={classes.appName}>{app.name}</span>
                    {app.featured && (
                        <span className={classes.recommended}>
                            {nc('recommended', currentLang)}
                        </span>
                    )}
                </span>
                {isSelected && (
                    <span aria-hidden="true" className={classes.checkBadge}>
                        <IconCheck size={14} stroke={3} />
                    </span>
                )}
            </button>
        )
    }

    return (
        <div className={classes.options}>
            <div className={classes.label}>{nc('app', currentLang)}</div>
            <div className={classes.appList}>
                {platformApps.map((app, index) => renderApp(app, index))}
            </div>
        </div>
    )
}
