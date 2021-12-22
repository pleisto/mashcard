import { FormulaControlType, FunctionResult, VariableMetadata } from '..'

export interface ControlType {
  meta: VariableMetadata
  kind: FormulaControlType
  disabled: boolean
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ControlInitializer {}
export interface ButtonType extends ControlType {
  kind: 'Button'
  name: string
  fn: FunctionResult
  onClick?: () => void
}

export interface ButtonInitializer extends ControlInitializer {
  name: string
  fn: FunctionResult
}

export interface SwitchType extends ControlType {
  kind: 'Switch'
  isSelected: boolean
  fn: FunctionResult
  onChange?: (bool: boolean) => void
}

export interface SwitchInitializer extends ControlInitializer {
  isSelected: boolean
  fn: FunctionResult
}

// interface SelectOption {
//   label: string
//   value: string
// }

export type SelectOption = string

export interface SelectType extends ControlType {
  kind: 'Select'
  options: [SelectOption, ...SelectOption[]]
  value: SelectOption
  fn: FunctionResult
  onChange?: (value: string) => void
}

export interface SelectInitializer extends ControlInitializer {
  options: [SelectOption, ...SelectOption[]]
  value: SelectOption
  fn: FunctionResult
}
