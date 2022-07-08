import {
  AnyDisplayResult,
  AnyDumpResult,
  AnyTypeResult,
  ContextInterface,
  UsedFormulaType,
  VariableData,
  VariableDisplayData,
  VariableMetadata
} from '../type'
import { fetchResult } from './variable'
import { FormulaAttributes } from '../types'

export const dumpDisplayResultForDisplay = ([t, meta]:
  | [t: VariableData]
  | [t: VariableData, meta: VariableMetadata]
  | [t: undefined, meta: VariableMetadata]): VariableDisplayData => {
  if (t) {
    return {
      definition: t.variableParseResult.definition,
      result: fetchResult(t),
      type: t.meta.richType.type
    }
  }

  return {
    definition: meta.input,
    result: { type: 'Blank', result: 'Blank' },
    type: meta.richType.type
  }
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
