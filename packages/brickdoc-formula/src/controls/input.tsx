import { BrickdocEventBus, FormulaInnerRefresh } from '@brickdoc/schema'
import { InputInitializer, InputType } from './types'
import { ContextInterface, FunctionContext, FunctionResult, VariableMetadata } from '../types'
import { functionResult2lambda } from '../grammar/lambda'

export class InputClass implements InputType {
  _meta: VariableMetadata
  _formulaContext: ContextInterface
  kind: 'Input' = 'Input'
  fn: FunctionResult
  value: string
  disabled: boolean
  onChange?: (bool: string) => void

  constructor(ctx: FunctionContext, { fn, value }: InputInitializer) {
    this._meta = ctx.meta
    this._formulaContext = ctx.formulaContext
    this.fn = fn
    this.disabled = false
    this.value = value
    this.onChange = value => {
      functionResult2lambda<InputType>(
        {
          ...ctx,
          interpretContext: { ...ctx.interpretContext, ctx: { value: { type: 'string', result: value } } }
        },
        fn,
        this
      )()
      this.value = value
      BrickdocEventBus.dispatch(
        FormulaInnerRefresh({ namespaceId: ctx.meta.namespaceId, variableId: ctx.meta.variableId })
      )
    }
  }
}
