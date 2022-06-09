import React from 'react'
import { useApolloClient } from '@apollo/client'
import { BrickdocEventBus, loadDocHistory, docHistoryReceived, EventSubscribed } from '@brickdoc/schema'
import { DocumentHistoriesDocument, DocumentHistory } from '@/BrickdocGraphQL'
import { devLog } from '@brickdoc/design-system'

export function useDocHistoryProvider(docId: string): void {
  const client = useApolloClient()
  React.useEffect(() => {
    const subscriptions: EventSubscribed[] = [
      BrickdocEventBus.subscribe(
        loadDocHistory,
        ({ payload }) => {
          devLog(`loading doc history ${docId}`)
          void (async () => {
            const { data } = await client.query({
              query: DocumentHistoriesDocument,
              variables: {
                id: docId
              },
              fetchPolicy: 'no-cache'
            })
            // TODO: users
            const { histories } = data.documentHistories

            BrickdocEventBus.dispatch(
              docHistoryReceived({
                docId,
                histories: Object.fromEntries((histories as DocumentHistory[]).map(h => [h.id, h])),
                users: {}
              })
            )
          })()
        },
        { subscribeId: docId }
      )
    ]

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe())
    }
  }, [docId, client])
}
