import { AnyTypeResult, BaseResult, FunctionContext, NamespaceId, VariableData, VariableDisplayData } from '../types'
import {
  SwitchClass,
  ButtonClass,
  SelectClass,
  ColumnClass,
  SpreadsheetClass,
  SpreadsheetDynamicPersistence
} from '../controls'
import { BlockClass } from '../controls/block'
import { fetchResult } from './variable'
import { truncateArray, truncateString } from '../grammar'

const VARIABLE_VERSION = 0

export const dumpDisplayResultForPersist = async (t: VariableData): Promise<VariableDisplayData> => {
  const value = t.task.async ? await t.task.variableValue : t.task.variableValue

  return {
    definition: t.definition,
    result: dumpValue(value.result) as AnyTypeResult,
    type: t.type,
    isAsync: t.isAsync,
    kind: t.kind,
    version: VARIABLE_VERSION,
    display: displayValue(fetchResult(t), ''),
    meta: {
      namespaceId: t.namespaceId,
      variableId: t.variableId,
      name: t.name,
      position: 0,
      input: t.definition,
      type: t.type
    }
  }
}

export const dumpDisplayResultForDisplay = (t: VariableData): VariableDisplayData => {
  return {
    definition: t.definition,
    result: fetchResult(t),
    isAsync: t.isAsync,
    type: t.type,
    kind: t.kind,
    version: VARIABLE_VERSION,
    display: displayValue(fetchResult(t), ''),
    meta: {
      namespaceId: t.namespaceId,
      variableId: t.variableId,
      name: t.name,
      position: 0,
      input: t.definition,
      type: t.type
    }
  }
}

export const displayValue = (v: AnyTypeResult, pageId: NamespaceId): string => {
  switch (v.type) {
    case 'number':
      return String(v.result)
    case 'boolean':
      // return v.result ? '✓' : '✗'
      return String(v.result)
    case 'string':
      return truncateString(v.result)
    case 'Date':
      return v.result.toISOString()
    case 'Error':
      return `#<Error> ${v.result}`
    case 'Spreadsheet':
      return v.result.name()
    case 'Block':
      return v.result.name(pageId)
    case 'Column':
      return `${v.result.spreadsheet.name()}.${v.result.name}`
    case 'Predicate':
      return `[${v.operator}] ${displayValue(v.result, pageId)}`
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
    case 'Select':
      return `#<${v.type}> ${JSON.stringify(v.result.options)}`
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
  return { ...displayResult, result: loadValue(ctx, displayResult.result) as any }
}

export const dumpValue = (result: BaseResult): BaseResult => {
  if (
    result.result instanceof ColumnClass ||
    result.result instanceof BlockClass ||
    result.result instanceof ButtonClass ||
    result.result instanceof SelectClass ||
    result.result instanceof SwitchClass
  ) {
    return { type: result.type, result: result.result.persistence() }
  }

  if (result.result instanceof SpreadsheetClass) {
    return {
      type: result.type,
      result: result.result.persistAll()
    }
  }

  return result
}

export const loadValue = (ctx: FunctionContext, result: BaseResult): AnyTypeResult => {
  if (result.type === 'Date' && !(result.result instanceof Date)) {
    return {
      type: 'Date',
      result: new Date(result.result)
    }
  }

  if (result.type === 'Spreadsheet' && !(result.result instanceof SpreadsheetClass)) {
    if (result.result.dynamic) {
      const { blockId, spreadsheetName, columns, rows, cells }: SpreadsheetDynamicPersistence =
        result.result.persistence!
      return {
        type: 'Spreadsheet',
        result: new SpreadsheetClass({
          ctx,
          blockId,
          dynamic: true,
          name: spreadsheetName,
          listColumns: () => columns,
          listRows: () => rows,
          listCells: ({ rowId, columnId }) => {
            let finalCells = cells
            if (rowId) {
              finalCells = finalCells.filter(cell => cell.rowId === rowId)
            }
            if (columnId) {
              finalCells = finalCells.filter(cell => cell.columnId === columnId)
            }
            return finalCells
          }
        })
      }
    } else {
      const spreadsheet = ctx.formulaContext.findSpreadsheet(result.result.blockId)
      if (spreadsheet) {
        return { type: 'Spreadsheet', result: spreadsheet }
      } else {
        return { type: 'Error', result: `Spreadsheet ${result.result.blockId} not found`, errorKind: 'deps' }
      }
    }
  }

  if (result.type === 'Column' && !(result.result instanceof ColumnClass)) {
    const spreadsheet = ctx.formulaContext.findSpreadsheet(result.result.namespaceId)
    if (spreadsheet) {
      return { type: 'Column', result: new ColumnClass(spreadsheet, result.result) }
    } else {
      return { type: 'Error', result: `Spreadsheet ${result.result.namespaceId} not found`, errorKind: 'deps' }
    }
  }

  if (result.type === 'Block' && !(result.result instanceof BlockClass)) {
    const blockResult = new BlockClass(ctx.formulaContext, result.result)
    return { type: 'Block', result: blockResult }
  }

  if (result.type === 'Button' && !(result.result instanceof ButtonClass)) {
    const buttonResult = new ButtonClass(ctx, result.result)
    return { type: 'Button', result: buttonResult }
  }

  if (result.type === 'Switch' && !(result.result instanceof SwitchClass)) {
    const switchResult = new SwitchClass(ctx, result.result)
    return { type: 'Switch', result: switchResult }
  }

  if (result.type === 'Select' && !(result.result instanceof SelectClass)) {
    const selectResult = new SelectClass(ctx, result.result)
    return { type: 'Select', result: selectResult }
  }

  // devLog({ result })

  return result as AnyTypeResult
}
