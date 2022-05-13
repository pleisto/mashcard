import React from 'react'
import { Y } from '@brickdoc/editor'
import { base64 } from 'rfc4648'
import { uuid } from '@brickdoc/active-support'

import { useGetDocumentQuery, useSyncDocumentMutation, useYdocSubscription } from '@/BrickdocGraphQL'
import { BrickdocContext } from '@/common/brickdocContext'
import { devLog } from '@brickdoc/design-system'

export function useDocSyncProvider(queryVariables: { docId: string }): {
  ydoc: React.MutableRefObject<Y.Doc | undefined>
  initBlocksToEditor: React.MutableRefObject<boolean>
} {
  const {
    features: { experiment_collaboration: enableCollaboration }
  } = React.useContext(BrickdocContext)
  const [syncDocument] = useSyncDocumentMutation()

  const { docId } = queryVariables

  const editorYdoc = React.useRef<Y.Doc | undefined>()
  const stateYdoc = React.useRef<Y.Doc | undefined>()
  const stateId = React.useRef<string>()
  const initBlocksToEditor = React.useRef<boolean>(false)
  const updatesToCommit = React.useRef(new Set<Uint8Array>())
  const documentCommitting = React.useRef<boolean>(false)

  const { data, loading } = useGetDocumentQuery({
    fetchPolicy: 'no-cache',
    variables: { docId }
  })

  useYdocSubscription({
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) {
        const {
          ydoc: { operatorId, stateId: newStateId, updates }
        } = data
        if (newStateId && operatorId && operatorId !== globalThis.brickdocContext.uuid) {
          devLog('received update', stateId, operatorId)
          if (editorYdoc.current && stateYdoc.current) {
            const diffUpdate = base64.parse(updates)
            Y.applyUpdate(editorYdoc.current, diffUpdate)
            Y.applyUpdate(stateYdoc.current, diffUpdate)
            stateId.current = newStateId
          }
        }
      }
    },
    variables: { docId }
  })

  const commitState = React.useCallback(
    async (update?: Uint8Array): Promise<void> => {
      if (!editorYdoc.current || !stateYdoc.current) return
      devLog(`try commit state, committing:`, documentCommitting.current)
      if (update) updatesToCommit.current.add(update)
      if (documentCommitting.current) return
      documentCommitting.current = true

      const stateIdToSync = uuid()
      const updatesToSync = [...updatesToCommit.current.values()]
      const mergedUpdates = Y.mergeUpdates(updatesToSync)
      devLog(`updates to state ydoc`)
      Y.applyUpdate(stateYdoc.current, mergedUpdates)
      const stateToSync = Y.encodeStateAsUpdate(stateYdoc.current)

      devLog(`commit state ${stateIdToSync} from ${stateId.current}`)

      const syncPromise = syncDocument({
        variables: {
          input: {
            docId,
            operatorId: globalThis.brickdocContext.uuid,
            state: base64.stringify(stateToSync),
            updates: base64.stringify(mergedUpdates),
            stateId: stateIdToSync,
            previousStateId: stateId.current
          }
        }
      })
      const { data: syncDocumentResult } = await syncPromise

      const resultDocument = syncDocumentResult?.syncDocument?.document

      if (resultDocument) {
        documentCommitting.current = false
        const { stateId: echoStateId, state: remoteStateStr } = resultDocument
        if (echoStateId === stateIdToSync) {
          stateId.current = stateIdToSync
          updatesToSync.forEach(update => updatesToCommit.current.delete(update))
          devLog('committed, left updates: ', updatesToCommit.current.size)
          if (updatesToCommit.current.size !== 0) {
            void commitState()
          }
        } else if (remoteStateStr && echoStateId) {
          devLog(`need to merge state ${stateId.current} with ${echoStateId}`)
          const remoteState = base64.parse(remoteStateStr)
          const remoteYector = Y.encodeStateVectorFromUpdate(remoteState)
          const localVector = Y.encodeStateVector(editorYdoc.current)
          const diff = Y.diffUpdate(remoteState, localVector)
          // const mergedState = Y.mergeUpdates([state, diff])
          if (editorYdoc.current && stateYdoc.current) {
            Y.applyUpdate(editorYdoc.current, diff)
            stateId.current = echoStateId
            // const localVector = Y.encodeStateVector(editorYdoc.current)
            const localState = Y.encodeStateAsUpdate(editorYdoc.current)
            const nextUpdate = Y.diffUpdate(localState, remoteYector)
            void commitState(nextUpdate)
          }
        }
      }
    },
    [syncDocument, docId]
  )

  React.useEffect(() => {
    if (enableCollaboration && docId) {
      if (data && !loading) {
        const { document } = data

        const newEditorYdoc = new Y.Doc()
        const newStateYdoc = new Y.Doc()
        devLog('Ydoc initialized')

        if (document?.state && document?.stateId) {
          devLog(`init from state ${document.stateId}`)
          const state = base64.parse(document.state)
          // devLog(`decoded:`, state)
          Y.applyUpdate(newEditorYdoc, state)
          Y.applyUpdate(newStateYdoc, state)
          stateId.current = document.stateId
          initBlocksToEditor.current = false
        } else {
          devLog('need to commit init state')
          initBlocksToEditor.current = true
        }

        newEditorYdoc.on('update', async update => {
          void commitState(update)
        })

        editorYdoc.current = newEditorYdoc
        stateYdoc.current = newStateYdoc
      }
    } else {
      initBlocksToEditor.current = true
    }
  }, [docId, data, loading, enableCollaboration, commitState])

  return {
    ydoc: editorYdoc,
    initBlocksToEditor
  }
}
