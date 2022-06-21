import React from 'react'
import { DocumentHistory, ThinUser, loadDocHistory, docHistoryReceived, MashcardEventBus } from '../'

interface docHistoryStore {
  histories: { [key: string]: DocumentHistory }
  users: { [key: string]: ThinUser }
  loaded: boolean
}

export const useDocHistoryStore = (
  docId: string
): {
  refetch: () => void
  store: docHistoryStore
} => {
  const [store, setStore] = React.useState<docHistoryStore>({
    histories: {},
    users: {},
    loaded: false
  })
  MashcardEventBus.subscribe(
    docHistoryReceived,
    ({ payload }) => {
      const old = store
      setStore({
        ...old,
        histories: {
          ...old.histories,
          ...payload.histories
        },
        users: {
          ...old.users,
          ...payload.users
        }
      })
    },
    {
      subscribeId: docId
    }
  )

  const refetch = React.useCallback(() => {
    MashcardEventBus.dispatch(loadDocHistory(docId))
  }, [docId])
  return {
    store,
    refetch
  }
}
