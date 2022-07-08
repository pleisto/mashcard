import {
  AnyDisplayResult,
  AnyDumpResult,
  AnyTypeResult,
  ContextInterface,
  FunctionContext,
  UsedFormulaType,
  VariableData,
  VariableDisplayData
} from '../type'
import { fetchResult } from './variable'
import { FormulaAttributes } from '../types'

export const dumpDisplayResultForDisplay = (t: VariableData): VariableDisplayData => {
  return {
    definition: t.variableParseResult.definition,
    result: fetchResult(t),
    display: display(fetchResult(t)).result,
    meta: {
      namespaceId: t.meta.namespaceId,
      variableId: t.meta.variableId,
      name: t.meta.name,
      position: t.variableParseResult.position,
      input: t.variableParseResult.definition,
      richType: t.meta.richType
    }
  }
}

export const loadDisplayResult = (ctx: FunctionContext, displayResult: VariableDisplayData): VariableDisplayData => {
  return { ...displayResult, result: cast(displayResult.result as any, ctx.formulaContext) as any }
}

export const dumpValue = (result: AnyTypeResult, t?: VariableData): any => {
  if (t && !t.variableParseResult.persist) {
    return { type: 'NoPersist', result: null }
  }

  return dump(result)
}

export const dump = <T extends UsedFormulaType, Value extends AnyTypeResult<T>, Dump extends AnyDumpResult<T>>(
  v: Value
): Dump => {
  const result: any = FormulaAttributes[v.type].dump(v as any, dump)
  return result
}

export const cast = <T extends UsedFormulaType, Value extends AnyTypeResult<T>, Dump extends AnyDumpResult<T>>(
  dump: Dump,
  ctx: ContextInterface
): Value => {
  const result: any = FormulaAttributes[dump.type].cast(dump as any, ctx, cast)
  return result
}

export const display = <T extends UsedFormulaType, Value extends AnyTypeResult<T>, Display extends AnyDisplayResult<T>>(
  v: Value
): Display => {
  const result: any = FormulaAttributes[v.type].display(v as any, display)
  return result
}
