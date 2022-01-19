import {
  ForwardRefRenderFunction,
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
  ReactNode,
  forwardRef
} from 'react'
import List, { ListRef } from 'rc-virtual-list'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { TNode, MoveNode } from './constants'
import { Node } from './node'

export interface TreeProps {
  height?: number
  treeData: TNode[]
  selectedNodeId?: string
  className?: string
  treeNodeClassName?: string
  openAll?: boolean
  draggable?: boolean
  onDrop?: (attrs: MoveNode) => void
  titleRender?: (node: TNode) => ReactNode
  emptyNode?: string | ReactNode
}

const findPathById = (tree: TNode[], id: string, path?: string[]): string[] | undefined => {
  for (let i = 0; i < tree.length; i++) {
    const tempPath = [...(path ?? [])]
    tempPath.push(tree[i].value)
    if (tree[i].value === id) return tempPath
    if (tree[i].children) {
      const result = findPathById(tree[i].children, id, tempPath)
      if (result) return result
    }
  }
}

/** Tree
 * @example
 */
const TreeInternal: ForwardRefRenderFunction<any, TreeProps> = (
  {
    height,
    treeData,
    openAll = false,
    titleRender,
    emptyNode,
    selectedNodeId,
    draggable = false,
    treeNodeClassName,
    onDrop
  },
  ref
) => {
  const listRef = useRef<ListRef>()
  const [openedIds, setOpenedIds] = useState<string[]>(
    openAll ? treeData.map(node => node.value) : treeData.filter(node => node.collapsed).map(node => node.value) || []
  )
  const [selectedId, setSelectedId] = useState<string | undefined>(selectedNodeId)

  useEffect(() => {
    if (selectedNodeId) {
      setOpenedIds(findPathById(treeData, selectedNodeId, openedIds) ?? [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const flattened = useCallback(
    (node, indent: number, result: TNode[]) => {
      const { children, value } = node
      const collapsed = openedIds.includes(value)

      result.push({
        ...node,
        hasChildren: (children ?? []).length > 0,
        indent: indent ?? 0,
        collapsed
      })

      if (collapsed && children) {
        for (const child of children) {
          flattened(child, indent + 1, result)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openedIds]
  )

  const renderTree = useMemo(() => {
    const result: TNode[] = []
    for (const node of treeData) {
      flattened(node, 0, result)
    }
    return result
  }, [treeData, flattened])

  const handleSelected = useCallback((id: string) => setSelectedId(id), [setSelectedId])

  const handleItemClick = useCallback(
    (node: TNode) =>
      node.collapsed
        ? setOpenedIds(i => i.filter(value => value !== node.value))
        : setOpenedIds(i => [...i, node.value]),
    [setOpenedIds]
  )

  const moveNode = useCallback(
    (item: MoveNode) => {
      if (!draggable) return
      onDrop?.(item)
    },
    [draggable, onDrop]
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <List<TNode>
        data={renderTree}
        data-test-id="virtual-list"
        height={height ?? 200}
        itemHeight={34}
        itemKey="key"
        ref={ref ?? listRef}
      >
        {(item, index) => (
          <Node
            className={treeNodeClassName}
            moveNode={moveNode}
            id={item.key}
            index={index}
            key={item.key}
            emptyNode={emptyNode}
            treeData={item}
            onClick={handleItemClick}
            handleSelected={handleSelected}
            titleRender={titleRender}
            selectedId={selectedId}
          />
        )}
      </List>
    </DndProvider>
  )
}

const _TreeInternal = forwardRef(TreeInternal)
_TreeInternal.displayName = 'BrkTree'

export { _TreeInternal as Tree }
