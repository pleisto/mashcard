import { BrickdocEventBus, FormulaInnerRefresh } from '@brickdoc/schema'
import { SelectInitializer, SelectOption, SelectType } from '.'
import { FunctionContext, FunctionResult, functionResult2lambda, VariableMetadata } from '..'

export class SelectClass implements SelectType {
  meta: VariableMetadata
  kind: 'Select' = 'Select'
  fn: FunctionResult
  value: SelectOption
  disabled: boolean
  options: [SelectOption, ...SelectOption[]]
  onChange?: (bool: string) => void

  constructor(ctx: FunctionContext, { options, fn, value }: SelectInitializer) {
    this.options = options
    this.meta = ctx.meta
    this.fn = fn
    this.disabled = false
    this.value = value
    this.onChange = option => {
      functionResult2lambda<SelectType>(
        {
          ...ctx,
          interpretContext: { ...ctx.interpretContext, ctx: { selected: { type: 'string', result: option } } }
        },
        fn,
        this
      )()
      this.value = option
      BrickdocEventBus.dispatch(
        FormulaInnerRefresh({ namespaceId: ctx.meta.namespaceId, variableId: ctx.meta.variableId })
      )
    }
  }
}
