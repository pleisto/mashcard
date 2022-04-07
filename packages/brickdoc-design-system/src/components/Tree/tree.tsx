import {
  ForwardRefRenderFunction,
  useState,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
  forwardRef,
  RefCallback,
  useEffect
} from 'react'
import deepEqual from 'fast-deep-equal'
import List, { ListRef } from 'rc-virtual-list'
import { DndProvider } from 'react-dnd'
import { HTML5Backend, HTML5BackendOptions } from 'react-dnd-html5-backend'
import type { TreeNode, NodeMovement, InternalTreeNode, TreeNodeRenderer } from './constants'
import { Node } from './node'
import { useMemoizedFn } from '../../hooks'
import { useDeepMemo } from '../../hooks/useDeepMemo'
import { flattenNodes, joinNodeIdsByPath } from './helpers'
import { useUpdate } from 'ahooks'

export interface TreeProps {
  height?: number
  data: TreeNode[]
  currentSelectedId?: string
  initialSelectedId?: string
  className?: string
  treeNodeClassName?: string
  expandAll?: boolean
  expandOnSelect?: boolean
  draggable?: boolean
  onDrop?: (attrs: NodeMovement) => void
  renderNode?: TreeNodeRenderer
  emptyNode?: string | ReactNode
}

/**
 * A ref object that can perform actions on the tree.
 */
export type TreeRef = ListRef

const NODE_HEIGHT = 34
const DEFAULT_HEIGHT = 200

/** Tree
 * @example
 */
const TreeInternal: ForwardRefRenderFunction<TreeRef, TreeProps> = (
  {
    height,
    data: nextData,
    expandAll,
    expandOnSelect,
    renderNode,
    emptyNode,
    initialSelectedId,
    currentSelectedId,
    draggable,
    className,
    treeNodeClassName,
    onDrop
  },
  ref
) => {
  // To cache tree data in case its reference changes outside the component
  // in order to optimize everything in the rendering flow corresponding
  // to the tree data.
  const redraw = useUpdate()
  const data = useDeepMemo(nextData, redraw)

  const listRef = useRef<ListRef>(null)
  const [expandedIds, setExpandedIds] = useState<string[]>(() => {
    if (expandAll) {
      const allNodes = flattenNodes(data)
      return allNodes.map(({ id }) => id)
    }
    let ids = data.filter(node => node.isExpanded).map(node => node.id)
    if (initialSelectedId) {
      // The selected node is initially expanded on the component mount.
      ids = joinNodeIdsByPath(data, initialSelectedId, ids)
    }
    return ids
  })

  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId)

  useEffect(() => {
    /**
     * To replace the highlights
     */
    setSelectedId(currentSelectedId)
  }, [currentSelectedId])

  const nodeList = useMemo(() => {
    function flatten(node: TreeNode, indent: number, result: InternalTreeNode[]): void {
      const { children, id } = node
      const isExpanded = expandedIds.includes(id)

      result.push({
        ...node,
        isExpanded,
        hasChildren: (children ?? []).length > 0,
        indent: indent ?? 0
      })

      if (isExpanded && !children?.length && indent === 0) {
        const emptyNode: InternalTreeNode = {
          id: `empty-child-${node.id}`,
          text: '',
          indent: indent + 1,
          hasChildren: false,
          isEmptyNode: true
        }
        result.push(emptyNode)
      }

      if (isExpanded && children) {
        for (const child of children) {
          flatten(child, indent + 1, result)
        }
      }
    }

    const result: InternalTreeNode[] = []
    for (const node of data) {
      flatten(node, 0, result)
    }
    return result
  }, [data, expandedIds])

  const handleSelectNode = useMemoizedFn((node: InternalTreeNode) => {
    setSelectedId(node.id)
    if (expandOnSelect && !node.isExpanded && node.id) {
      const nextExpandedIds = joinNodeIdsByPath(data, node.id, expandedIds)
      if (!deepEqual(nextExpandedIds, expandedIds)) {
        setExpandedIds(nextExpandedIds)
      }
    }
  })

  const handleToggleExpansion = useMemoizedFn((node: TreeNode) => {
    node.isExpanded ? setExpandedIds(ids => ids.filter(id => id !== node.id)) : setExpandedIds(ids => [...ids, node.id])
  })

  const moveNode = useMemoizedFn((item: NodeMovement) => {
    if (!draggable) return
    onDrop?.(item)
  })

  // add a root element to limit dnd scope
  const [html5Options, setHtml5Options] = useState<HTML5BackendOptions>()
  const handleDndAreaRef = useCallback<RefCallback<HTMLDivElement>>(node => {
    if (node) {
      setHtml5Options({ rootElement: node })
    }
  }, [])

  const finalHeight = height ?? Math.min(nodeList.length * NODE_HEIGHT, DEFAULT_HEIGHT)

  return (
    <div ref={handleDndAreaRef}>
      {/* make sure root area is mounted, then mount dnd area */}
      {html5Options?.rootElement && (
        <DndProvider backend={HTML5Backend} options={html5Options}>
          <List<InternalTreeNode>
            className={className}
            data={nodeList}
            data-testid="virtual-list"
            height={finalHeight}
            itemHeight={NODE_HEIGHT}
            itemKey="id"
            ref={ref ?? listRef}
          >
            {(item, index) => (
              <Node
                className={treeNodeClassName}
                index={index}
                key={item.id}
                emptyNode={emptyNode}
                data={item}
                selected={item.id === selectedId}
                onToggleExpansion={handleToggleExpansion}
                onSelect={handleSelectNode}
                onMoveNode={moveNode}
                nodeRenderer={renderNode}
              />
            )}
          </List>
        </DndProvider>
      )}
    </div>
  )
}

export const Tree = forwardRef(TreeInternal)
Tree.displayName = 'Tree'
