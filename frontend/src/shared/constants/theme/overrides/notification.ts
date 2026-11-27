import { Notification } from '@mantine/core'

import classes from './components.module.css'

export default {
    Notification: Notification.extend({
        classNames: { root: classes.notification, closeButton: classes.closeButton },
        defaultProps: {
            radius: 'md'
        }
    })
}
