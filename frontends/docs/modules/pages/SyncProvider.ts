import { Node } from 'prosemirror-model'
import {
  BlockSyncInput,
  PageBlockData,
  ParagraphBlockData,
  Block,
  BlockSyncBatchInput,
  BlockSyncBatchMutation,
  BlockSyncBatchMutationVariables,
  PageBlockMeta,
  ParagraphBlockMeta
} from '@/BrickdocGraphQL'
import { JSONContent } from '@tiptap/core'
import { ApolloCache, MutationTuple } from '@apollo/client'

const nodeChildren = (node: Node): Node[] => {
  // TODO Fragment type missing content field
  return (node.content as any).content
}

const exceptUUID = (content: JSONContent[] | undefined): JSONContent[] | undefined => {
  if (!content) {
    return
  }
  return content?.map(i => {
    const { uuid, sort, ...attrs } = i.attrs ?? {}
    const result = { ...i, attrs }
    if (i.content) {
      return { ...result, content: exceptUUID(i.content) }
    } else {
      return result
    }
  })
}

// https://prosemirror.net/docs/ref/#model.Node
const nodeToBlock = (node: Node, level: number): BlockSyncInput[] => {
  const { uuid, sort, ...rest } = node.attrs
  const parent: BlockSyncInput = {
    id: uuid,
    // sort: sort, ## TODO
    type: node.type.name
  }

  if (level === 0) {
    ;(parent.data as PageBlockData) = { title: 'Untitled' }
    ;(parent.meta as PageBlockMeta) = {}
  } else {
    ;(parent.data as ParagraphBlockData) = {
      text: node.textContent,
      content: JSON.stringify(exceptUUID((node.toJSON() as JSONContent).content))
    }
    ;(parent.meta as ParagraphBlockMeta) = { attrs: JSON.stringify(rest) }
  }

  const childrenBlocks = level === 0 ? nodeChildren(node) : []
  const children = childrenBlocks.flatMap((n: Node, index: number) =>
    nodeToBlock(n, level + 1).map((i: BlockSyncInput) => ({ parentId: parent.id, sort: index * 100, ...i }))
  )

  return [parent, ...children]
}

export const blockToNode = (block: Block): JSONContent => {
  const result: JSONContent = {
    type: block.type
  }

  if (block.meta && 'attrs' in block.meta) {
    result.attrs = JSON.parse(block.meta.attrs ?? '{}')
  } else {
    result.attrs = {}
  }

  // NOTE patch UPDATE
  if (block.id) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    result.attrs!.uuid = block.id
  }

  // NOTE patch UPDATE
  if (block.sort !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    result.attrs!.sort = block.sort
  }

  if (block.data && 'content' in block.data) {
    const content = JSON.parse(block.data.content)
    result.content = content
  }

  return result
}

export const blocksToJSONContents = (blocks: Block[], id?: string): JSONContent[] =>
  blocks
    .filter(block => block.parentId === id)
    .sort((a, b) => a.sort - b.sort)
    .map(block => ({ content: blocksToJSONContents(blocks, block.id), ...blockToNode(block) }))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function syncProvider<TApolloContext, TApolloCache extends ApolloCache<any>>({
  blockSyncBatch
}: {
  blockSyncBatch: MutationTuple<BlockSyncBatchMutation, BlockSyncBatchMutationVariables, TApolloContext, TApolloCache>[0]
}) {
  return {
    onCommit: (doc: Node) => {
      const blocks = nodeToBlock(doc, 0)
      const input: BlockSyncBatchInput = { blocks, rootId: doc.attrs.uuid, operatorId: globalThis.brickdocContext.uuid }
      void blockSyncBatch({ variables: { input } })
    }
  }
}
