import React from 'react'
import { Editor } from '@tiptap/core'
import Text from '@tiptap/extension-text'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { TocItem } from './TocBlock'
import { name as UserBlockName } from '../../extensions/user/name'
import { name as PageLinkName } from '../../extensions/pageLink/name'
import { name as FormulaName } from '../../extensions/formula/name'
import { UserRender } from '../User'
import { PageLinkRender } from '../PageLink'
import { FormulaRender } from '../../extensions/formula/FormulaBlock'

export interface TocNode {
  parent?: TocNode
  children: TocNode[]
  item: TocItem
}

const createContentFromNode = (node: ProsemirrorNode): React.ReactNode => {
  const content: React.ReactNode[] = []
  node.content.forEach(node => {
    switch (node.type.name) {
      case Text.name:
        content.push(node.text ?? null)
        break
      case UserBlockName:
        content.push(<UserRender attributes={node.attrs} />)
        break
      case PageLinkName:
        content.push(<PageLinkRender attributes={node.attrs} />)
        break
      case FormulaName:
        content.push(<FormulaRender attributes={node.attrs as any} />)
        break
      default:
        break
    }
  })

  if (content.filter(i => i).length === 0) return null
  return content.map((node, index) => <React.Fragment key={index}>{node}</React.Fragment>)
}

const findTocNode = (node: ProsemirrorNode, pos: number): TocNode | undefined => {
  if (node.type.name === 'heading') {
    return {
      children: [],
      item: {
        level: node.attrs.level,
        position: pos,
        content: createContentFromNode(node),
        nodeSize: node.nodeSize
      }
    }
  } else if (node.marks.some(mark => mark.type.name === 'anchor')) {
    return {
      children: [],
      item: {
        level: 'text',
        content: createContentFromNode(node),
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
