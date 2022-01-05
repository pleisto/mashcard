import { BrickdocEventBus, FormulaInnerRefresh } from '@brickdoc/schema'
import { SwitchInitializer, SwitchType } from './types'
import { ContextInterface, FunctionContext, FunctionResult, VariableMetadata } from '../types'
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
      BrickdocEventBus.dispatch(
        FormulaInnerRefresh({ namespaceId: ctx.meta.namespaceId, variableId: ctx.meta.variableId })
      )
    }
  }
}
