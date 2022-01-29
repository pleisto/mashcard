import {
  ColumnCompletion,
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
  BlockFormulaName,
  ContextInterface,
  FunctionKey,
  CodeFragmentAttrs
} from '../types'
import { BlockType, ColumnType, SpreadsheetType } from '../controls'
import { BlockClass } from '../controls/block'

export const variableKey = (namespaceId: NamespaceId, variableId: VariableId): VariableKey =>
  `#${namespaceId}.${variableId}`

export const blockKey = (namespaceId: NamespaceId): BlockKey => `#${namespaceId}`

export const columnKey = (namespaceId: NamespaceId, columnId: ColumnId): ColumnKey => `#${namespaceId}.${columnId}`

export const block2attrs = (block: BlockType): CodeFragmentAttrs => ({
  kind: 'Block',
  namespaceId: block.id,
  id: block.id,
  name: block.name()
})

export const variable2attrs = (variable: VariableInterface): CodeFragmentAttrs => ({
  kind: 'Variable',
  namespaceId: variable.t.namespaceId,
  id: variable.t.variableId,
  name: variable.t.name
})

export const spreadsheet2attrs = (spreadsheet: SpreadsheetType): CodeFragmentAttrs => ({
  kind: 'Spreadsheet',
  namespaceId: spreadsheet.blockId,
  id: spreadsheet.blockId,
  name: spreadsheet.name()
})

export const column2attrs = (column: ColumnType): CodeFragmentAttrs => ({
  kind: 'Column',
  namespaceId: column.spreadsheet.blockId,
  id: column.columnId,
  name: column.name
})

export const block2completion = (
  ctx: ContextInterface,
  { key, name, value }: BlockFormulaName,
  weight: number
): BlockCompletion => {
  const block = new BlockClass(ctx, { id: key })
  return {
    kind: 'block',
    weight: weight + 0,
    replacements: [name],
    positionChange: value.length,
    name,
    namespace: key,
    value,
    preview: block,
    renderDescription: blockId => '',
    codeFragment: {
      display: block.name(),
      errors: [],
      value,
      code: 'Block',
      type: 'any',
      attrs: block2attrs(block)
    }
  }
}

export const spreadsheet2completion = (spreadsheet: SpreadsheetType): SpreadsheetCompletion => {
  const value = blockKey(spreadsheet.blockId)
  return {
    kind: 'spreadsheet',
    replacements: [spreadsheet.name()],
    weight: 10,
    name: spreadsheet.name(),
    positionChange: value.length,
    namespace: spreadsheet.blockId,
    value,
    preview: spreadsheet,
    renderDescription: blockId => '',
    codeFragment: {
      display: spreadsheet.name(),
      errors: [],
      value,
      code: 'Spreadsheet',
      type: 'any',
      attrs: spreadsheet2attrs(spreadsheet)
    }
  }
}

export const column2completion = (column: ColumnType): ColumnCompletion => {
  const value = columnKey(column.namespaceId, column.columnId)
  return {
    kind: 'column',
    replacements: [
      `${blockKey(column.namespaceId)}.${column.name}`,
      `${blockKey(column.namespaceId)}.`,
      `${blockKey(column.namespaceId)}`,
      `${column.name}`
    ],
    weight: -3,
    name: column.name,
    positionChange: value.length,
    namespace: column.spreadsheet.name(),
    value,
    preview: column,
    renderDescription: blockId => column.spreadsheet.name(),
    codeFragment: {
      display: column.name,
      errors: [],
      value,
      code: 'Column',
      type: 'any',
      attrs: column2attrs(column)
    }
  }
}

export const variable2completion = (variable: VariableInterface, weight: number): VariableCompletion => {
  const value: VariableKey = `${blockKey(variable.t.namespaceId)}.${variable.t.name}`
  return {
    kind: 'variable',
    replacements: [`${blockKey(variable.t.namespaceId)}.`, blockKey(variable.t.namespaceId), variable.t.name],
    weight,
    name: variable.t.name,
    namespace: variable.namespaceName(),
    value,
    preview: variable,
    positionChange: value.length,
    renderDescription: blockId => (blockId === variable.t.namespaceId ? '' : variable.namespaceName()),
    codeFragment: {
      display: variable.t.name,
      errors: [],
      value,
      code: 'Variable',
      type: 'any',
      attrs: variable2attrs(variable)
    }
  }
}

export const function2completion = (functionClause: FunctionClause<any>, weight: number): FunctionCompletion => {
  const value: `${FunctionKey}()` = `${functionClause.key}()`
  return {
    kind: 'function',
    replacements: [functionClause.name],
    weight,
    name: functionClause.name,
    namespace: functionClause.group,
    value,
    preview: functionClause,
    positionChange: value.length - 1,
    renderDescription: blockId => (functionClause.group === 'core' ? '' : functionClause.group),
    codeFragment: {
      display: value,
      errors: [],
      value,
      code: 'Function',
      type: 'any',
      attrs: undefined
    }
  }
}
