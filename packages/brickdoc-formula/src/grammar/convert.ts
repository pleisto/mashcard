import {
  NamespaceId,
  BlockKey,
  VariableId,
  VariableInterface,
  VariableKey,
  CodeFragmentAttrs,
  CodeFragment
} from '../types'
import { BlockType, ColumnType, RowType, SpreadsheetType } from '../controls'
import { encodeString, maybeEncodeString, parseString } from './util'
import { fetchResult } from '../context'

export const variableKey = (namespaceId: NamespaceId, variableId: VariableId): VariableKey =>
  `#${namespaceId}.${variableId}`

export const blockKey = (namespaceId: NamespaceId): BlockKey => `#${namespaceId}`

export const currentBlockKey = (namespaceId: NamespaceId, pageId: NamespaceId | undefined): BlockKey =>
  namespaceId === pageId ? '#CurrentBlock' : blockKey(namespaceId)

const block2attrs = (block: BlockType, pageId: NamespaceId): CodeFragmentAttrs => ({
  kind: 'Block',
  namespaceId: block.id,
  id: block.id,
  name: block.name(pageId),
  findKey: { namespaceId: block.id, type: 'id', value: block.id }
})

export const variable2attrs = (variable: VariableInterface): CodeFragmentAttrs => ({
  kind: 'Variable',
  namespaceId: variable.t.meta.namespaceId,
  id: variable.t.meta.variableId,
  name: variable.t.meta.name,
  findKey: { namespaceId: variable.t.meta.namespaceId, type: 'id', value: variable.t.meta.variableId }
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

export const codeFragment2string = (codeFragment: CodeFragment): string => {
  const value = codeFragment2value(codeFragment, undefined)
  if (codeFragment.code === 'StringLiteral') return parseString(value)
  if (codeFragment.code === 'NumberLiteral') return value
  if (codeFragment.code === 'FunctionName') return value

  return ''
}

export const codeFragments2definition = (codeFragments: CodeFragment[], pageId: string): string => {
  return codeFragments.map(c => codeFragment2value(c, pageId)).join('')
}

export const codeFragment2value = ({ display, code, attrs }: CodeFragment, pageId: string | undefined): string => {
  switch (code) {
    case 'Block':
      return currentBlockKey(attrs.id, pageId)
    case 'Column':
    case 'Variable':
    case 'Spreadsheet':
      return maybeEncodeString(attrs.name)[1]
    default:
      return display
  }
}

export const block2codeFragment = (block: BlockType, pageId: NamespaceId): CodeFragment => {
  return {
    replacements: [`#${block.id}`],
    display: block.name(pageId),
    errors: [],
    code: 'Block',
    type: 'Block',
    namespaceId: block.id,
    attrs: block2attrs(block, pageId)
  }
}

export const column2codeFragment = (column: ColumnType, pageId: NamespaceId): CodeFragment => {
  // const value = columnKey(column.namespaceId, column.columnId)
  return {
    replacements: [column.display(), encodeString(column.display())],
    display: maybeEncodeString(column.display())[1],
    errors: [],
    code: 'Column',
    type: 'Column',
    namespaceId: column.namespaceId,
    attrs: column2attrs(column)
  }
}

export const row2codeFragment = (row: RowType, pageId: NamespaceId): CodeFragment => {
  return {
    display: row.display(),
    errors: [],
    code: 'Row',
    type: 'Row',
    namespaceId: row.namespaceId,
    attrs: row2attrs(row)
  }
}

export const variable2codeFragment = (variable: VariableInterface, pageId: NamespaceId): CodeFragment => {
  return {
    display: variable.t.meta.name,
    errors: [],
    code: 'Variable',
    type: fetchResult(variable.t).type,
    namespaceId: variable.t.meta.namespaceId,
    attrs: variable2attrs(variable)
  }
}

export const spreadsheet2codeFragment = (spreadsheet: SpreadsheetType, pageId: NamespaceId): CodeFragment => {
  // const namespaceKey = currentBlockKey(spreadsheet.namespaceId, pageId)
  // const value: SpreadsheetKey = `${namespaceKey}.${spreadsheet.name()}`
  return {
    replacements: [spreadsheet.name(), encodeString(spreadsheet.name())],
    display: maybeEncodeString(spreadsheet.name())[1],
    errors: [],
    code: 'Spreadsheet',
    type: 'Spreadsheet',
    namespaceId: spreadsheet.namespaceId,
    attrs: spreadsheet2attrs(spreadsheet)
  }
}
