import {
  ColumnId,
  ColumnKey,
  FunctionClause,
  FunctionCompletion,
  NamespaceId,
  SpreadsheetCompletion,
  BlockKey,
  VariableCompletion,
  VariableId,
  VariableInterface,
  VariableKey,
  BlockCompletion,
  ContextInterface,
  FunctionKey,
  CodeFragmentAttrs,
  CodeFragment,
  Completion,
  SpreadsheetKey,
  ColumnCompletion
} from '../types'
import { BlockType, ColumnType, RowType, SpreadsheetType } from '../controls'
import { maybeEncodeString, parseString, reverseTraversalString } from './util'
import { fetchResult } from '../context'

export const variableKey = (namespaceId: NamespaceId, variableId: VariableId): VariableKey =>
  `#${namespaceId}.${variableId}`

export const blockKey = (namespaceId: NamespaceId): BlockKey => `#${namespaceId}`

export const currentBlockKey = (namespaceId: NamespaceId, pageId: NamespaceId | undefined): BlockKey =>
  namespaceId === pageId ? '#CurrentBlock' : blockKey(namespaceId)

export const columnKey = (namespaceId: NamespaceId, columnId: ColumnId): ColumnKey => `#${namespaceId}.${columnId}`

const block2attrs = (block: BlockType, pageId: NamespaceId): CodeFragmentAttrs => ({
  kind: 'Block',
  namespaceId: block.id,
  id: block.id,
  name: block.name(pageId),
  findKey: { namespaceId: block.id, type: 'id', value: block.id }
})

export const variable2attrs = (variable: VariableInterface): CodeFragmentAttrs => ({
  kind: 'Variable',
  namespaceId: variable.t.namespaceId,
  id: variable.t.variableId,
  name: variable.t.name,
  findKey: { namespaceId: variable.t.namespaceId, type: 'id', value: variable.t.variableId }
})

export const spreadsheet2attrs = (spreadsheet: SpreadsheetType): CodeFragmentAttrs => ({
  kind: 'Spreadsheet',
  namespaceId: spreadsheet.namespaceId,
  id: spreadsheet.spreadsheetId,
  name: spreadsheet.name(),
  findKey: { namespaceId: spreadsheet.namespaceId, type: 'id', value: spreadsheet.spreadsheetId }
})

export const column2attrs = (column: ColumnType): CodeFragmentAttrs => ({
  kind: column.logic ? 'LogicColumn' : 'Column',
  namespaceId: column.spreadsheet.spreadsheetId,
  id: column.columnId,
  name: column.display(),
  findKey: column.findKey
})

export const row2attrs = (row: RowType): CodeFragmentAttrs => ({
  kind: row.logic ? 'LogicRow' : 'Row',
  namespaceId: row.spreadsheetId,
  id: row.rowId,
  name: row.display(),
  findKey: row.findKey
})

const renderText = ({ code, display }: CodeFragment, text: string, value: string): string => {
  if (!['Spreadsheet', 'Column', 'Variable', 'Block'].includes(code)) return text
  if (display === text) return value

  if (text.startsWith(display)) {
    const body = maybeEncodeString(display)[1]
    const suffix = text.substring(display.length)
    return body.concat(suffix)
  }

  if (text.endsWith(display)) {
    const body = maybeEncodeString(display)[1]
    const prefix = text.substring(0, text.length - display.length)
    return prefix.concat(body)
  }

  return text
}

export const codeFragment2string = (codeFragment: CodeFragment): string => {
  const value = codeFragment2value(codeFragment, undefined)
  if (codeFragment.code === 'StringLiteral') return parseString(value)
  if (codeFragment.code === 'NumberLiteral') return value
  if (codeFragment.code === 'FunctionName') return value

  return ''
}

export const codeFragments2definition = (codeFragments: CodeFragment[], pageId: string): string => {
  return codeFragments
    .map((c, idx, arr) => codeFragment2display(c, c.display, arr[idx - 1]?.display ?? '', pageId))
    .join('')
}

export const codeFragment2value = (
  { display, code, attrs, valuePrefix }: CodeFragment,
  pageId: string | undefined
): string => {
  let suffix
  switch (code) {
    case 'Block':
      suffix = currentBlockKey(attrs.id, pageId)
      break
    case 'Column':
    case 'Variable':
    case 'Spreadsheet':
      suffix = maybeEncodeString(attrs.name)[1]
      break
    default:
      suffix = display
  }

  if (!valuePrefix) return suffix
  return valuePrefix.concat(suffix)
}

export const codeFragment2display = (
  codeFragment: CodeFragment,
  text: string,
  prevText: string,
  pageId: string
): string => {
  const { code, attrs } = codeFragment
  const value = codeFragment2value(codeFragment, pageId)
  const finalText = renderText(codeFragment, text, value)
  if (code === 'Variable' && prevText !== '.' && pageId === attrs.namespaceId) {
    return `#CurrentBlock.${finalText}`
  }
  if (
    code === 'Spreadsheet' &&
    prevText !== '.' &&
    pageId === attrs.namespaceId &&
    !value.startsWith('#CurrentBlock') &&
    !text.toUpperCase().startsWith('THISRECORD')
  ) {
    return `#CurrentBlock.${finalText}`
  }
  return finalText
}

export const block2codeFragment = (block: BlockType, pageId: NamespaceId): CodeFragment => {
  return {
    display: block.name(pageId),
    errors: [],
    hide: false,
    code: 'Block',
    type: 'Block',
    attrs: block2attrs(block, pageId)
  }
}

export const column2codeFragment = (column: ColumnType, pageId: NamespaceId): CodeFragment => {
  // const value = columnKey(column.namespaceId, column.columnId)
  return {
    display: column.display(),
    errors: [],
    code: 'Column',
    type: 'Column',
    hide: false,
    attrs: column2attrs(column)
  }
}

export const row2codeFragment = (row: RowType, pageId: NamespaceId): CodeFragment => {
  return {
    display: row.display(),
    errors: [],
    code: 'Row',
    type: 'Row',
    hide: false,
    attrs: row2attrs(row)
  }
}

export const column2completion = (column: ColumnType, pageId: NamespaceId): ColumnCompletion => {
  const value = columnKey(column.spreadsheetId, column.columnId)
  return {
    kind: 'column',
    replacements: [`${column.name}`],
    weight: 1000,
    name: column.name,
    positionChange: value.length,
    namespace: column.spreadsheet.name(),
    value,
    preview: column,
    codeFragments: [column2codeFragment(column, pageId)]
  }
}

export const variable2codeFragment = (variable: VariableInterface, pageId: NamespaceId): CodeFragment => {
  return {
    display: variable.t.name,
    errors: [],
    code: 'Variable',
    hide: false,
    type: fetchResult(variable.t).type,
    attrs: variable2attrs(variable)
  }
}

export const block2completion = (ctx: ContextInterface, block: BlockType, pageId: NamespaceId): BlockCompletion => {
  const value = currentBlockKey(block.id, pageId)
  const name = block.name(pageId)
  return {
    kind: 'block',
    weight: block.id === pageId ? 1 : -1,
    replacements: [value, ...reverseTraversalString(name)],
    positionChange: value.length,
    name,
    namespace: block.id,
    value,
    preview: block,
    codeFragments: [block2codeFragment(block, pageId)]
  }
}

export const spreadsheet2codeFragment = (spreadsheet: SpreadsheetType, pageId: NamespaceId): CodeFragment => {
  // const namespaceKey = currentBlockKey(spreadsheet.namespaceId, pageId)
  // const value: SpreadsheetKey = `${namespaceKey}.${spreadsheet.name()}`
  return {
    display: spreadsheet.name(),
    errors: [],
    code: 'Spreadsheet',
    type: 'Spreadsheet',
    hide: false,
    attrs: spreadsheet2attrs(spreadsheet)
  }
}

export const spreadsheet2completion = (spreadsheet: SpreadsheetType, pageId: NamespaceId): SpreadsheetCompletion => {
  const namespaceKey = currentBlockKey(spreadsheet.namespaceId, pageId)
  const name = spreadsheet.name()
  const value: SpreadsheetKey = `${namespaceKey}.${name}`
  const codeFragment = spreadsheet2codeFragment(spreadsheet, pageId)
  return {
    kind: 'spreadsheet',
    replacements: [...reverseTraversalString(value, namespaceKey.length), ...reverseTraversalString(name)],
    weight: 10,
    name,
    positionChange: value.length,
    namespace: spreadsheet.spreadsheetId,
    value,
    preview: spreadsheet,
    codeFragments: [{ ...codeFragment, valuePrefix: `${namespaceKey}.` }]
  }
}

export const variable2completion = (variable: VariableInterface, pageId: NamespaceId): VariableCompletion => {
  const name = variable.t.name
  const namespaceKey = currentBlockKey(variable.t.namespaceId, pageId)
  const value: VariableKey = `${namespaceKey}.${name}`
  const namespaceName = variable.namespaceName(pageId)
  const codeFragment = variable2codeFragment(variable, pageId)
  return {
    kind: 'variable',
    replacements: [...reverseTraversalString(value, namespaceKey.length), ...reverseTraversalString(name)],
    weight: variable.t.namespaceId === pageId ? 1 : -1,
    name: variable.t.name,
    namespace: namespaceName,
    value,
    preview: variable,
    positionChange: value.length,
    codeFragments: [{ ...codeFragment, valuePrefix: `${namespaceKey}.` }]
  }
}

export const function2completion = (functionClause: FunctionClause<any>, weight: number): FunctionCompletion => {
  const value: `${FunctionKey}()` = `${functionClause.key}()`
  return {
    kind: 'function',
    replacements: reverseTraversalString(value),
    weight,
    name: functionClause.name,
    namespace: functionClause.group,
    value,
    preview: functionClause,
    positionChange: value.length - 1,
    codeFragments: [
      {
        display: value,
        errors: [],
        code: 'Function',
        type: 'any',
        hide: false,
        attrs: undefined
      }
    ]
  }
}

export const attrs2completion = (
  formulaContext: ContextInterface,
  { kind, id, namespaceId }: CodeFragmentAttrs,
  pageId: string
): Completion | undefined => {
  if (kind === 'Variable') {
    const variable = formulaContext.findVariableById(namespaceId, id)
    if (!variable) return undefined
    return variable2completion(variable, pageId)
  }

  return undefined
}
