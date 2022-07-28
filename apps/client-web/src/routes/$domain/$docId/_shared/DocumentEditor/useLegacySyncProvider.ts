import { Block, BlockInput, GetSpreadsheetChildrenDocument, useBlockSyncBatchMutation } from '@/MashcardGraphQL'
import { useApolloClient } from '@apollo/client'
import { devLog, devWarning } from '@mashcard/design-system'
import { dispatchFormulaBlockNameChange } from '@mashcard/formula'
import {
  BlockDeleted,
  BlockSynced,
  BlockUpdated,
  CommitBlocks,
  DeleteBlock,
  Event,
  loadSpreadsheetBlocks,
  MashcardEventBus,
  SpreadsheetLoaded,
  UpdateBlock
} from '@mashcard/schema'
import { useCallback, useEffect, useRef, useState } from 'react'

export type UpdateBlocks = (blocks: BlockInput[], toDeleteIds: string[]) => Promise<void>

/**
 * @deprecated
 */
export function useLegacySyncProvider(queryVariables: { rootId: string; historyId?: string; domain: string }): {
  committing: boolean
  updateBlocks: UpdateBlocks
} {
  const rootId = useRef<string>(queryVariables.rootId)

  const client = useApolloClient()
  const [blockSyncBatch] = useBlockSyncBatchMutation()

  const [committing, setCommitting] = useState<boolean>(false)

  const dirtyBlocksMap = useRef(new Map<string, BlockInput>())
  const dirtyToDeleteIds = useRef(new Set<string>())

  useEffect(() => {
    rootId.current = queryVariables.rootId
  }, [queryVariables])

  const commitDirty = useCallback(async (): Promise<void> => {
    if (!dirtyBlocksMap.current.size && !dirtyToDeleteIds.current.size) return
    if (committing) return

    setCommitting(true)

    try {
      const blocks: BlockInput[] = Array.from(dirtyBlocksMap.current.values()).map(b => {
        // HACK: delete all __typename
        const block = {
          __typename: undefined,
          deletedAt: undefined,
          blobs: undefined,
          rootId: undefined,
          ...b,
          meta: b.meta ?? {}
        }
        delete block.__typename
        delete block.deletedAt
        delete block.blobs
        delete block.rootId
        if (!block.parentId) {
          delete block.parentId
        }
        return block
      })

      const deletedIds = [...dirtyToDeleteIds.current]

      if (blocks.length > 0 || deletedIds.length > 0) {
        blocks.forEach(b => {
          if (b.type === 'doc') {
            void dispatchFormulaBlockNameChange({ id: b.id, name: b.text, username: queryVariables.domain })
          }
          MashcardEventBus.dispatch(BlockUpdated(b as Block))
          dirtyBlocksMap.current.delete(b.id)
        })
        deletedIds.forEach(id => {
          const block = { id }
          MashcardEventBus.dispatch(BlockDeleted(block as Block))
          dirtyToDeleteIds.current.delete(id)
        })

        const syncPromise = blockSyncBatch({
          variables: {
            input: {
              blocks,
              deletedIds,
              rootId: rootId.current,
              operatorId: globalThis.mashcardContext.uuid
            }
          }
        })
        await syncPromise
        blocks.forEach(b => {
          MashcardEventBus.dispatch(BlockSynced(b as Block))
        })
      }
    } catch (e) {
      devWarning(true, e)
    } finally {
      setCommitting(false)
    }
    if (dirtyBlocksMap.current.size === 0 && dirtyToDeleteIds.current.size === 0) {
      // isSavingVar(false)
    } else {
      setTimeout(() => {
        void commitDirty()
      }, 500)
    }
  }, [blockSyncBatch, queryVariables.domain, committing, setCommitting])

  MashcardEventBus.subscribe(
    BlockUpdated,
    e => {
      const block = e.payload

      if (block.id === rootId.current) {
        client.cache.modify({
          id: client.cache.identify({ __typename: 'BlockInfo', id: block.id }),
          fields: {
            title() {
              return block.text
            },
            icon() {
              return block.meta.icon
            }
          }
        })
        client.cache.modify({
          id: client.cache.identify({ __typename: 'BlockPath', id: block.id }),
          fields: {
            text() {
              return block.text
            }
          }
        })
        client.cache.modify({
          id: client.cache.identify({ __typename: 'block', id: block.id }),
          fields: {
            text() {
              return block.text
            },
            meta() {
              return block.meta
            }
          }
        })
      }
    },
    { subscribeId: 'SyncProvider' }
  )

  // MashcardEventBus.subscribe(
  //   BlockDeleted,
  //   e => {
  //     const block = e.payload
  //   },
  //   { subscribeId: 'SyncProvider' }
  // )

  MashcardEventBus.subscribe(
    UpdateBlock,
    e => {
      // isSavingVar(true)
      const { block, commit } = e.payload
      dirtyBlocksMap.current.set(block.id, block)
      if (commit) {
        void commitDirty()
      }
    },
    { subscribeId: 'SyncProvider' }
  )

  MashcardEventBus.subscribe(
    DeleteBlock,
    e => {
      // isSavingVar(true)
      const { blockId, commit } = e.payload
      dirtyToDeleteIds.current.add(blockId)
      if (commit) {
        void commitDirty()
      }
    },
    { subscribeId: 'SyncProvider' }
  )

  MashcardEventBus.subscribe(
    CommitBlocks,
    (e: Event) => {
      // isSavingVar(true)
      void commitDirty()
    },
    { subscribeId: 'SyncProvider' }
  )

  MashcardEventBus.subscribe(
    loadSpreadsheetBlocks,
    e => {
      const parentId = e.payload
      devLog(`loading spreadsheet ${parentId}`)
      void (async () => {
        const { data } = await client.query({
          query: GetSpreadsheetChildrenDocument,
          variables: {
            parentId
          },
          fetchPolicy: 'no-cache'
        })
        const { blocks } = data.spreadsheetChildren
        MashcardEventBus.dispatch(
          SpreadsheetLoaded({
            parentId,
            blocks
          })
        )
      })()
    },
    { subscribeId: 'SyncProvider' }
  )

  const updateBlocks = async (blocks: BlockInput[], toDeleteIds: string[]): Promise<void> => {
    // isSavingVar(true)
    blocks.forEach(block => dirtyBlocksMap.current.set(block.id, block))
    toDeleteIds.forEach(id => dirtyToDeleteIds.current.add(id))

    await commitDirty()
  }

  return {
    committing,
    updateBlocks
  }
}
