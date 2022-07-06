import { AnyTypeResult, BaseResult, FunctionContext, NamespaceId, VariableData, VariableDisplayData } from '../types'
import { SwitchClass, ButtonClass, ColumnClass, SpreadsheetClass, SpreadsheetDynamicPersistence } from '../controls'
import { BlockClass } from '../controls/block'
import { fetchResult } from './variable'
import { truncateArray, truncateString } from '../grammar'
import { RowClass } from '../controls/row'

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

export const dumpValue = (result: BaseResult, t?: VariableData): BaseResult => {
  if (t && !t.variableParseResult.persist) {
    return { type: 'NoPersist', result: null }
  }

  if (
    result.result instanceof ColumnClass ||
    result.result instanceof BlockClass ||
    result.result instanceof RowClass ||
    result.result instanceof ButtonClass ||
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

// eslint-disable-next-line complexity
export const loadValue = (ctx: FunctionContext, result: BaseResult): AnyTypeResult => {
  if (result.type === 'Date' && !(result.result instanceof Date)) {
    return {
      type: 'Date',
      result: new Date(result.result)
    }
  }

  if (result.type === 'Spreadsheet' && !(result.result instanceof SpreadsheetClass)) {
    if (result.result.dynamic) {
      const { spreadsheetId, spreadsheetName, columns, rows, cells, namespaceId }: SpreadsheetDynamicPersistence =
        result.result.persistence!
      return {
        type: 'Spreadsheet',
        result: new SpreadsheetClass({
          ctx,
          spreadsheetId,
          namespaceId,
          dynamic: true,
          name: spreadsheetName,
          columns,
          rows,
          getCell: ({ rowId, columnId }) => {
            return cells.find(c => c.rowId === rowId && c.columnId === columnId)!
          }
        })
      }
    } else {
      const spreadsheet = ctx.formulaContext.findSpreadsheet({
        namespaceId: result.result.namespaceId,
        value: result.result.spreadsheetId,
        type: 'id'
      })
      if (spreadsheet) {
        return { type: 'Spreadsheet', result: spreadsheet }
      } else {
        return { type: 'Error', result: `Spreadsheet not found`, meta: 'deps' }
      }
    }
  }

  if (result.type === 'Range') {
    const spreadsheet = ctx.formulaContext.findSpreadsheet({
      namespaceId: result.result.namespaceId,
      type: 'id',
      value: result.result.spreadsheetId
    })
    return { type: 'Range', result: { ...result.result, spreadsheet } }
  }

  if (result.type === 'Column' && !(result.result instanceof ColumnClass)) {
    const column = ctx.formulaContext.findColumn(result.result.spreadsheetId, result.result.findKey)
    if (column) {
      return { type: 'Column', result: column }
    } else {
      return { type: 'Error', result: `Column not found`, meta: 'deps' }
    }
  }

  if (result.type === 'Row' && !(result.result instanceof RowClass)) {
    const row = ctx.formulaContext.findRow(result.result.spreadsheetId, result.result.findKey)
    if (row) {
      return { type: 'Row', result: row }
    } else {
      return { type: 'Error', result: `Row not found`, meta: 'deps' }
    }
  }

  if (result.type === 'Block' && !(result.result instanceof BlockClass)) {
    const block = ctx.formulaContext.findBlockById(result.result.id)
    if (block) {
      return { type: 'Block', result: block }
    } else {
      return { type: 'Error', result: `Block ${result.result.id} not found`, meta: 'deps' }
    }
  }

  if (result.type === 'Button' && !(result.result instanceof ButtonClass)) {
    const buttonResult = new ButtonClass(ctx, result.result)
    return { type: 'Button', result: buttonResult }
  }

  if (result.type === 'Switch' && !(result.result instanceof SwitchClass)) {
    const switchResult = new SwitchClass(ctx, result.result)
    return { type: 'Switch', result: switchResult }
  }

  // devLog({ result })

  return result as AnyTypeResult
}
