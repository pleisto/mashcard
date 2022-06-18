import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import { Node } from 'prosemirror-model'
import { useApolloClient } from '@apollo/client'
import {
  BlockInput,
  Block,
  useGetChildrenBlocksQuery,
  useBlockSyncBatchMutation,
  GetSpreadsheetChildrenDocument
} from '@/BrickdocGraphQL'
import { isEqual } from '@brickdoc/active-support'
import { devLog } from '@brickdoc/design-system'
import { isSavingVar } from '../../reactiveVars'
import { nodeToBlock } from '../../common/blocks'
import {
  BrickdocEventBus,
  Event,
  BlockUpdated,
  BlockDeleted,
  DocMetaLoaded,
  UpdateDocMeta,
  BlockSynced,
  UpdateBlock,
  DeleteBlock,
  CommitBlocks,
  loadSpreadsheetBlocks,
  SpreadsheetLoaded
} from '@brickdoc/schema'
import { dispatchFormulaBlockNameChange } from '@brickdoc/formula'

export type UpdateBlocks = (blocks: BlockInput[], toDeleteIds: string[]) => Promise<void>

export function useSyncProvider(queryVariables: { rootId: string; historyId?: string; domain: string }): {
  rootBlock: MutableRefObject<Block | undefined>
  data: any
  loading: boolean
  refetch: any
  onDocSave: (doc: Node) => Promise<void>
  updateBlocks: UpdateBlocks
  // updateCachedDocBlock: (block: Block, toDelete: boolean) => void
} {
  const rootId = useRef<string>(queryVariables.rootId)

  const { data, loading, refetch } = useGetChildrenBlocksQuery({
    fetchPolicy: 'no-cache',
    variables: {
      rootId: queryVariables.rootId,
      snapshotVersion: 0
    }
  })

  const client = useApolloClient()
  const [blockSyncBatch] = useBlockSyncBatchMutation()

  const committing = useRef(false)

  const cachedBlocksMap = useRef(new Map<string, Block>())
  const docBlocksMap = useRef(new Map<string, Block>())
  const rootBlock = useRef<Block | undefined>()

  const dirtyBlocksMap = useRef(new Map<string, BlockInput>())
  const dirtyToDeleteIds = useRef(new Set<string>())

  useEffect(() => {
    rootId.current = queryVariables.rootId
    cachedBlocksMap.current = new Map<string, Block>()
    docBlocksMap.current = new Map<string, Block>()
    dirtyBlocksMap.current = new Map<string, Block>()
    dirtyToDeleteIds.current = new Set<string>()
    data?.childrenBlocks?.forEach(_block => {
      const block = _block as Block
      // cachedBlocksMap.current.set(block.id, block)
      docBlocksMap.current.set(block.id, block)
    })
    rootBlock.current = docBlocksMap.current.get(rootId.current)
    if (rootBlock.current) {
      const { id, meta } = rootBlock.current
      BrickdocEventBus.dispatch(DocMetaLoaded({ id, meta }))
    }
  }, [queryVariables, data?.childrenBlocks])

  const commitDirty = useCallback(async (): Promise<void> => {
    if (!dirtyBlocksMap.current.size && !dirtyToDeleteIds.current.size) return
    if (committing.current) return

    committing.current = true

    try {
      const blocks: BlockInput[] = Array.from(dirtyBlocksMap.current.values())
        .filter(
          // commit only if parent block in doc
          ({ parentId, id }) =>
            (!parentId || id === rootId.current || cachedBlocksMap.current.get(parentId)) ??
            docBlocksMap.current.get(parentId) ??
            dirtyBlocksMap.current.get(parentId)
        )
        .map(b => {
          // HACK: delete all __typename
          const block = {
            __typename: undefined,
            deletedAt: undefined,
            blobs: undefined,
            rootId: undefined,
            ...b,
            meta: b.meta ?? {}
          }
          if (b.id === rootBlock.current?.id) {
            block.meta = { ...rootBlock.current.meta, ...block.meta }
            block.text = block.meta.title ?? ''
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
          BrickdocEventBus.dispatch(BlockUpdated(b as Block))
          dirtyBlocksMap.current.delete(b.id)
        })
        deletedIds.forEach(id => {
          const block = { id }
          BrickdocEventBus.dispatch(BlockDeleted(block as Block))
          dirtyToDeleteIds.current.delete(id)
        })

        const syncPromise = blockSyncBatch({
          variables: {
            input: {
              blocks,
              deletedIds,
              rootId: rootId.current,
              operatorId: globalThis.brickdocContext.uuid
            }
          }
        })
        await syncPromise
        blocks.forEach(b => {
          BrickdocEventBus.dispatch(BlockSynced(b as Block))
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      committing.current = false
    }
    if (dirtyBlocksMap.current.size === 0 && dirtyToDeleteIds.current.size === 0) {
      isSavingVar(false)
    } else {
      setTimeout(() => {
        void commitDirty()
      }, 500)
    }
  }, [blockSyncBatch, queryVariables.domain])

  const onDocSave = useCallback(
    async (doc: Node): Promise<void> => {
      if (queryVariables.historyId) return
      if (!docBlocksMap.current.size) return
      isSavingVar(true)
      // NOTE: tempfix for root uuid
      // TODO: need avoid modify read-only prop
      // @ts-expect-error
      doc.attrs.uuid = rootId.current ?? doc.attrs.uuid
      const docBlocks = nodeToBlock(doc, 0)
      const deletedIds = new Set(docBlocksMap.current.keys())
      deletedIds.delete(rootId.current)

      // Document Blocks dirty check and maintian
      docBlocks.forEach(newBlock => {
        newBlock.sort = `${newBlock.sort}`
        const oldBlock = docBlocksMap.current.get(newBlock.id)
        // TODO: Improve dirty check
        if (!oldBlock || !isEqual(oldBlock, newBlock)) {
          dirtyBlocksMap.current.set(newBlock.id, newBlock)
          docBlocksMap.current.set(newBlock.id, newBlock as Block)
        }
        deletedIds.delete(newBlock.id)
      })

      deletedIds.forEach(id => {
        dirtyToDeleteIds.current.add(id)
        docBlocksMap.current.delete(id)
      })

      await commitDirty()
    },
    [commitDirty, queryVariables.historyId]
  )

  BrickdocEventBus.subscribe(
    BlockUpdated,
    e => {
      const block = e.payload
      const oldBlock = docBlocksMap.current.get(block.id) ?? {}
      if (docBlocksMap.current.get(block.id)) {
        // update only on doc blocks
        docBlocksMap.current.set(block.id, { ...oldBlock, ...block })
      } else {
        cachedBlocksMap.current.set(block.id, { ...oldBlock, ...block })
      }

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

  BrickdocEventBus.subscribe(
    BlockDeleted,
    e => {
      const block = e.payload
      docBlocksMap.current.delete(block.id)
    },
    { subscribeId: 'SyncProvider' }
  )

  BrickdocEventBus.subscribe(
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

  BrickdocEventBus.subscribe(
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

  BrickdocEventBus.subscribe(
    UpdateDocMeta,
    e => {
      const { id, meta } = e.payload
      if (id === rootBlock.current?.id) {
        const newBlock = { ...rootBlock.current, meta: { ...rootBlock.current.meta, ...meta } }
        newBlock.text = newBlock.meta.title ?? ''
        dirtyBlocksMap.current.set(id, newBlock)
        void commitDirty()
      }
    },
    { subscribeId: 'SyncProvider' }
  )

  BrickdocEventBus.subscribe(
    CommitBlocks,
    (e: Event) => {
      isSavingVar(true)
      void commitDirty()
    },
    { subscribeId: 'SyncProvider' }
  )

  BrickdocEventBus.subscribe(
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
        blocks.forEach((block: Block) => {
          cachedBlocksMap.current.set(block.id, block)
        })
        BrickdocEventBus.dispatch(
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
    isSavingVar(true)
    blocks.forEach(block => dirtyBlocksMap.current.set(block.id, block))
    toDeleteIds.forEach(id => dirtyToDeleteIds.current.add(id))

    await commitDirty()
  }

  return {
    rootBlock,
    data,
    loading,
    refetch,
    onDocSave,
    updateBlocks
  }
}
