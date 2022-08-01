import React from 'react'
import { DocumentHistory, User, loadDocHistory, docHistoryReceived, MashcardEventBus } from '../'

interface docHistoryStore {
  histories: { [key: string]: DocumentHistory }
  users: { [key: string]: User }
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
  React.useEffect(() => {
    setStore({
      histories: {},
      users: {},
      loaded: false
    })
  }, [docId])

  React.useEffect(() => {
    const subscriptions = [
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
          eventId: docId
        }
      )
    ]
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe())
    }
  }, [docId, store])

  const refetch = React.useCallback(() => {
    MashcardEventBus.dispatch(loadDocHistory(docId))
  }, [docId])
  return {
    store,
    refetch
  }
}
