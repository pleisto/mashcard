import React from 'react'
import { Y } from '@brickdoc/editor'
import * as awarenessProtocol from 'y-protocols/awareness'
import { base64 } from 'rfc4648'
import { uuid } from '@brickdoc/active-support'

import {
  BlockNew,
  DocumentHistory,
  ThinUser,
  Statetype,
  useBlockNewQuery,
  useBlockCommitMutation,
  useDocumentSubscription,
  useAwarenessUpdateMutation,
  useAwarenessSubscription
} from '@/BrickdocGraphQL'
import { BrickdocContext } from '@/common/brickdocContext'
import { devLog } from '@brickdoc/design-system'

import { BrickdocEventBus, docHistoryReceived } from '@brickdoc/schema'

export interface blockProvider {
  awareness: awarenessProtocol.Awareness
  document: Y.Doc
}

export interface awarenessInfoUser extends ThinUser {
  color?: string
  operatorId: string
}

export interface awarenessInfo {
  user: awarenessInfoUser
}

export function useBlockSyncProvider(queryVariables: { blockId: string; historyId?: string }): {
  loading: boolean
  provider?: blockProvider
  initBlocksToEditor: React.MutableRefObject<boolean>
  blockCommitting: React.MutableRefObject<boolean>
  awarenessInfos: awarenessInfo[]
} {
  const {
    features: { experiment_collaboration: enableCollaboration }
  } = React.useContext(BrickdocContext)
  const [blockCommit] = useBlockCommitMutation()
  const [awarenessUpdate] = useAwarenessUpdateMutation()

  const { blockId, historyId } = queryVariables

  const block = React.useRef<BlockNew>({ id: blockId })
  const [provider, setProvider] = React.useState<blockProvider>()
  const [awarenessInfos, setAwarenessInfos] = React.useState<awarenessInfo[]>([])
  const latestProvider = React.useRef<blockProvider>()

  const initBlocksToEditor = React.useRef<boolean>(false)
  const blockCommitting = React.useRef<boolean>(false)
  const updatesToCommit = React.useRef(new Set<Uint8Array>())

  const { data, loading } = useBlockNewQuery({
    fetchPolicy: 'no-cache',
    variables: { id: blockId, historyId }
  })

  const awarenessChanged = React.useCallback(
    (awareness: awarenessProtocol.Awareness) => {
      const infos: awarenessInfo[] = Array.from(awareness.getStates().values()).map(i => {
        return {
          user: i.user
        }
      })
      devLog('awarenessChanged', infos)
      setAwarenessInfos(infos)
    },
    [setAwarenessInfos]
  )

  useDocumentSubscription({
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) {
        const {
          document: { operatorId, blocks, states, histories, users }
        } = data
        if (blocks && states) {
          devLog('received update', states, blocks)
          const blockStates = states.filter(s => s.blockId === blockId)

          BrickdocEventBus.dispatch(
            docHistoryReceived({
              docId: blockId,
              histories: Object.fromEntries((histories as DocumentHistory[]).map(h => [h.id, h])),
              users: Object.fromEntries((users as ThinUser[]).map(u => [u.name, u]))
            })
          )

          if (latestProvider.current && operatorId && operatorId !== globalThis.brickdocContext.uuid) {
            blocks.forEach(remoteBlock => {
              if (remoteBlock.id === blockId) {
                block.current = remoteBlock
              }
            })
            const remoteState = Y.mergeUpdates(
              blockStates.filter(s => s.state).map(s => base64.parse(s.state as string))
            )
            Y.applyUpdate(latestProvider.current.document, remoteState)
          }
        }
      }
    },
    variables: { docId: blockId }
  })

  useAwarenessSubscription({
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) {
        const {
          awareness: { operatorId, updates }
        } = data
        if (updates) {
          devLog(`received awareness updates from ${operatorId}`)
          if (latestProvider.current && updates.length > 0) {
            try {
              awarenessProtocol.applyAwarenessUpdate(
                latestProvider.current.awareness,
                base64.parse(updates as string),
                ''
              )
            } catch {}
            awarenessChanged(latestProvider.current.awareness)
          }
        }
      }
    },
    variables: { docId: blockId }
  })

  const commitState = React.useCallback(
    async (ydoc: Y.Doc, update?: Uint8Array, forceFull: boolean = false): Promise<void> => {
      if (historyId) return
      if (!ydoc) return
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

      try {
        const { data: commitBlockResult } = await commitPromise

        const blockResult = commitBlockResult?.blockCommit?.block
        const diffStates = commitBlockResult?.blockCommit?.diffStates
        const requireFull = commitBlockResult?.blockCommit?.requireFull

        if (ydoc && blockResult) {
          updatesToSync.forEach(update => updatesToCommit.current.delete(update))
          // const oldBlock = {...block.current}
          block.current = blockResult
          if (diffStates && diffStates.length > 0) {
            devLog(`need to merge state ${stateIdToCommit} with ${block.current.stateId}`)
            const remoteState = Y.mergeUpdates(
              diffStates.filter(s => s.state).map(s => base64.parse(s.state as string))
            )
            // const remoteYector = Y.encodeStateVectorFromUpdate(remoteState)
            const localVector = Y.encodeStateVector(ydoc)
            const diff = Y.diffUpdate(remoteState, localVector)
            Y.applyUpdate(ydoc, diff)
            const localState = Y.encodeStateAsUpdate(ydoc)
            // const nextUpdate = Y.diffUpdate(localState, remoteYector)
            blockCommitting.current = false
            void commitState(ydoc, localState, true)
          } else if (ydoc && requireFull) {
            devLog(`full state is required`)
            const localState = Y.encodeStateAsUpdate(ydoc)
            blockCommitting.current = false
            void commitState(ydoc, localState, true)
          } else {
            devLog('committed, left updates: ', updatesToCommit.current.size)
            blockCommitting.current = false
            if (updatesToCommit.current.size !== 0) {
              void commitState(ydoc)
            }
          }
        }
      } catch (e) {
        blockCommitting.current = false
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

        const awareness = new awarenessProtocol.Awareness(newYdoc)

        if (!historyId) {
          newYdoc.on('update', async (update: Uint8Array, origin: any, ydoc: Y.Doc) => {
            void commitState(ydoc, update)
          })

          awareness.on('update', async ({ added, updated, removed }: any) => {
            awarenessChanged(awareness)
            const changes = added.concat(updated).concat(removed)
            const updates = awarenessProtocol.encodeAwarenessUpdate(awareness, changes)
            const updatePromise = awarenessUpdate({
              variables: {
                input: {
                  docId: blockId,
                  operatorId: globalThis.brickdocContext.uuid,
                  updates: base64.stringify(updates)
                }
              }
            })
            await updatePromise
          })
        }

        const provider = { document: newYdoc, awareness }
        setProvider(provider)
        latestProvider.current = provider
      }
    } else {
      initBlocksToEditor.current = true
    }
  }, [blockId, historyId, enableCollaboration, data, loading, commitState, awarenessUpdate, awarenessChanged])

  return {
    loading,
    provider,
    initBlocksToEditor,
    blockCommitting,
    awarenessInfos
  }
}
