import { Input, InputBase, PasswordInput, Select, TextInput } from '@mantine/core'

import classes from './components.module.css'

export default {
    Input: Input.extend({
        classNames: { wrapper: classes.inputWrapper }
    }),
    InputBase: InputBase.extend({
        defaultProps: {
            radius: 'md'
        }
    }),
    PasswordInput: PasswordInput.extend({
        defaultProps: {
            radius: 'md'
        }
    }),
    TextInput: TextInput.extend({
        defaultProps: {
            radius: 'md'
        }
    }),
    Select: Select.extend({
        defaultProps: {
            radius: 'md'
        }
    })
}
