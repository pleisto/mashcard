import { event } from '../event'

export const SlashMenuHide = event<{}>()('SlashMenuHide')

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

export const DiscussionMarkActive = event<{ markId: string }>()('DiscussionMarkActive', ({ markId }) => {
  return { markId }
})

export const DiscussionMarkInactive = event<{ markId?: string }>()('DiscussionMarkInactive', ({ markId }) => {
  return { markId }
})

export const DiscussionListToggle = event<{ visible?: boolean }>()('DiscussionListTrigger', ({ visible }) => {
  return { visible }
})
