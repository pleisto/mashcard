import React from 'react'
import { Y } from '@brickdoc/editor'
import { base64 } from 'rfc4648'
import { uuid } from '@brickdoc/active-support'

import {
  BlockNew,
  DocumentHistory,
  Statetype,
  useBlockNewQuery,
  useBlockCommitMutation,
  useDocumentSubscription
} from '@/BrickdocGraphQL'
import { BrickdocContext } from '@/common/brickdocContext'
import { devLog } from '@brickdoc/design-system'

import { BrickdocEventBus, docHistoryReceived } from '@brickdoc/schema'

export function useBlockSyncProvider(queryVariables: { blockId: string; historyId?: string }): {
  ydoc: React.MutableRefObject<Y.Doc | undefined>
  initBlocksToEditor: React.MutableRefObject<boolean>
  blockCommitting: React.MutableRefObject<boolean>
} {
  const {
    features: { experiment_collaboration: enableCollaboration }
  } = React.useContext(BrickdocContext)
  const [blockCommit] = useBlockCommitMutation()

  const { blockId, historyId } = queryVariables

  const block = React.useRef<BlockNew>({ id: blockId })
  const ydoc = React.useRef<Y.Doc | undefined>()
  const initBlocksToEditor = React.useRef<boolean>(false)
  const blockCommitting = React.useRef<boolean>(false)
  const updatesToCommit = React.useRef(new Set<Uint8Array>())

  const { data, loading } = useBlockNewQuery({
    fetchPolicy: 'no-cache',
    variables: { id: blockId, historyId }
  })

  useDocumentSubscription({
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) {
        const {
          document: { operatorId, blocks, states, histories }
        } = data
        if (blocks && states) {
          devLog('received update', states, blocks)
          const blockStates = states.filter(s => s.blockId === blockId)

          // TODO: users
          BrickdocEventBus.dispatch(
            docHistoryReceived({
              docId: blockId,
              histories: Object.fromEntries((histories as DocumentHistory[]).map(h => [h.id, h])),
              users: {}
            })
          )

          if (ydoc.current && operatorId && operatorId !== globalThis.brickdocContext.uuid) {
            blocks.forEach(remoteBlock => {
              if (remoteBlock.id === blockId) {
                block.current = remoteBlock
              }
            })
            const remoteState = Y.mergeUpdates(
              blockStates.filter(s => s.state).map(s => base64.parse(s.state as string))
            )
            Y.applyUpdate(ydoc.current, remoteState)
          }
        }
      }
    },
    variables: { docId: blockId }
  })

  const commitState = React.useCallback(
    async (update?: Uint8Array, forceFull: boolean = false): Promise<void> => {
      if (historyId) return
      if (!ydoc.current) return
      devLog(`try commit state, committing:`, blockCommitting.current)
      if (update) updatesToCommit.current.add(update)
      if (blockCommitting.current) return
      blockCommitting.current = true // only one commiting once

      const stateIdToCommit = uuid()
      const updatesToSync = [...updatesToCommit.current.values()]
      const mergedUpdates = Y.mergeUpdates(updatesToSync)

      devLog(`commit state ${stateIdToCommit} from ${block.current.stateId}`)

      const statesCount = block.current.statesCount ?? 0
      const stateType = forceFull || statesCount === 0 ? Statetype.Full : Statetype.Update

      const commitPromise = blockCommit({
        variables: {
          input: {
            documentId: blockId,
            blockId,
            operatorId: globalThis.brickdocContext.uuid,
            stateType,
            state: base64.stringify(mergedUpdates),
            stateId: stateIdToCommit,
            prevStateId: block.current.stateId ? block.current.stateId : undefined,
            statesCount
          }
        }
      })

      const { data: commitBlockResult } = await commitPromise

      const blockResult = commitBlockResult?.blockCommit?.block
      const diffStates = commitBlockResult?.blockCommit?.diffStates

      if (ydoc.current && blockResult) {
        updatesToSync.forEach(update => updatesToCommit.current.delete(update))
        // const oldBlock = {...block.current}
        block.current = blockResult
        if (diffStates && diffStates.length > 0) {
          devLog(`need to merge state ${stateIdToCommit} with ${block.current.stateId}`)
          const remoteState = Y.mergeUpdates(diffStates.filter(s => s.state).map(s => base64.parse(s.state as string)))
          // const remoteYector = Y.encodeStateVectorFromUpdate(remoteState)
          const localVector = Y.encodeStateVector(ydoc.current)
          const diff = Y.diffUpdate(remoteState, localVector)
          Y.applyUpdate(ydoc.current, diff)
          const localState = Y.encodeStateAsUpdate(ydoc.current)
          // const nextUpdate = Y.diffUpdate(localState, remoteYector)
          blockCommitting.current = false
          void commitState(localState, true)
        } else {
          devLog('committed, left updates: ', updatesToCommit.current.size)
          blockCommitting.current = false
          if (updatesToCommit.current.size !== 0) {
            void commitState()
          }
        }
      }
    },
    [blockCommit, blockId, historyId]
  )

  React.useEffect(() => {
    if (enableCollaboration) {
      if (data && !loading) {
        const newYdoc = new Y.Doc()
        devLog('Ydoc initialized')

        if (data.blockNew) {
          block.current = {
            id: blockId,
            stateId: data.blockNew.stateId,
            statesCount: data.blockNew.statesCount
          }
          if (block.current.stateId && data.blockNew.states) {
            devLog(`init from state ${block.current.stateId} (${data.blockNew.states.length})`)
            initBlocksToEditor.current = false
            const remoteState = Y.mergeUpdates(
              data.blockNew.states.filter(s => s.state).map(s => base64.parse(s.state as string))
            )
            Y.applyUpdate(newYdoc, remoteState)
          } else {
            devLog('need to commit init state')
            initBlocksToEditor.current = !historyId
          }
        }

        if (!historyId) {
          newYdoc.on('update', async update => {
            void commitState(update)
          })
        }

        ydoc.current = newYdoc
      }
    } else {
      initBlocksToEditor.current = true
    }
  }, [blockId, historyId, enableCollaboration, data, loading, commitState])

  return {
    ydoc,
    initBlocksToEditor,
    blockCommitting
  }
}
