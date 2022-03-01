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

export const currentBlockKey = (namespaceId: NamespaceId, pageId: NamespaceId): BlockKey =>
  namespaceId === pageId ? '#CurrentBlock' : blockKey(namespaceId)

export const columnKey = (namespaceId: NamespaceId, columnId: ColumnId): ColumnKey => `#${namespaceId}.${columnId}`

export const variableRenderText = (variable: VariableInterface, pageId: NamespaceId): CodeFragment['renderText'] => {
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

    const namespaceId = pageId === variable.t.namespaceId ? 'CurrentBlock' : variable.t.namespaceId

    const resultAfterNamespace = prevText === '.' ? result : `#${namespaceId}.${result}`
    return prefix.concat(resultAfterNamespace)
  }
}

export const columnRenderText = (column: ColumnType): CodeFragment['renderText'] => {
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

    return prefix.concat(result)
  }
}

const blockRenderText = (blockId: NamespaceId, pageId: NamespaceId): CodeFragment['renderText'] => {
  return (text, { display, value }, prevText) => {
    const blockValue = blockId === pageId ? '#CurrentBlock' : value
    if (text === display) {
      return blockValue
    }

    if (text.startsWith(display)) {
      const suffix = text.substring(display.length)
      return blockValue.concat(suffix)
    }

    if (text.endsWith(display)) {
      const prefix = text.substring(0, text.length - display.length)
      return prefix.concat(blockValue)
    }

    const [, finalText] = maybeEncodeString(text)
    return finalText
  }
}

const block2attrs = (block: BlockType, pageId: NamespaceId): CodeFragmentAttrs => ({
  kind: 'Block',
  namespaceId: block.id,
  id: block.id,
  name: block.name(pageId)
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

export const block2codeFragment = (block: BlockType, pageId: NamespaceId): CodeFragment => {
  return {
    display: block.name(pageId),
    errors: [],
    renderText: blockRenderText(block.id, pageId),
    hide: false,
    value: currentBlockKey(block.id, pageId),
    code: 'Block',
    type: 'Block',
    attrs: block2attrs(block, pageId)
  }
}

const variable2codeFragment = (variable: VariableInterface, pageId: NamespaceId): CodeFragment => {
  return {
    display: variable.t.name,
    errors: [],
    value: maybeEncodeString(variable.t.name)[1],
    code: 'Variable',
    renderText: variableRenderText(variable, pageId),
    hide: false,
    type: variable.t.variableValue.result.type,
    attrs: variable2attrs(variable)
  }
}

export const spreadsheet2codeFragment = (spreadsheet: SpreadsheetType, pageId: NamespaceId): CodeFragment => {
  const value = blockKey(spreadsheet.blockId)
  return {
    display: spreadsheet.name(),
    errors: [],
    value,
    code: 'Spreadsheet',
    type: 'Spreadsheet',
    renderText: blockRenderText(spreadsheet.blockId, pageId),
    hide: false,
    attrs: spreadsheet2attrs(spreadsheet)
  }
}

const column2codeFragment = (column: ColumnType, pageId: NamespaceId): CodeFragment => {
  // const value = columnKey(column.namespaceId, column.columnId)
  return {
    display: column.name,
    errors: [],
    value: maybeEncodeString(column.name)[1],
    code: 'Column',
    type: 'Column',
    renderText: columnRenderText(column),
    hide: false,
    attrs: column2attrs(column)
  }
}

export const block2name = (block: BlockType): BlockFormulaName => {
  return {
    kind: 'Block',
    name: block.name(''),
    namespaceId: block.id,
    renderTokens: (exist, pageId) => [
      { image: '#', type: 'Sharp' },
      pageId === block.id ? { image: 'CurrentBlock', type: 'CurrentBlock' } : { image: block.id, type: 'UUID' }
    ],
    key: block.id
  }
}

export const spreadsheet2name = (spreadsheet: SpreadsheetType): SpreadsheetFormulaName => {
  return {
    kind: 'Spreadsheet',
    name: spreadsheet.name(),
    namespaceId: spreadsheet.blockId,
    renderTokens: (exist, pageId) => [
      { image: '#', type: 'Sharp' },
      pageId === spreadsheet.blockId
        ? { image: 'CurrentBlock', type: 'CurrentBlock' }
        : { image: spreadsheet.blockId, type: 'UUID' }
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
    renderTokens: (namespaceIsExist: boolean, pageId: NamespaceId) => {
      if (namespaceIsExist) {
        return [nameToken]
      }

      const namespaceToken =
        pageId === namespaceId ? { image: 'CurrentBlock', type: 'CurrentBlock' } : { image: namespaceId, type: 'UUID' }

      return [{ image: '#', type: 'Sharp' }, namespaceToken, { image: '.', type: 'Dot' }, nameToken]
    },
    key: variableId,
    namespaceId
  }
}

export const block2completion = (
  ctx: ContextInterface,
  { key, name }: BlockFormulaName,
  pageId: NamespaceId
): BlockCompletion => {
  const block = new BlockClass(ctx, { id: key })
  const value = currentBlockKey(key, pageId)
  return {
    kind: 'block',
    weight: key === pageId ? 1 : -1,
    replacements: [name],
    positionChange: value.length,
    name,
    namespace: key,
    value,
    preview: block,
    renderDescription: blockId => '',
    codeFragments: [block2codeFragment(block, pageId)]
  }
}

export const spreadsheet2completion = (spreadsheet: SpreadsheetType, pageId: NamespaceId): SpreadsheetCompletion => {
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
    codeFragments: [spreadsheet2codeFragment(spreadsheet, pageId)]
  }
}

export const column2completion = (column: ColumnType, pageId: NamespaceId): ColumnCompletion => {
  const value = columnKey(column.namespaceId, column.columnId)
  return {
    kind: 'column',
    replacements: [`${column.name}`],
    weight: -3,
    name: column.name,
    positionChange: value.length,
    namespace: column.spreadsheet.name(),
    value,
    preview: column,
    renderDescription: blockId => column.spreadsheet.name(),
    codeFragments: [column2codeFragment(column, pageId)]
  }
}

export const variable2completion = (variable: VariableInterface, pageId: NamespaceId): VariableCompletion => {
  const name = variable.t.name
  const blockKeyStr = currentBlockKey(variable.t.namespaceId, pageId)
  const value: VariableKey = `${blockKeyStr}.${name}`
  const namespaceName = variable.namespaceName(pageId)
  return {
    kind: 'variable',
    replacements: [`${blockKeyStr}.`, blockKeyStr, variable.t.name, name],
    weight: variable.t.namespaceId === pageId ? 1 : -1,
    name: variable.t.name,
    namespace: namespaceName,
    value,
    preview: variable,
    positionChange: value.length,
    renderDescription: blockId => (blockId === variable.t.namespaceId ? '' : namespaceName),
    codeFragments: [variable2codeFragment(variable, pageId)]
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
