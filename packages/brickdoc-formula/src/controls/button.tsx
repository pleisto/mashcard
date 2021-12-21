import { ButtonInitializer, ButtonType } from '.'
import { ContextInterface, FunctionResult, functionResult2lambda } from '..'

export class ButtonClass implements ButtonType {
  name: string
  kind: 'button' = 'button'
  fn: FunctionResult
  disabled: boolean
  onClick?: () => void

  constructor(ctx: ContextInterface, { name, fn }: ButtonInitializer) {
    this.name = name
    this.fn = fn
    this.disabled = false
    this.onClick = functionResult2lambda(ctx, fn, this)
  }
}
