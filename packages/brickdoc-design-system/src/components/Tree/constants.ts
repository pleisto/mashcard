import { ReactNode } from 'react'

/**
 * A type that represents the data held by a tree node.
 */
export interface TreeNode {
  /** The identifier of the node. */
  id: string
  /** The text to be displayed on the node. */
  text: string
  /** Any additional data to be stored on the node. */
  value?: any
  /** The parent's ID. */
  parentId?: string | null
  /** The ID of the node's root ancestor. */
  rootId?: string
  /** The icon content to be rendered prior to the node's content. */
  icon?: string | null
  /** Indicates if the node is expanded. */
  isExpanded?: boolean
  /** The list of the node's children. */
  children?: TreeNode[]
}

/**
 * The node data type used internally by the `Tree` component.
 * It contains contextual information to form the tree.
 */
export type InternalTreeNode = TreeNode & {
  hasChildren: boolean
  indent: number
  isEmptyNode?: boolean
  nearNodeId?: string
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

export type TreeNodeRenderer = (node: InternalTreeNode) => ReactNode
