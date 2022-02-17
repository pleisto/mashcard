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
  CodeFragmentAttrs,
  VariableFormulaName,
  CodeFragment,
  SpreadsheetFormulaName
} from '../types'
import { BlockType, ColumnType, SpreadsheetType } from '../controls'
import { BlockClass } from '../controls/block'
import { maybeEncodeString } from './util'

export const variableKey = (namespaceId: NamespaceId, variableId: VariableId): VariableKey =>
  `#${namespaceId}.${variableId}`

export const blockKey = (namespaceId: NamespaceId): BlockKey => `#${namespaceId}`

export const columnKey = (namespaceId: NamespaceId, columnId: ColumnId): ColumnKey => `#${namespaceId}.${columnId}`

export const variableRenderText = (variable: VariableInterface): CodeFragment['renderText'] => {
  return (text, { display }, prevText) => {
    const [valid, finalText] = maybeEncodeString(text)
    let result = finalText
    let prefix = ''

    if (!valid && text !== display) {
      if (text.startsWith(display)) {
        const body = maybeEncodeString(display)[1]
        const rest = text.substring(display.length)
        result = body.concat(rest)
      }

      if (text.endsWith(display)) {
        result = maybeEncodeString(display)[1]
        prefix = text.substring(0, text.length - display.length)
      }
    }

    const resultAfterNamespace = prevText === '.' ? result : `#${variable.t.namespaceId}.${result}`
    return prefix.concat(resultAfterNamespace)
  }
}

const blockRenderText = (block: BlockType | SpreadsheetType): CodeFragment['renderText'] => {
  return (text, { display, value }, prevText) => {
    if (text === display) {
      return value
    }

    if (text.startsWith(display)) {
      const suffix = text.substring(display.length)
      return value.concat(suffix)
    }

    if (text.endsWith(display)) {
      const prefix = text.substring(0, text.length - display.length)
      return prefix.concat(value)
    }

    const [, finalText] = maybeEncodeString(text)
    return finalText
  }
}

const block2attrs = (block: BlockType): CodeFragmentAttrs => ({
  kind: 'Block',
  namespaceId: block.id,
  id: block.id,
  name: block.name()
})

const variable2attrs = (variable: VariableInterface): CodeFragmentAttrs => ({
  kind: 'Variable',
  namespaceId: variable.t.namespaceId,
  id: variable.t.variableId,
  name: variable.t.name
})

const spreadsheet2attrs = (spreadsheet: SpreadsheetType): CodeFragmentAttrs => ({
  kind: 'Spreadsheet',
  namespaceId: spreadsheet.blockId,
  id: spreadsheet.blockId,
  name: spreadsheet.name()
})

const column2attrs = (column: ColumnType): CodeFragmentAttrs => ({
  kind: 'Column',
  namespaceId: column.spreadsheet.blockId,
  id: column.columnId,
  name: column.name
})

export const block2codeFragment = (block: BlockType): CodeFragment => {
  return {
    display: block.name(),
    errors: [],
    renderText: blockRenderText(block),
    hide: false,
    value: blockKey(block.id),
    code: 'Block',
    type: 'any',
    attrs: block2attrs(block)
  }
}

export const variable2codeFragment = (variable: VariableInterface): CodeFragment => {
  return {
    display: variable.t.name,
    errors: [],
    value: maybeEncodeString(variable.t.name)[1],
    code: 'Variable',
    renderText: variableRenderText(variable),
    hide: false,
    type: variable.t.variableValue.result.type,
    attrs: variable2attrs(variable)
  }
}

export const spreadsheet2codeFragment = (spreadsheet: SpreadsheetType): CodeFragment => {
  const value = blockKey(spreadsheet.blockId)
  return {
    display: spreadsheet.name(),
    errors: [],
    value,
    code: 'Spreadsheet',
    type: 'any',
    renderText: blockRenderText(spreadsheet),
    hide: false,
    attrs: spreadsheet2attrs(spreadsheet)
  }
}

export const column2codeFragment = (column: ColumnType): CodeFragment => {
  const value = columnKey(column.namespaceId, column.columnId)
  return {
    display: column.name,
    errors: [],
    value,
    code: 'Column',
    type: 'any',
    renderText: undefined,
    hide: false,
    attrs: column2attrs(column)
  }
}

export const block2name = (block: BlockType): BlockFormulaName => {
  return {
    kind: 'Block',
    name: block.name(),
    namespaceId: block.id,
    renderTokens: () => [
      { image: '#', type: 'Sharp' },
      { image: block.id, type: 'UUID' }
    ],
    key: block.id
  }
}

export const spreadsheet2name = (spreadsheet: SpreadsheetType): SpreadsheetFormulaName => {
  return {
    kind: 'Spreadsheet',
    name: spreadsheet.name(),
    namespaceId: spreadsheet.blockId,
    renderTokens: () => [
      { image: '#', type: 'Sharp' },
      { image: spreadsheet.blockId, type: 'UUID' }
    ],
    key: spreadsheet.blockId
  }
}

export const variable2name = (variable: VariableInterface): VariableFormulaName => {
  const {
    t: { namespaceId, name, variableId }
  } = variable
  const nameToken = { image: maybeEncodeString(name)[1], type: 'StringLiteral' }
  return {
    kind: 'Variable',
    name,
    renderTokens: (namespaceIsExist: boolean) =>
      namespaceIsExist
        ? [nameToken]
        : [{ image: '#', type: 'Sharp' }, { image: namespaceId, type: 'UUID' }, { image: '.', type: 'Dot' }, nameToken],
    key: variableId,
    namespaceId
  }
}

export const block2completion = (
  ctx: ContextInterface,
  { key, name }: BlockFormulaName,
  weight: number
): BlockCompletion => {
  const block = new BlockClass(ctx, { id: key })
  const value = blockKey(key)
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
    codeFragments: [block2codeFragment(block)]
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
    codeFragments: [spreadsheet2codeFragment(spreadsheet)]
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
    codeFragments: [column2codeFragment(column)]
  }
}

export const variable2completion = (variable: VariableInterface, weight: number): VariableCompletion => {
  const name = variable.t.name
  const value: VariableKey = `${blockKey(variable.t.namespaceId)}.${name}`
  return {
    kind: 'variable',
    replacements: [`${blockKey(variable.t.namespaceId)}.`, blockKey(variable.t.namespaceId), variable.t.name, name],
    weight,
    name: variable.t.name,
    namespace: variable.namespaceName(),
    value,
    preview: variable,
    positionChange: value.length,
    renderDescription: blockId => (blockId === variable.t.namespaceId ? '' : variable.namespaceName()),
    codeFragments: [variable2codeFragment(variable)]
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
    codeFragments: [
      {
        display: value,
        errors: [],
        value,
        code: 'Function',
        type: 'any',
        renderText: undefined,
        hide: false,
        attrs: undefined
      }
    ]
  }
}
