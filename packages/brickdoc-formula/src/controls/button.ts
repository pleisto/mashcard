import { ButtonInitializer, ButtonType } from './types'
import { ContextInterface, FunctionContext, FunctionResult, VariableMetadata } from '../types'
import { functionResult2lambda } from '../grammar/lambda'

export class ButtonClass implements ButtonType {
  name: string
  _formulaContext: ContextInterface
  _meta: VariableMetadata
  kind: 'Button' = 'Button'
  fn: FunctionResult
  disabled: boolean
  onClick?: VoidFunction

  constructor(ctx: FunctionContext, { name, fn }: ButtonInitializer) {
    this.name = name
    this._formulaContext = ctx.formulaContext
    this._meta = ctx.meta
    this.fn = fn
    this.disabled = false
    this.onClick = functionResult2lambda<ButtonType>(ctx, fn, this)
  }

  persistence(): ButtonInitializer {
    return {
      name: this.name,
      fn: this.fn
    }
  }
}
