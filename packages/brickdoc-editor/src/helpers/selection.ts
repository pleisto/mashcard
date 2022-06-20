import { Editor, NodeRange } from '@tiptap/core'
import { Node } from 'prosemirror-model'

// TODO defines these methods in editor commands
export function findNodesInSelection(editor: Editor, from: number, to: number): NodeRange[] {
  let nodeRanges: NodeRange[] = []

  editor.state.doc.nodesBetween(from, to, (node, pos) => {
    if (!node.isText) {
      const relativeFrom = Math.max(from, pos)
      const relativeTo = Math.min(to, pos + node.nodeSize)

      nodeRanges = [
        ...nodeRanges,
        {
          node,
          from: relativeFrom,
          to: relativeTo
        }
      ]
    }
  })
  return nodeRanges
}

export function findSelectedNodes(editor: Editor): NodeRange[] {
  return findNodesInSelection(editor, editor.state.selection.from, editor.state.selection.to)
}

export function findFirstSelectedNodes(editor: Editor | null | undefined): {
  node: Node | undefined
  nodeKey: string | undefined
} {
  if (!editor) return { node: undefined, nodeKey: undefined }
  const node = findSelectedNodes(editor)[0].node
  const nodeKey = node?.type.name === 'heading' ? `${node.type.name}${node?.attrs.level}` : node?.type.name

  return { node, nodeKey }
}
