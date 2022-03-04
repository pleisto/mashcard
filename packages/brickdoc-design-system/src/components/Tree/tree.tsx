import {
  ForwardRefRenderFunction,
  useState,
  useCallback,
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
import { useMemoizedFn } from '../../hooks'

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

const NODE_HEIGHT = 34
const DEFAULT_HEIGHT = 200

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
    className,
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
    [openedIds]
  )

  const renderTree = useMemo(() => {
    const result: TNode[] = []
    for (const node of treeData) {
      flattened(node, 0, result)
    }
    return result
  }, [treeData, flattened])

  const handleSelected = useMemoizedFn((id: string) => setSelectedId(id))

  const handleItemClick = useMemoizedFn((node: TNode) => {
    node.collapsed ? setOpenedIds(i => i.filter(value => value !== node.value)) : setOpenedIds(i => [...i, node.value])
  })

  const moveNode = useMemoizedFn((item: MoveNode) => {
    if (!draggable) return
    onDrop?.(item)
  })

  // add a root element to limit dnd scope
  const [dndRoot, setDndRoot] = useState()
  const handleDndAreaRef = useCallback(node => setDndRoot(node), [])
  const html5Options = useMemo(() => ({ rootElement: dndRoot }), [dndRoot])

  return (
    <div ref={handleDndAreaRef}>
      {/* make sure root area is mounted, then mount dnd area */}
      {dndRoot && (
        <DndProvider backend={HTML5Backend} options={html5Options}>
          <List<TNode>
            className={className}
            data={renderTree}
            data-test-id="virtual-list"
            height={Math.min(renderTree.length * NODE_HEIGHT, DEFAULT_HEIGHT)}
            itemHeight={NODE_HEIGHT}
            itemKey="key"
            ref={ref ?? listRef}>
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
      )}
    </div>
  )
}

const _TreeInternal = forwardRef(TreeInternal)
_TreeInternal.displayName = 'Tree'

export { _TreeInternal as Tree }
