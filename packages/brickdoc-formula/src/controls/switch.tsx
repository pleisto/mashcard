import { BrickdocEventBus, FormulaInnerRefresh } from '@brickdoc/schema'
import { SwitchInitializer, SwitchType } from '.'
import { FunctionContext, FunctionResult, functionResult2lambda, VariableMetadata } from '..'

export class SwitchClass implements SwitchType {
  checked: boolean
  meta: VariableMetadata
  kind: 'Switch' = 'Switch'
  fn: FunctionResult
  disabled: boolean
  onChange?: (bool: boolean) => void

  constructor(ctx: FunctionContext, { checked, fn }: SwitchInitializer) {
    this.checked = checked
    this.meta = ctx.meta
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
      BrickdocEventBus.dispatch(
        FormulaInnerRefresh({ namespaceId: ctx.meta.namespaceId, variableId: ctx.meta.variableId })
      )
    }
  }
}
