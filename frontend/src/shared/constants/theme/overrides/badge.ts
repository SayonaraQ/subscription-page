import { Badge } from '@mantine/core'

import classes from './components.module.css'

export default {
    Badge: Badge.extend({
        classNames: { root: classes.badge },
        defaultProps: {
            radius: 'md',
            variant: 'outline'
        }
    })
}
