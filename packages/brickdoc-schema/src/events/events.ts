import { event } from './event'
import { Block } from '../BrickdocModels'

export const BlockUpdated = event<Block>()('BlockUpdated', (block: Block) => {
  return { id: block.id }
})
export const BlockDeleted = event<Block>()('BlockDeleted', (block: Block) => {
  return { id: block.id }
})
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
