import {
  AnyDumpResult,
  AnyTypeResult,
  ContextInterface,
  FunctionContext,
  NamespaceId,
  UsedFormulaType,
  VariableData,
  VariableDisplayData
} from '../type'
import { fetchResult } from './variable'
import { truncateArray, truncateString } from '../grammar'
import { FormulaAttributes } from '../types'

export const dumpDisplayResultForDisplay = (t: VariableData): VariableDisplayData => {
  return {
    definition: t.variableParseResult.definition,
    result: fetchResult(t),
    display: displayValue(fetchResult(t), ''),
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

export const displayValue = (v: AnyTypeResult, pageId: NamespaceId, disableTruncate: boolean = false): string => {
  return innerDisplayValue(v, pageId, disableTruncate)
}

// eslint-disable-next-line complexity
const innerDisplayValue = (v: AnyTypeResult, pageId: NamespaceId, disableTruncate: boolean = false): string => {
  switch (v.type) {
    case 'number':
      return String(v.result)
    case 'boolean':
      // return v.result ? '✓' : '✗'
      return String(v.result)
    case 'literal':
    case 'string':
      return truncateString(v.result, disableTruncate ? -1 : undefined)
    case 'Date':
      if (isNaN(v.result as unknown as number)) return v.result.toDateString()
      return v.result.toISOString()
    case 'Error':
      return `#<Error> ${v.result}`
    case 'Spreadsheet':
      return v.result.name()
    case 'Block':
      return v.result.name(pageId)
    case 'Column':
      return `${v.result.spreadsheet.name()}.${v.result.display()}`
    case 'Row':
      return `Row[${v.result.rowIndex}]`
    case 'Range':
      return `${v.result.columnSize}*${v.result.rowSize}`
    case 'Cell':
      return `${v.result.getValue()}`
    case 'Predicate':
      return `[${v.meta.operator}] ${v.result}`
    case 'Record':
      // eslint-disable-next-line no-case-declarations
      const recordArray = Object.entries(v.result).map(
        ([key, value]) => `${key}: ${displayValue(value as AnyTypeResult, pageId)}`
      )
      // eslint-disable-next-line no-case-declarations
      const recordResult = truncateArray(recordArray).join(', ')
      return `{ ${recordResult} }`
    case 'Array':
      // eslint-disable-next-line no-case-declarations
      const arrayArray = v.result.map((v: AnyTypeResult) => displayValue(v, pageId))
      // eslint-disable-next-line no-case-declarations
      const arrayResult = truncateArray(arrayArray).join(', ')
      return `[${arrayResult}]`
    case 'Button':
      return `#<${v.type}> ${v.result.name}`
    case 'Switch':
      return `#<${v.type}> ${v.result.checked}`
    case 'Reference':
      return `#<Reference> ${JSON.stringify(v.result)}`
    case 'Function':
      return `#<Function> ${v.result.map(
        ({ name, args }) => `${name} ${args.map(a => displayValue(a, pageId)).join(', ')}`
      )}`
    case 'Cst':
      return '#<Cst>'
    case 'Blank':
      return `#N/A`
    case 'Pending':
      return v.result
  }

  return JSON.stringify(v.result)
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

export const display = <T extends UsedFormulaType, Value extends AnyTypeResult<T>>(v: Value): string => {
  return FormulaAttributes[v.type].display(v as any, display)
}
