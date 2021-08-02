import { Node } from 'prosemirror-model'
import { BlockInput, Block, BlockSyncBatchInput, BlockSyncBatchMutation, BlockSyncBatchMutationVariables } from '@/BrickdocGraphQL'
import { JSONContent } from '@tiptap/core'
import { ApolloCache, MutationTuple } from '@apollo/client'
import { isNil } from 'lodash'

const nodeChildren = (node: Node): Node[] => {
  // TODO Fragment type missing content field
  return (node.content as any).content
}

const SIZE_GAP = 2 ** 32

const withoutUUID = (content: JSONContent[] | undefined): JSONContent[] => {
  if (!content) {
    return []
  }
  return content.map(i => {
    const { uuid, sort, ...attrs } = i.attrs ?? {}
    const result = { ...i, attrs }
    if (i.content) {
      return { ...result, content: withoutUUID(i.content) }
    } else {
      return result
    }
  })
}

// https://prosemirror.net/docs/ref/#model.Node
const nodeToBlock = (node: Node, level: number): BlockInput[] => {
  const { uuid, sort, ...rest } = node.attrs

  // TODO check if has child
  const hasChildren =
    level === 0 ||
    (node.type.name === 'paragraph' && nodeChildren(node) && nodeChildren(node).length && nodeChildren(node)[0].type.name === 'paragraph')

  const text = hasChildren ? 'Untitled' : node.textContent

  const content: JSONContent[] = hasChildren ? [] : withoutUUID((node.toJSON() as JSONContent).content)

  const parent: BlockInput = {
    id: uuid,
    // sort: sort, ## TODO
    type: node.type.name,
    meta: rest,
    data: { text, content }
  }

  const childrenBlocks = hasChildren ? nodeChildren(node) : []
  const children = childrenBlocks.flatMap((n: Node, index: number) =>
    // TODO multiple level
    nodeToBlock(n, level + 1).map((i: BlockInput) => ({ parentId: parent.id, sort: index * SIZE_GAP, ...i }))
  )

  return [parent, ...children]
}

export const blockToNode = (block: Block): JSONContent => {
  const data = block.data
  const attrs: JSONContent['attrs'] = { ...block.meta }

  // NOTE patch UPDATE
  if (block.id) {
    attrs.uuid = block.id
  }

  // NOTE patch UPDATE
  if (block.sort !== undefined) {
    attrs.sort = block.sort
  }

  const result: JSONContent = {
    type: block.type,
    attrs
  }

  if (data.text) {
    result.text = data.text
  }

  if (data.content.length) {
    result.content = data.content
  }

  return result
}

export const blocksToJSONContents = (blocks: Block[], id?: string): JSONContent[] =>
  blocks
    .filter(block => block.parentId === id || (isNil(block.parentId) && isNil(id)))
    .sort((a, b) => Number(a.sort) - Number(b.sort))
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
