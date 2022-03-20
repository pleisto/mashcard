import { ReactNode } from 'react'

/**
 * A type that represents the data held by a tree node.
 */
export interface TreeNode {
  id: string
  value: string
  text: string
  parentId?: string | null | undefined
  rootId?: string
  icon?: string | null
  isExpanded?: boolean
  children?: TreeNode[]
}

/**
 * The node data type used internally by the `Tree` component.
 * It contains contextual information to form the tree.
 */
export type InternalTreeNode = TreeNode & {
  hasChildren: boolean
  indent: number
}

/**
 * The spots relative to a node.
 */
export enum NodeRelativeSpot {
  Before,
  After,
  AsChild
}

export interface NodeMovement {
  /** The index of the moving node. */
  sourceIndex: number
  /** The node's ID that is being moved. */
  sourceId: string
  /** The index of the node being placed upon. */
  targetIndex: number
  /** The node's ID upon which the moving node is placed. */
  targetId: string
  /** The relative position, to the target node,
   * of where the moving node will be placed. */
  targetSpot: NodeRelativeSpot
}

export type TreeNodeRenderer = (node: TreeNode) => ReactNode
