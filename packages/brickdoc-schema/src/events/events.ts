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

export const SpreadsheetUpdateCellValue = event<{ parentId: string; cellId: string; value: string }>()(
  'SpreadsheetUpdateCellValue',
  ({ parentId, cellId, value }) => {
    return { id: `${parentId},${cellId}` }
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

export const FormulaTickViaId = event<{
  uuid: string
  variableId: string
  namespaceId: string
}>()('FormulaTickViaId', ({ uuid, variableId, namespaceId }) => {
  return { id: `${namespaceId},${variableId}`, uuid, variableId, namespaceId }
})

export const FormulaUpdatedViaId = event<any>()('FormulaUpdatedViaId', v => {
  return { id: `${v.t.namespaceId},${v.t.variableId}` }
})

export const FormulaTaskStarted = event<any>()('FormulaTaskStarted', v => {
  return { id: `${v.namespaceId},${v.variableId}` }
})

export const FormulaTaskCompleted = event<any>()('FormulaTaskCompleted', v => {
  return { id: `${v.namespaceId},${v.variableId}` }
})

export const FormulaUpdatedViaName = event<any>()('FormulaUpdatedViaName', v => {
  return { id: `${v.t.namespaceId}#${v.t.name}` }
})

export const SlashMenuHide = event<void>()('SlashMenuHide')

export const SlashMenuKeyboardEventTrigger = event<{ key: string }>()('SlashMenuKeyboardEventTrigger', ({ key }) => {
  return { key }
})

export const FormulaKeyboardEventTrigger = event<{
  key: string
  formulaId: string
  rootId: string
  completionIndex: number
  isEditor: boolean
}>()('FormulaKeyboardEventTrigger', ({ key, formulaId, rootId, isEditor, completionIndex }) => {
  return { key, formulaId, rootId, isEditor, completionIndex, id: `${rootId},${formulaId}` }
})

export const FormulaEditorHoverEventTrigger = event<{ attrs: any; formulaId: string; rootId: string }>()(
  'FormulaEditorHoverEventTrigger',
  ({ attrs, formulaId, rootId }) => {
    return { attrs, formulaId, rootId, id: `${rootId},${formulaId}` }
  }
)

export const FormulaEditorSelectEventTrigger = event<{
  selected: boolean
  formulaId: string
  rootId: string
  parentFormulaId: string
  parentRootId: string
}>()('FormulaEditorSelectEventTrigger', ({ formulaId, rootId, parentFormulaId, parentRootId, selected }) => {
  return { id: `${rootId},${formulaId}`, formulaId, rootId, parentFormulaId, parentRootId, selected }
})

export const FormulaEditorSaveEventTrigger = event<{ formulaId: string; rootId: string }>()(
  'FormulaEditorSaveEventTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}`, formulaId, rootId }
  }
)

export const FormulaEditorSavedTrigger = event<{ formulaId: string; rootId: string }>()(
  'FormulaEditorSavedTrigger',
  ({ formulaId, rootId }) => {
    return { id: `${rootId},${formulaId}`, formulaId, rootId }
  }
)

export const FormulaEditorReplaceRootTrigger = event<{
  content: any
  position: number
  input: string
  rootId: string
  formulaId: string
}>()('FormulaEditorReplaceRootTrigger', ({ content, position, input, formulaId, rootId }) => {
  return { content, position, input, id: `${rootId},${formulaId}`, formulaId, rootId }
})

export const FormulaCalculateTrigger = event<{
  rootId: string
  formulaId: string
  skipAsync: boolean
}>()('FormulaCalculateTrigger', ({ formulaId, rootId, skipAsync }) => {
  return { id: `${rootId},${formulaId}`, formulaId, rootId, skipAsync }
})

export const FormulaContextTickTrigger = event<{ domain: string; state: any }>()(
  'FormulaContextTickTrigger',
  ({ domain, state }) => {
    return { id: `FormulaContext#${domain}`, domain, state }
  }
)

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

export const DiscussionMarkActive = event<{ markId: string }>()('DiscussionMarkActive', ({ markId }) => {
  return { markId }
})

export const DiscussionMarkInactive = event<{ markId?: string }>()('DiscussionMarkInactive', ({ markId }) => {
  return { markId }
})

export const DiscussionListToggle = event<{ visible: boolean }>()('DiscussionListTrigger', ({ visible }) => {
  return { visible }
})
