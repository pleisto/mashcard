import { FC, useCallback, useState, useMemo, ReactNode, memo } from 'react'
import type { TNode } from './constants'
import Node from './node'
// import { TreeRoot } from './style'

export interface TreeNode {
  id: string
  labelNode: ReactNode
  showArrow?: boolean
  children?: TreeNode[]
}

export interface FlattenedTreeNode {
  id: string
  labelNode: ReactNode
  showArrow?: boolean
  hasChildren: boolean
  depth: number
  collapsed: boolean
}

/* interface Props {
 *   data: TreeNode[];
 *   className?: string;
 *   collapseAll?: boolean;
 * } */

export interface TreeProps {
  treeData: TNode[]
  className?: string
  openAll?: boolean
  selectedKeys: string[]
  titleRender?: (node: TNode) => ReactNode
}

/** Tree
 * @example
 */
const TreeInternal: FC<TreeProps> = ({
  treeData,
  openAll = false,
  titleRender
  /* selectedKeys,
   * className */
}) => {
  const [closedItemIds, setClosedItemIds] = useState<string[]>(
    openAll ? treeData.map(node => node.value) : treeData.filter(node => node.isOpen).map(node => node.value)
  )

  const [selectedId, setSelectedId] = useState<string>()
  // console.log(selectedKeys, 'selectedKeysselectedKeysselectedKeys')
  const flattenNode = useCallback(
    (node, indent: number, result: TNode[]) => {
      const { children, value } = node
      const isOpen = closedItemIds.includes(value)
      result.push({
        ...node,
        hasChildren: (children ?? []).length > 0,
        indent: indent ?? 0,
        isOpen
      })

      if (!isOpen && children) {
        for (const child of children) {
          flattenNode(child, indent + 1, result)
        }
      }
    },
    [closedItemIds]
  )

  const renderTree = useMemo(() => {
    const result: TNode[] = []
    for (const node of treeData) {
      flattenNode(node, 0, result)
    }
    return result
  }, [treeData, flattenNode])

  const handleSelected = useCallback((id: string) => setSelectedId(id), [setSelectedId])

  const handleItemClick = useCallback(
    (node: TNode) =>
      node.isOpen
        ? setClosedItemIds(closedNodeIds => closedNodeIds.filter(value => value !== node.value))
        : setClosedItemIds(closedNodeIds => [...closedNodeIds, node.value]),
    []
  )

  // const parentRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {renderTree.map(item => (
        <Node
          key={item.value}
          treeData={item}
          onClick={handleItemClick}
          handleSelected={handleSelected}
          titleRender={titleRender}
          selectedId={selectedId}
        />
      ))}
    </>
  )
}

TreeInternal.displayName = 'BrkTree'

export const Tree = memo(TreeInternal)
