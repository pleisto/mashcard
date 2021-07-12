import { SyncCallback } from 'packages/brickdoc-editor/src/extensions'
import { Node } from 'prosemirror-model'
import { BlockSyncInput, PageBlockData, TextBlockData } from '@/BrickdocGraphQL'

// https://prosemirror.net/docs/ref/#model.Node
const nodeToBlock = (node: Node): BlockSyncInput[] => {
  const parent: BlockSyncInput = {
    id: (node as any).uuid,
    sort: (node as any).sort,
    type: node.type.name,
    meta: { attrs: JSON.stringify(node.attrs), marks: JSON.stringify(node.marks.map(n => n.toJSON())) }
  }

  switch (node.type.name) {
    case 'doc':
      ;(parent.data as PageBlockData) = { title: `[title] ${(node as any).uuid as string}` }
      break
    case 'text':
      ;(parent.data as TextBlockData) = { content: node.text }
      break
    default:
      ;(parent.data as any) = {}
      break
  }

  // NOTE Fragment type miss content field
  const fragment: any = node.content
  const children = fragment.content.flatMap((n: Node) =>
    nodeToBlock(n).map((i: BlockSyncInput) => {
      return { ...i, parentId: parent.id }
    })
  )

  return [parent, ...children]
}

const nest = (blocks, id = null) =>
  blocks.filter(block => block.parentId === id).map(block => ({ ...block, content: nest(blocks, block.id) }))

const blockToNode = ({ blocks, schema }): Node => {
  const nodes = nest(blocks)
  const node = Node.fromJSON(schema, nodes)
  return node
}

export const syncProvider = ({ blockSync, childrenBlocks }): SyncCallback => {
  return {
    onCommit: ({ node }) => {
      const inputs = nodeToBlock(node)
      console.log(inputs)
      inputs.map(input => blockSync({ variables: { input } }))
    },
    onLoad: ({ parentId, schema }) => {
      const [blocks] = childrenBlocks({ variables: { parentId } })
      const node = blockToNode({ blocks, schema })
      return node
    }
  }
}
