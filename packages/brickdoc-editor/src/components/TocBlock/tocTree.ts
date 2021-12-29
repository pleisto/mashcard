import { Editor } from '@tiptap/core'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { TocItem } from './TocBlock'

export interface TocNode {
  parent?: TocNode
  children: TocNode[]
  item: TocItem
}

const findTocNode = (node: ProsemirrorNode, pos: number): TocNode | undefined => {
  if (node.type.name === 'heading') {
    return {
      children: [],
      item: {
        level: node.attrs.level,
        position: pos,
        text: node.textContent,
        nodeSize: node.nodeSize
      }
    }
  } else if (node.marks.some(mark => mark.type.name === 'anchor')) {
    return {
      children: [],
      item: {
        level: 'text',
        text: node.textContent,
        position: pos,
        nodeSize: node.nodeSize
      }
    }
  }

  return undefined
}

const compareNode = (nodeA: TocNode, nodeB: TocNode): -1 | 0 | 1 => {
  if (nodeA.item.level === nodeB.item.level) return 0

  if (nodeA.item.level === 'root') return -1
  if (nodeA.item.level === 'text') return 1

  if (nodeB.item.level === 'root') return 1
  if (nodeB.item.level === 'text') return -1

  return nodeA.item.level > nodeB.item.level ? 1 : -1
}

const addTocNode = (nearestNode: TocNode, node: TocNode): TocNode => {
  if (compareNode(nearestNode, node) === -1) {
    const parent = nearestNode
    node.parent = parent
    parent.children.push(node)
  } else {
    addTocNode(nearestNode.parent!, node)
  }

  return node
}

export function initialTocTree(doc: Editor['state']['doc']): [TocNode, number] {
  const tocTreeRoot: TocNode = {
    children: [],
    item: {
      level: 'root',
      position: 0,
      nodeSize: 1
    }
  }
  let count = 0

  let nearestNode: TocNode = tocTreeRoot

  doc.descendants((node, pos) => {
    const tocNode = findTocNode(node, pos)
    if (tocNode) {
      count += 1
      nearestNode = addTocNode(nearestNode, tocNode)
    }
  })

  return [tocTreeRoot, count]
}
