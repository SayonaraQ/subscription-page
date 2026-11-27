import { Tooltip } from '@mantine/core'

import classes from './components.module.css'

export default {
    Tooltip: Tooltip.extend({
        classNames: { tooltip: classes.tooltip, arrow: classes.tooltipArrow },
        defaultProps: {
            radius: 'md',
            withArrow: true,
            transitionProps: { transition: 'scale-x', duration: 300 },
            arrowSize: 2
        }
    })
}
