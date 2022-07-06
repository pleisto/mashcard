import { SwitchInitializer, SwitchType } from './types'
import { ContextInterface, FunctionContext, FunctionResult, VariableMetadata } from '../type'
import { functionResult2lambda } from '../grammar/lambda'

export class SwitchClass implements SwitchType {
  checked: boolean
  _formulaContext: ContextInterface
  _meta: VariableMetadata
  kind: 'Switch' = 'Switch'
  fn: FunctionResult
  disabled: boolean
  onChange?: (bool: boolean) => void

  constructor(ctx: FunctionContext, { checked, fn }: SwitchInitializer) {
    this.checked = checked
    this._meta = ctx.meta
    this._formulaContext = ctx.formulaContext
    this.fn = fn
    this.disabled = false
    this.onChange = checked => {
      functionResult2lambda<SwitchType>(
        {
          ...ctx,
          interpretContext: { ...ctx.interpretContext, ctx: { checked: { type: 'boolean', result: checked } } }
        },
        fn,
        this
      )()
      this.checked = checked
    }
  }

  persistence(): SwitchInitializer {
    return {
      checked: this.checked,
      fn: this.fn
    }
  }
}
