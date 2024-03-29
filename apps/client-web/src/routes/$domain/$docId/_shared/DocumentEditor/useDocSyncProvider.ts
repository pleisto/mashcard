import {
  DocumentBlockQuery,
  DocumentHistory,
  DocumentInfo,
  Statetype,
  useAwarenessSubscription,
  useAwarenessUpdateMutation,
  useBlockCommitMutation,
  useDocumentSubscription,
  User
} from '@/MashcardGraphQL'
import { useApolloClient } from '@apollo/client'
import { isEqual, uuid } from '@mashcard/active-support'
import { devLog } from '@mashcard/design-system'
import { Y } from '@mashcard/legacy-editor'
import { BlockMetaUpdated, docHistoryReceived, MashcardEventBus, UpdateBlockMeta } from '@mashcard/schema'
import { useCallback, useEffect, useRef, useState } from 'react'
import { base64 } from 'rfc4648'
import { yDocToProsemirrorJSON } from 'y-prosemirror'
import * as awarenessProtocol from 'y-protocols/awareness'
import { AwarenessInfo } from '../../../_shared/reactiveVars'

type BlockType = Exclude<Exclude<DocumentBlockQuery['blockNew'], undefined>, null>

export interface blockMeta {
  [key: string]: any
}

export interface blockProvider {
  awareness: awarenessProtocol.Awareness
  document: Y.Doc
}

export function useDocSyncProvider(queryVariables: {
  blockId: string
  historyId?: string
  editable: boolean
  data?: DocumentBlockQuery
}): {
  committing: boolean
  provider?: blockProvider
  awarenessInfos: AwarenessInfo[]
  meta: blockMeta
  documentInfo?: DocumentInfo
  setMeta: (meta: blockMeta) => void
  restoreHistory: () => Promise<void>
} {
  const client = useApolloClient()

  const [blockCommit] = useBlockCommitMutation()
  const [awarenessUpdate] = useAwarenessUpdateMutation()

  const { blockId, historyId, editable, data } = queryVariables

  const block = useRef<BlockType>({ id: blockId })
  const [blockMeta, setBlockMeta] = useState<blockMeta>({})
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo>()
  const latestMeta = useRef<blockMeta>({})
  const [provider, setProvider] = useState<blockProvider>()
  const [awarenessInfos, setAwarenessInfos] = useState<AwarenessInfo[]>([])

  const blockCommitting = useRef<boolean>(false)
  const blockMetaChanged = useRef<boolean>(false)
  const [committing, setCommitting] = useState<boolean>(false)
  const updatesToCommit = useRef(new Set<Uint8Array>())

  const awarenessChanged = useCallback(
    (awareness: awarenessProtocol.Awareness) => {
      const infos: AwarenessInfo[] = Array.from(awareness.getStates().values())
        .map(i => {
          return {
            user: i.user
          }
        })
        .filter(i => i.user)
      // devLog('awarenessChanged', infos)
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

          MashcardEventBus.dispatch(
            docHistoryReceived({
              docId: blockId,
              histories: Object.fromEntries((histories as DocumentHistory[]).map(h => [h.id, h])),
              users: Object.fromEntries((users as User[]).map(u => [u.name, u]))
            })
          )

          if (provider && operatorId && operatorId !== globalThis.mashcardContext.uuid) {
            blocks.forEach(remoteBlock => {
              if (remoteBlock.id === blockId) {
                block.current = remoteBlock
              }
            })
            const remoteState = Y.mergeUpdates(
              blockStates.filter(s => s.state).map(s => base64.parse(s.state as string))
            )
            Y.applyUpdate(provider.document, remoteState)
            setBlockMetaUpdated(Object.fromEntries(provider.document.getMap('meta').entries()))
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
        if (globalThis.mashcardContext.uuid !== operatorId) {
          devLog(`received awareness updates from ${operatorId}`)
          if (provider) {
            try {
              awarenessProtocol.applyAwarenessUpdate(provider.awareness, base64.parse(updates), '')
            } catch {}
            awarenessChanged(provider.awareness)
          }
        }
      }
    },
    variables: { docId: blockId }
  })

  const setBlockMetaUpdated = useCallback(
    (meta: blockMeta) => {
      if (isEqual(meta, latestMeta)) return
      if (!historyId) {
        client.cache.modify({
          id: client.cache.identify({ __typename: 'DocumentInfo', id: blockId }),
          fields: {
            title() {
              return meta.title
            },
            icon() {
              return meta.icon
            }
          }
        })
        MashcardEventBus.dispatch(
          BlockMetaUpdated({
            id: blockId,
            meta
          })
        )
      }
      setBlockMeta(meta)
      latestMeta.current = meta
    },
    [blockId, historyId, setBlockMeta, client]
  )

  const commitState = useCallback(
    async (
      ydoc: Y.Doc,
      update?: Uint8Array,
      forceFull: boolean = false,
      restoreVersion: boolean = false
    ): Promise<void> => {
      devLog(`try commit state, committing:`, blockCommitting.current)
      if (update) updatesToCommit.current.add(update)
      if (blockCommitting.current) return
      blockCommitting.current = true
      setCommitting(true) // only one commiting once

      const stateIdToCommit = uuid()
      const updatesToSync = [...updatesToCommit.current.values()]
      const mergedUpdates = Y.mergeUpdates(updatesToSync)

      devLog(`commit state ${stateIdToCommit} from ${block.current.stateId}`)

      const statesCount = block.current.statesCount ?? 0
      const stateType = forceFull || statesCount === 0 ? Statetype.Full : Statetype.Update

      const meta = blockMetaChanged.current || stateType === Statetype.Full ? { ...latestMeta.current } : undefined
      // const content = stateType === Statetype.Full ? yDocToProsemirrorJSON(ydoc, 'default') : undefined
      const content = yDocToProsemirrorJSON(ydoc, 'default')

      const commitPromise = blockCommit({
        variables: {
          input: {
            documentId: blockId,
            blockId,
            operatorId: globalThis.mashcardContext.uuid,
            stateType,
            state: base64.stringify(mergedUpdates),
            stateId: stateIdToCommit,
            prevStateId: block.current.stateId ? block.current.stateId : undefined,
            statesCount,
            meta,
            content,
            restoreVersion
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
            if (updatesToCommit.current.size === 0) {
              blockMetaChanged.current = false
              setCommitting(false)
            } else {
              void commitState(ydoc)
            }
          }
          setBlockMetaUpdated(Object.fromEntries(ydoc.getMap('meta').entries()))
        }
      } catch (e) {
        blockCommitting.current = false
      }
    },
    [blockCommit, blockId, setCommitting, setBlockMetaUpdated]
  )

  const restoreHistory = useCallback(async () => {
    if (provider?.document && historyId) {
      void commitState(provider.document, Y.encodeStateAsUpdate(provider.document), true, true)
    }
  }, [commitState, historyId, provider?.document])

  const setMeta = useCallback(
    (newMeta: blockMeta) => {
      if (!editable) return
      blockMetaChanged.current = true
      if (provider) {
        setBlockMetaUpdated(newMeta)
        const metaYmap = provider?.document.getMap('meta')
        Object.keys(newMeta).forEach((k: string) => {
          if (newMeta[k]) {
            if (newMeta[k] !== metaYmap.get(k)) {
              metaYmap.set(k, newMeta[k])
            }
          } else {
            metaYmap.delete(k)
          }
        })
      }
    },
    [provider, setBlockMetaUpdated, editable]
  )

  useEffect(() => {
    if (data) {
      const newYdoc = new Y.Doc()
      const awareness = new awarenessProtocol.Awareness(newYdoc)
      devLog('Ydoc initialized')

      if (data.blockNew) {
        block.current = {
          id: blockId,
          stateId: data.blockNew.stateId,
          statesCount: data.blockNew.statesCount
        }
        if (block.current.stateId && data.blockNew.states) {
          devLog(`init from state ${block.current.stateId} (${data.blockNew.states.length})`)
          const remoteState = Y.mergeUpdates(
            data.blockNew.states.filter(s => s.state).map(s => base64.parse(s.state as string))
          )
          Y.applyUpdate(newYdoc, remoteState)
        } else {
          devLog('need to commit init state')
        }
        if (data.blockNew.documentInfo) {
          // TODO: fix PodBase type
          setDocumentInfo(data.blockNew.documentInfo as DocumentInfo)
        }
      }

      const provider = { document: newYdoc, awareness }
      setProvider(provider)
      const loadedMeta = Object.fromEntries(newYdoc.getMap('meta').entries())
      setBlockMetaUpdated(loadedMeta)
    }
  }, [blockId, historyId, data, setBlockMetaUpdated])

  useEffect(() => {
    if (!provider || !editable || historyId) return
    const { document: ydoc, awareness } = provider
    const ydocUpdateHandler = async (update: Uint8Array, origin: any, ydoc: Y.Doc): Promise<void> => {
      await commitState(ydoc, update)
    }
    ydoc.on('update', ydocUpdateHandler)

    const awarenessUpdateHandler = async ({ added, updated, removed }: any): Promise<void> => {
      awarenessChanged(awareness)
      const changes = added.concat(updated).concat(removed)
      const updates = awarenessProtocol.encodeAwarenessUpdate(awareness, changes)
      await awarenessUpdate({
        variables: {
          input: {
            docId: blockId,
            operatorId: globalThis.mashcardContext.uuid,
            updates: base64.stringify(updates)
          }
        }
      })
    }
    awareness.on('update', awarenessUpdateHandler)

    if (globalThis.mashcardContext.env === 'development') {
      ;(globalThis as any).debugDumpDocumentState = () => {
        return base64.stringify(Y.encodeStateAsUpdate(ydoc))
      }
    }

    return () => {
      ydoc.off('update', ydocUpdateHandler)
      awareness.off('update', awarenessUpdateHandler)
    }
  }, [blockId, historyId, editable, provider, awarenessChanged, awarenessUpdate, commitState])

  useEffect(() => {
    const subscriptions = [
      MashcardEventBus.subscribe(
        UpdateBlockMeta,
        ({ payload }) => {
          setMeta({ ...blockMeta, ...payload.meta })
        },
        { eventId: blockId }
      )
    ]
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe())
    }
  }, [setMeta, blockMeta, blockId])

  return {
    committing,
    provider,
    awarenessInfos,
    meta: blockMeta,
    documentInfo,
    setMeta,
    restoreHistory
  }
}
