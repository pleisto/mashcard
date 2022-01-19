/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react'
import { Node } from 'prosemirror-model'
import { useApolloClient } from '@apollo/client'
import { BlockInput, Block, useGetChildrenBlocksQuery, useBlockSyncBatchMutation } from '@/BrickdocGraphQL'
import { isEqual } from 'lodash-es'
import { isSavingVar } from '../../reactiveVars'
import { nodeToBlock } from '../../common/blocks'
import { BrickdocEventBus, Event, BlockUpdated, BlockDeleted, BlockNameLoad, BlockSynced } from '@brickdoc/schema'

export type UpdateBlocks = (blocks: BlockInput[], toDeleteIds: string[]) => Promise<void>

export function useSyncProvider(queryVariables: { rootId: string; snapshotVersion: number }): {
  rootBlock: React.MutableRefObject<Block | undefined>
  data: any
  loading: boolean
  refetch: any
  onDocSave: (doc: Node) => Promise<void>
  updateBlocks: UpdateBlocks
  // updateCachedDocBlock: (block: Block, toDelete: boolean) => void
} {
  const rootId = React.useRef<string>(queryVariables.rootId)

  const { data, loading, refetch } = useGetChildrenBlocksQuery({
    fetchPolicy: 'no-cache',
    variables: queryVariables
  })

  const client = useApolloClient()
  const [blockSyncBatch] = useBlockSyncBatchMutation()

  const committing = React.useRef(false)

  // const cachedBlocksMap = React.useRef(new Map<string, Block>())
  const docBlocksMap = React.useRef(new Map<string, Block>())
  const rootBlock = React.useRef<Block | undefined>()

  const dirtyBlocksMap = React.useRef(new Map<string, BlockInput>())
  const dirtyToDeleteIds = React.useRef(new Set<string>())

  React.useEffect(() => {
    rootId.current = queryVariables.rootId
    docBlocksMap.current = new Map<string, Block>()
    dirtyBlocksMap.current = new Map<string, Block>()
    dirtyToDeleteIds.current = new Set<string>()
    data?.childrenBlocks?.forEach(_block => {
      const block = _block as Block
      // cachedBlocksMap.current.set(block.id, block)
      docBlocksMap.current.set(block.id, block)
    })
    rootBlock.current = docBlocksMap.current.get(rootId.current)
  }, [queryVariables, data?.childrenBlocks])

  const commitDirty = async () => {
    if (committing.current) return

    committing.current = true

    try {
      const blocks: BlockInput[] = Array.from(dirtyBlocksMap.current.values()).filter(
        // commit only if parent block in doc
        ({ parentId, id }) =>
          !parentId ||
          id === rootId.current ||
          parentId === rootId.current ||
          docBlocksMap.current.get(parentId) ||
          dirtyBlocksMap.current.get(parentId)
      )
      const deletedIds = [...dirtyToDeleteIds.current]
      blocks.forEach(b => {
        BrickdocEventBus.dispatch(BlockNameLoad({ id: b.id, name: b.text }))
        BrickdocEventBus.dispatch(BlockUpdated(b))
        dirtyBlocksMap.current.delete(b.id)
      })
      deletedIds.forEach(id => {
        BrickdocEventBus.dispatch(BlockDeleted({ id }))
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
        BrickdocEventBus.dispatch(BlockSynced(b))
      })
    } catch {
      // Ignored
    } finally {
      committing.current = false
    }
    if (!dirtyBlocksMap.current.size && !dirtyToDeleteIds.current.size) {
      isSavingVar(false)
    } else {
      await commitDirty()
    }
  }

  const onDocSave = async (doc: Node): Promise<void> => {
    if (!docBlocksMap.current.size) return
    isSavingVar(true)
    const docBlocks = nodeToBlock(doc, 0)
    const deletedIds = new Set(docBlocksMap.current.keys())
    deletedIds.delete(rootId.current)

    // Document Blocks dirty check and maintian
    docBlocks.forEach(newBlock => {
      newBlock.sort = `${newBlock.sort}`
      const oldBlock = docBlocksMap.current.get(newBlock.id)
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
  }

  BrickdocEventBus.subscribe(
    BlockUpdated,
    (e: Event) => {
      const block: Block = e.payload
      const oldBlock = docBlocksMap.current.get(block.id) ?? {}
      docBlocksMap.current.set(block.id, { ...oldBlock, ...block })
      if (block.id === rootId.current) {
        client.cache.modify({
          id: client.cache.identify({ __typename: 'BlockInfo', id: block.id }),
          fields: {
            title() {
              return block.text
            }
          }
        })
        client.cache.modify({
          id: client.cache.identify({ __typename: 'block', id: block.id }),
          fields: {
            text() {
              return block.text
            }
          }
        })
      }
    },
    { subscribeId: 'SyncProvider' }
  )

  BrickdocEventBus.subscribe(
    BlockDeleted,
    (e: Event) => {
      const block: Block = e.payload
      docBlocksMap.current.delete(block.id)
    },
    { subscribeId: 'SyncProvider' }
  )

  const updateBlocks = async (blocks: BlockInput[], toDeleteIds: string[]) => {
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
