import { FunctionResult } from '..'

export type ControlKind = 'button'

export interface ControlType {
  name: string
  kind: ControlKind
}

export interface ButtonType extends ControlType {
  kind: 'button'
  fn: FunctionResult
  disabled: boolean
  onClick?: () => void
}

export interface ControlInitializer {
  name: string
}

export interface ButtonInitializer extends ControlInitializer {
  fn: FunctionResult
}
