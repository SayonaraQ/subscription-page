import { Drawer, DrawerOverlay } from '@mantine/core'

import classes from './components.module.css'

export default {
    Drawer: Drawer.extend({
        classNames: {
            content: classes.drawerContent,
            header: classes.drawerHeader,
            close: classes.closeButton
        }
    }),
    DrawerOverlay: DrawerOverlay.extend({
        defaultProps: {
            color: '#07040C',
            backgroundOpacity: 0.5,
            blur: 2
        }
    })
}
