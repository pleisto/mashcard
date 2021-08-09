import * as React from 'react'

import './style'
import InternalCheckbox, { CheckboxProps } from './Checkbox'
import Group from './Group'

export type { CheckboxProps, CheckboxChangeEvent } from './Checkbox'
export type { CheckboxGroupProps, CheckboxOptionType } from './Group'

export interface CompoundedComponent extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof Group
  __ANT_CHECKBOX: boolean
}

const Checkbox = InternalCheckbox as CompoundedComponent

Checkbox.Group = Group
Checkbox.__ANT_CHECKBOX = true

export default Checkbox
