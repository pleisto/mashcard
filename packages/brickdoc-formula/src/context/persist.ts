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

const VARIABLE_VERSION = 0

export const dumpDisplayResultForPersist = async (t: VariableData): Promise<VariableDisplayData> => {
  const value = t.async ? await t.variableValue : t.variableValue

  return {
    definition: t.definition,
    result: dumpValue(value.result) as AnyTypeResult,
    type: t.type,
    kind: t.kind,
    version: VARIABLE_VERSION,
    display: t.async ? 'Loading...' : displayValue(t.variableValue.result, ''),
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
    type: t.type,
    kind: t.kind,
    version: VARIABLE_VERSION,
    display: t.async ? 'Loading...' : displayValue(t.variableValue.result, ''),
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
      return v.result
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
      return `{ ${Object.entries(v.result)
        .map(([key, value]) => `${key}: ${displayValue(value as AnyTypeResult, pageId)}`)
        .join(', ')} }`
    case 'Array':
      return `[${v.result.map((v: AnyTypeResult) => displayValue(v, pageId)).join(', ')}]`
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
  }

  return JSON.stringify(v.result)
}

export const loadDisplayResult = (ctx: FunctionContext, displayResult: VariableDisplayData): VariableDisplayData => {
  return { ...displayResult, result: loadValue(ctx, displayResult.result) as any }
}

export const dumpValue = (cacheValue: BaseResult): BaseResult => {
  if (
    cacheValue.result instanceof ColumnClass ||
    cacheValue.result instanceof BlockClass ||
    cacheValue.result instanceof ButtonClass ||
    cacheValue.result instanceof SelectClass ||
    cacheValue.result instanceof SwitchClass
  ) {
    return { type: cacheValue.type, result: cacheValue.result.persistence() }
  }

  if (cacheValue.result instanceof SpreadsheetClass) {
    return {
      type: cacheValue.type,
      result: cacheValue.result.persistAll()
    }
  }

  return cacheValue
}

export const loadValue = (ctx: FunctionContext, cacheValue: BaseResult): AnyTypeResult => {
  if (cacheValue.type === 'Date' && !(cacheValue.result instanceof Date)) {
    return {
      type: 'Date',
      result: new Date(cacheValue.result)
    }
  }

  if (cacheValue.type === 'Spreadsheet' && !(cacheValue.result instanceof SpreadsheetClass)) {
    if (cacheValue.result.dynamic) {
      const { blockId, spreadsheetName, columns, rows, cells }: SpreadsheetDynamicPersistence =
        cacheValue.result.persistence!
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
      const spreadsheet = ctx.formulaContext.findSpreadsheet(cacheValue.result.blockId)
      if (spreadsheet) {
        return { type: 'Spreadsheet', result: spreadsheet }
      } else {
        return { type: 'Error', result: `Spreadsheet ${cacheValue.result.blockId} not found`, errorKind: 'deps' }
      }
    }
  }

  if (cacheValue.type === 'Column' && !(cacheValue.result instanceof ColumnClass)) {
    const spreadsheet = ctx.formulaContext.findSpreadsheet(cacheValue.result.namespaceId)
    if (spreadsheet) {
      return { type: 'Column', result: new ColumnClass(spreadsheet, cacheValue.result) }
    } else {
      return { type: 'Error', result: `Spreadsheet ${cacheValue.result.namespaceId} not found`, errorKind: 'deps' }
    }
  }

  if (cacheValue.type === 'Block' && !(cacheValue.result instanceof BlockClass)) {
    const blockResult = new BlockClass(ctx.formulaContext, cacheValue.result)
    return { type: 'Block', result: blockResult }
  }

  if (cacheValue.type === 'Button' && !(cacheValue.result instanceof ButtonClass)) {
    const buttonResult = new ButtonClass(ctx, cacheValue.result)
    return { type: 'Button', result: buttonResult }
  }

  if (cacheValue.type === 'Switch' && !(cacheValue.result instanceof SwitchClass)) {
    const switchResult = new SwitchClass(ctx, cacheValue.result)
    return { type: 'Switch', result: switchResult }
  }

  if (cacheValue.type === 'Select' && !(cacheValue.result instanceof SelectClass)) {
    const selectResult = new SelectClass(ctx, cacheValue.result)
    return { type: 'Select', result: selectResult }
  }

  // devLog({ cacheValue })

  return cacheValue as AnyTypeResult
}
