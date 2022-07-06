import React from 'react'
import { Y } from '@mashcard/editor'
import * as awarenessProtocol from 'y-protocols/awareness'
import { base64 } from 'rfc4648'
import { uuid } from '@mashcard/active-support'
import { yDocToProsemirrorJSON } from 'y-prosemirror'

import {
  BlockNew,
  DocumentHistory,
  DocumentInfo,
  User,
  Statetype,
  useBlockNewQuery,
  useBlockCommitMutation,
  useDocumentSubscription,
  useAwarenessUpdateMutation,
  useAwarenessSubscription
} from '@/MashcardGraphQL'
import { devLog } from '@mashcard/design-system'
import { useApolloClient } from '@apollo/client'

import { MashcardEventBus, docHistoryReceived, BlockMetaUpdated, UpdateBlockMeta } from '@mashcard/schema'

export interface blockMeta {
  [key: string]: any
}

export interface blockProvider {
  awareness: awarenessProtocol.Awareness
  document: Y.Doc
}

export interface awarenessInfoUser extends User {
  color?: string
  operatorId: string
}

export interface awarenessInfo {
  user: awarenessInfoUser
}

export function useBlockSyncProvider(queryVariables: { blockId: string; historyId?: string; editable: boolean }): {
  committing: boolean
  loading: boolean
  provider?: blockProvider
  awarenessInfos: awarenessInfo[]
  meta: blockMeta
  documentInfo?: DocumentInfo
  setMeta: (meta: blockMeta) => void
} {
  const client = useApolloClient()

  const [blockCommit] = useBlockCommitMutation()
  const [awarenessUpdate] = useAwarenessUpdateMutation()

  const { blockId, historyId, editable } = queryVariables

  const block = React.useRef<BlockNew>({ id: blockId })
  const [blockMeta, setBlockMeta] = React.useState<blockMeta>({})
  const [documentInfo, setDocumentInfo] = React.useState<DocumentInfo>()
  const latestMeta = React.useRef<blockMeta>({})
  const [provider, setProvider] = React.useState<blockProvider>()
  const [awarenessInfos, setAwarenessInfos] = React.useState<awarenessInfo[]>([])

  const blockCommitting = React.useRef<boolean>(false)
  const blockMetaChanged = React.useRef<boolean>(false)
  const [committing, setCommitting] = React.useState<boolean>(false)
  const updatesToCommit = React.useRef(new Set<Uint8Array>())

  const { data, loading } = useBlockNewQuery({
    variables: { id: blockId, historyId },
    fetchPolicy: 'no-cache'
  })

  const awarenessChanged = React.useCallback(
    (awareness: awarenessProtocol.Awareness) => {
      const infos: awarenessInfo[] = Array.from(awareness.getStates().values())
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
        if (updates) {
          devLog(`received awareness updates from ${operatorId}`)
          if (provider && updates.length > 0) {
            try {
              awarenessProtocol.applyAwarenessUpdate(provider.awareness, base64.parse(updates as string), '')
            } catch {}
            awarenessChanged(provider.awareness)
          }
        }
      }
    },
    variables: { docId: blockId }
  })

  const setBlockMetaUpdated = React.useCallback(
    (meta: blockMeta) => {
      // TODO: refactor to remove BlockInfo
      client.cache.modify({
        id: client.cache.identify({ __typename: 'BlockInfo', id: blockId }),
        fields: {
          title() {
            return meta.title
          },
          icon() {
            return meta.icon
          }
        }
      })
      client.cache.modify({
        id: client.cache.identify({ __typename: 'Block', id: blockId }),
        fields: {
          text() {
            return meta.title
          },
          meta() {
            return meta
          }
        }
      })
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
      setBlockMeta(meta)
      latestMeta.current = meta
      MashcardEventBus.dispatch(
        BlockMetaUpdated({
          id: blockId,
          meta
        })
      )
    },
    [blockId, setBlockMeta, client]
  )

  const commitState = React.useCallback(
    async (ydoc: Y.Doc, update?: Uint8Array, forceFull: boolean = false): Promise<void> => {
      if (!editable) return
      if (historyId) return
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
            content
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
    [blockCommit, blockId, historyId, setCommitting, setBlockMetaUpdated, editable]
  )

  const setMeta = React.useCallback(
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

  React.useEffect(() => {
    if (data && !loading) {
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

      if (!historyId && editable) {
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
                operatorId: globalThis.mashcardContext.uuid,
                updates: base64.stringify(updates)
              }
            }
          })
          await updatePromise
        })

        if (data.blockNew?.documentInfo) {
          if (data.blockNew.documentInfo.title !== loadedMeta.title) {
            newYdoc.getMap('meta').set('title', data.blockNew.documentInfo.title)
          }
        }
      }
    }
  }, [blockId, historyId, data, loading, commitState, awarenessUpdate, awarenessChanged, setBlockMetaUpdated, editable])

  React.useEffect(() => {
    const subscriptions = [
      MashcardEventBus.subscribe(
        UpdateBlockMeta,
        ({ payload }) => {
          setMeta({ ...blockMeta, ...payload.meta })
        },
        { subscribeId: blockId }
      )
    ]
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe())
    }
  }, [setMeta, blockMeta, blockId])

  return {
    committing,
    loading,
    provider,
    awarenessInfos,
    meta: blockMeta,
    documentInfo,
    setMeta
  }
}
