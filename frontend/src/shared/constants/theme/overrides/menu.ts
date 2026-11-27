import { Combobox, Menu } from '@mantine/core'

import classes from './components.module.css'

export default {
    Menu: Menu.extend({
        classNames: { dropdown: classes.dropdown, item: classes.menuItem },
        defaultProps: {
            shadow: 'md',
            withArrow: true,
            transitionProps: { transition: 'scale', duration: 200 }
        }
    }),
    Combobox: Combobox.extend({
        classNames: { dropdown: classes.dropdown, option: classes.option },
        defaultProps: {
            shadow: 'md',
            withArrow: false,
            transitionProps: { transition: 'scale', duration: 200 }
        }
    })
}
