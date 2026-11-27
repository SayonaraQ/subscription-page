import { ActionIcon, Button } from '@mantine/core'

import classes from './components.module.css'

export default {
    ActionIcon: ActionIcon.extend({
        classNames: { root: classes.button },
        defaultProps: {
            radius: 'lg',
            variant: 'outline'
        }
    }),
    Button: Button.extend({
        classNames: { root: classes.button },
        defaultProps: {
            radius: 'lg',
            variant: 'outline'
        }
    })
}
