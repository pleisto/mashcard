import create from 'zustand'
import {
  MashcardEventBus,
  DiscussionListToggle,
  HistoryListToggle,
  DiscussionMarkActive,
  EventSubscribed,
  ExplorerMenuTrigger
} from '@mashcard/schema'

export type BuiltInDrawerView = 'explorerMenu' | 'discussionList' | 'historyList'
export type DrawerView = BuiltInDrawerView | (string & {})
export type DrawerState = 'closed' | DrawerView

interface DrawerStore {
  isAttached: boolean
  state: DrawerState
  attach: () => Disposal
  open: (view: DrawerView) => void
  close: () => void
}

type Disposal = () => void

/** Creates the store that manages the global drawer states */
export const useDrawerStore = create<DrawerStore>((set, get) => ({
  isAttached: false,
  state: 'closed',
  attach(): Disposal {
    // Prevent re-attaching the drawer service for multiple times
    if (get().isAttached) {
      return () => {}
    }

    const subscriptions: EventSubscribed[] = [
      MashcardEventBus.subscribe(ExplorerMenuTrigger, ({ payload }) => {
        const { state, open, close } = get()
        if (payload.visible === undefined) {
          if (state === 'closed' || state === 'discussionList') {
            open('explorerMenu')
          } else {
            close()
          }
          return
        }
        if (payload.visible) {
          open('explorerMenu')
        } else {
          close()
        }
      }),
      MashcardEventBus.subscribe(DiscussionListToggle, ({ payload }) => {
        const { state: view, open, close } = get()
        const isDiscussionOpen = view === 'discussionList'
        payload.visible ?? !isDiscussionOpen ? open('discussionList') : close()
      }),
      MashcardEventBus.subscribe(HistoryListToggle, ({ payload }) => {
        const { state: view, open, close } = get()
        const isHistoryOpen = view === 'historyList'
        payload.visible ?? !isHistoryOpen ? open('historyList') : close()
      }),
      MashcardEventBus.subscribe(DiscussionMarkActive, event => {
        const { open } = get()
        open('discussionList')
      })
    ]
    set({ isAttached: true })
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe())
      close()
      set({ isAttached: false })
    }
  },
  open(view: DrawerView) {
    if (!get().isAttached) {
      throw new Error('attach the drawer service with "useDrawerService" before using a drawer')
    }
    set({ state: view })
  },
  close() {
    if (!get().isAttached) {
      throw new Error('attach the drawer service with "useDrawerService" before using a drawer')
    }
    set({ state: 'closed' })
  }
}))
