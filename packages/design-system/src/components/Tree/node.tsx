import { MouseEvent, ReactNode, useMemo, useState, forwardRef, ForwardRefRenderFunction } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier } from 'dnd-core'
import { rem } from 'polished'
import { Right } from '@mashcard/design-icons'
import { useMemoizedFn } from '../../hooks'
import { useForwardedRef } from '../../hooks/useForwardedRef'

import { NodeMovement, NodeRelativeSpot, InternalTreeNode, TreeNodeRenderer, TreeNode } from './constants'
import { TreeRoot } from './style'
import { calculateRelativeSpot } from './helpers'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

export interface NodeProps {
  data: InternalTreeNode
  className?: string
  emptyNode?: string | ReactNode
  onToggleExpansion: (node: InternalTreeNode) => void
  onSelect?: (node: InternalTreeNode) => void
  nodeRenderer?: TreeNodeRenderer
  selected?: boolean
  index: number
  onMoveNode: (item: NodeMovement) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const DND_NODE_TYPE = 'node'

/** Tree
 * @example
 */
export const InternalNode: ForwardRefRenderFunction<HTMLDivElement, NodeProps> = (
  { data, className, onToggleExpansion, onSelect, nodeRenderer, selected, emptyNode, index, onMoveNode },
  _ref
) => {
  const { id, icon = '', parentId, isExpanded, hasChildren, indent } = data
  const [ref, updateCallback] = useForwardedRef(_ref)
  const [dropSpot, setDropSpot] = useState<NodeRelativeSpot | null>(null)

  const handleSelect = useMemoizedFn(_e => onSelect?.(data))

  const handleToggleExpand = useMemoizedFn((e: MouseEvent) => {
    e.stopPropagation()
    onToggleExpansion(data)
  })

  const hasEmptyNode = useMemo(() => !parentId && !hasChildren, [parentId, hasChildren])
  const canExpand = hasChildren || hasEmptyNode

  const [{ isDragging }, drag] = useDrag({
    type: DND_NODE_TYPE,
    item: { id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [{ handlerId, isOver, isOverCurrent }, drop] = useDrop<
    DragItem,
    void,
    {
      handlerId: Identifier | null
      isOver: boolean
      isOverCurrent: boolean
    }
  >({
    accept: DND_NODE_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver()
      }
    },
    hover(item, monitor: any) {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      setDropSpot(calculateRelativeSpot(monitor.getClientOffset(), ref.current))
    },
    drop(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      const dropSpot = calculateRelativeSpot(monitor.getClientOffset(), ref.current)

      // Time to actually perform the action
      if (dropSpot !== null) {
        onMoveNode?.({
          sourceIndex: dragIndex,
          sourceId: item.id,
          targetIndex: hoverIndex,
          targetId: id,
          targetSpot: dropSpot
        })
      }
    }
  })

  const renderBorder = useMemo(() => {
    let css = {}
    switch (dropSpot) {
      case NodeRelativeSpot.Before:
        css = {
          borderTop: isOver && isOverCurrent ? '2px dashed blue' : 'none'
        }
        break
      case NodeRelativeSpot.AsChild:
        css = {
          border: isOver && isOverCurrent ? '1px dashed blue' : 'none'
        }
        break
      case NodeRelativeSpot.After:
        css = {
          borderBottom: isOver && isOverCurrent ? '2px dashed blue' : 'none'
        }
        break
      default:
        css = {}
        break
    }
    return css
  }, [isOver, isOverCurrent, dropSpot])

  drag(drop(ref))

  if (data.isEmptyNode) {
    const wrappedEmptyItem =
      typeof emptyNode === 'string' ? <TreeRoot.EmptyNode>{emptyNode}</TreeRoot.EmptyNode> : emptyNode
    return <div ref={_ref}>{wrappedEmptyItem}</div>
  }

  return (
    <>
      <TreeRoot.Base
        ref={updateCallback}
        data-handler-id={handlerId}
        dragging={isDragging}
        selected={selected}
        role="button"
        tabIndex={0}
        data-testid={TEST_ID_ENUM.page.pageTree.virtualList.node.id}
        className={className}
        css={renderBorder}
      >
        <TreeRoot.Indent
          css={{
            width: rem(`${16 * indent}px`)
          }}
          data-testid={TEST_ID_ENUM.page.pageTree.virtualList.node.indent.id}
        />
        <TreeRoot.PageItem
          data-testid={TEST_ID_ENUM.page.pageTree.virtualList.node.item.id}
          css={{
            width: `calc(100% - ${rem(`${16 * indent}px`)})`
          }}
        >
          <TreeRoot.ItemContent onClick={handleSelect}>
            <TreeRoot.Content data-testid={TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.id}>
              {canExpand ? (
                <TreeRoot.ContentArrow
                  isExpanded={isExpanded}
                  data-testid={TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.arrow.id}
                  onClick={handleToggleExpand}
                >
                  <Right data-testid={TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.icon.id} />
                </TreeRoot.ContentArrow>
              ) : (
                <TreeRoot.ContentArrow
                  data-testid={TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.arrow.id}
                  onClick={handleToggleExpand}
                >
                  <TreeRoot.LeafDot data-testid={TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.leftDot.id} />
                </TreeRoot.ContentArrow>
              )}
              {icon ? (
                <TreeRoot.ContentIcon data-testid={TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.icon.id}>
                  {icon}
                </TreeRoot.ContentIcon>
              ) : (
                <></>
              )}
              {/* Todo: fixed TS2769: No overload matches this call. pressProps.css */}
              <TreeRoot.ContentAction data-testid={TEST_ID_ENUM.page.pageTree.virtualList.node.item.content.action.id}>
                {(nodeRenderer ?? defaultNodeRenderer)(data)}
              </TreeRoot.ContentAction>
            </TreeRoot.Content>
          </TreeRoot.ItemContent>
        </TreeRoot.PageItem>
      </TreeRoot.Base>
    </>
  )
}

export const Node = forwardRef(InternalNode)
Node.displayName = 'Node'

function defaultNodeRenderer(node: TreeNode): ReactNode {
  return <div>{node.text}</div>
}
