import { XYCoord } from 'react-dnd'
import { NodeRelativeSpot, type TreeNode } from './constants'
import { uniq } from '@brickdoc/active-support'

/**
 * join `newId` by its full path in `tree` to `existingIds`.
 * @returns A list of node IDs that includes the full path to `newId`.
 */
export function joinNodeIdsByPath(tree: TreeNode[], newId: string, existingIds?: string[]): string[] {
  const result = existingIds ?? []
  const wantedPath = new Set<string>()
  const found = getNodePath(tree, newId, wantedPath)
  return found ? uniq([...result, ...wantedPath]) : result
}

function getNodePath(tree: TreeNode[], id: string, path: Set<string>): boolean {
  if (path.has(id)) return true
  for (const node of tree) {
    if (node.id === id) {
      path.add(node.id)
      return true
    }
    if (node.children && node.children.length > 0) {
      const found = getNodePath(node.children, id, path)
      if (found) {
        path.add(node.id)
        return true
      }
    }
  }
  return false
}

/**
 * Calculate which relative spot a point fits in based on the
 * `targetNode`'s local coordinate system.
 * @param pos The X-Y coordinate of the point to check.
 * @param targetNode The target node used as the reference area.
 * @returns The calculated relative spot, or `null` if the operation is invalid.
 */
export function calculateRelativeSpot(pos: XYCoord | null, targetNode: HTMLElement | null): NodeRelativeSpot | null {
  // Determine node's rectangle in the browser window
  const targetRect = targetNode?.getBoundingClientRect()
  if (!targetRect) return null
  if (pos === null) return null

  // Get the rect center's y-pos
  const midY = (targetRect.bottom - targetRect.top) / 2
  // Get the point's LOCAL y-pos (in rect's local system)
  const localY = pos.y - targetRect.top

  const topThreshold = midY - 10
  const bottomThreshold = midY + 10
  if (localY <= topThreshold) {
    return NodeRelativeSpot.Before
  }
  if (localY >= bottomThreshold) {
    return NodeRelativeSpot.After
  }
  return NodeRelativeSpot.AsChild
}

export function flattenNodes(nodes: TreeNode[]): TreeNode[] {
  return nodes.reduce<TreeNode[]>((acc, node) => [...acc, ...flattenNode(node)], [])
}

export function flattenNode(node: TreeNode): TreeNode[] {
  const self = [node]
  return node.children ? node.children.reduce<TreeNode[]>((acc, child) => [...acc, ...flattenNode(child)], self) : self
}
