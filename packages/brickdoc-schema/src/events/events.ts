import { event } from './event'
import { Block } from '../BrickdocModels'

export const BlockUpdated = event<Block>()('BlockUpdated', (block: Block) => {
  return { id: block.id }
})
export const BlockDeleted = event<Block>()('BlockDeleted', (block: Block) => {
  return { id: block.id }
})

export const UpdateBlock = event<{ block: Block; commit: boolean }>()('UpdateBlock', ({ block, commit }) => {
  return { id: block.id }
})
export const DeleteBlock = event<{ blockId: string; commit: boolean }>()('DeleteBlock', ({ blockId, commit }) => {
  return { id: blockId }
})
export const CommitBlocks = event<{}>()('CommitBlocks', () => {
  return { id: 'commit' }
})

export const loadSpreadsheetBlocks = event<string>()('loadSpreadsheetBlocks', (parentId: string) => {
  return { id: parentId }
})

export const SpreadsheetLoaded = event<{ parentId: string; blocks: Block[] }>()(
  'SpreadsheetLoaded',
  ({ parentId, blocks }) => {
    return { id: parentId }
  }
)

export const BlockSynced = event<Block>()('BlockSynced', (block: Block) => {
  return { id: block.id }
})

export const BlockSpreadsheetLoaded = event<{ id: string }>()('BlockSpreadsheetLoaded', ({ id }) => {
  return { id }
})
export const BlockNameLoad = event<{ id: string; name: string }>()('BlockNameLoad', ({ id }) => {
  return { id }
})

export const FormulaInnerRefresh = event<{ namespaceId: string; variableId: string }>()(
  'FormulaInnerRefresh',
  ({ namespaceId, variableId }) => {
    return { id: `${namespaceId},${variableId}` }
  }
)

export const FormulaUpdated = event<any>()('FormulaUpdated', v => {
  return { id: `${v.t.namespaceId},${v.t.variableId}` }
})

export const SlashMenuHide = event<void>()('SlashMenuHide')

export const SlashMenuKeyboardEventTrigger = event<{ key: string }>()('SlashMenuKeyboardEventTrigger', ({ key }) => {
  return { key }
})

export const FormulaKeyboardEventTrigger = event<{ key: string; formulaId: string; rootId: string }>()(
  'FormulaKeyboardEventTrigger',
  ({ key, formulaId, rootId }) => {
    return { key, id: `${rootId},${formulaId}` }
  }
)

export const FormulaEditorSaveEventTrigger = event<{ formulaId: string; rootId: string }>()(
  'FormulaEditorSaveEventTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}` }
  }
)

export const FormulaEditorUpdateEventTrigger = event<{
  content: any
  position: number
  rootId: string
  formulaId: string
}>()('FormulaEditorUpdateEventTrigger', ({ content, position, formulaId, rootId }) => {
  return { content, position, id: `${rootId},${formulaId}` }
})

export interface ExplorerMenuItem {
  label: React.ReactElement
  labelText: string
  icon: React.ReactElement
  onAction?: () => void
  items?: ExplorerMenuItem[]
}

export interface ExplorerMenuGroup {
  label: React.ReactNode
  items: ExplorerMenuItem[]
}

export const ExplorerMenuTrigger = event<{ items?: ExplorerMenuGroup[]; visible: boolean }>()(
  'ExplorerMenuTrigger',
  ({ visible, items }) => {
    return { visible, items }
  }
)
