import React from 'react'
import { useApolloClient } from '@apollo/client'
import { MashcardEventBus, loadDocHistory, docHistoryReceived, EventSubscribed } from '@mashcard/schema'
import { DocumentHistoriesDocument, DocumentHistory, User } from '@/MashcardGraphQL'
import { devLog } from '@mashcard/design-system'

export function useDocHistoryProvider(docId: string): void {
  const client = useApolloClient()

  const fetchHistories = React.useCallback(async () => {
    const { data } = await client.query({
      query: DocumentHistoriesDocument,
      variables: {
        id: docId
      },
      fetchPolicy: 'no-cache'
    })
    // TODO: users
    const { histories, users } = data.documentHistories

    MashcardEventBus.dispatch(
      docHistoryReceived({
        docId,
        histories: Object.fromEntries((histories as DocumentHistory[]).map(h => [h.id, h])),
        users: Object.fromEntries((users as User[]).map(u => [u.name, u]))
      })
    )
  }, [docId, client])

  React.useEffect(() => {
    const subscriptions: EventSubscribed[] = [
      MashcardEventBus.subscribe(
        loadDocHistory,
        ({ payload }) => {
          devLog(`loading doc history ${docId}`)
          void fetchHistories()
        },
        { eventId: docId }
      )
    ]
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe())
    }
  }, [docId, fetchHistories])
}
