import { FC, useCallback, memo, MouseEvent, ReactNode, useMemo, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { usePress } from '@react-aria/interactions'
import { rem } from 'polished'
import { Right } from '@brickdoc/design-icons'
import { MoveNode, TNode, Inserted } from './constants'
/* import { Inserted } from './constants' */

import { TreeRoot } from './style'

export interface NodeProps {
  treeData: TNode
  className?: string
  emptyNode?: string | ReactNode
  onClick: (node: TNode) => void
  handleSelected: (id: string) => void
  titleRender?: (node: TNode) => ReactNode
  selectedId?: string
  id: any
  index: number
  moveNode: (item: MoveNode) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

interface HoverNode {
  hoverClientY: number
  hoverMiddleY: number
  handlerId: string
}

const DND_NODE_TYPE = 'node'

/** Tree
 * @example
 */
const InternalNode: FC<NodeProps> = ({
  treeData,
  className,
  onClick,
  handleSelected,
  titleRender,
  selectedId,
  emptyNode,
  id,
  index,
  moveNode
}) => {
  const { icon = '', hasChildren, parentId, rootId, indent = 0, value, collapsed } = treeData
  const ref = useRef<HTMLDivElement>(null)
  const [hoverNode, setHoverNode] = useState<HoverNode | undefined>()

  const { pressProps, isPressed } = usePress({
    onPress: e => {
      if (e.type === 'press') {
        handleSelected(value)
      }
    }
  })

  const handleOpen = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      onClick(treeData)
    },
    [treeData, onClick]
  )

  const hasEmptyNode = useMemo(
    () => !parentId && rootId === value && !hasChildren,
    [parentId, rootId, value, hasChildren]
  )

  const emptyItem = typeof emptyNode === 'string' ? <TreeRoot.EmptyNode>{emptyNode}</TreeRoot.EmptyNode> : emptyNode

  const showEmptyItem = hasEmptyNode && collapsed ? emptyItem : null

  const [{ isDragging }, drag] = useDrag({
    type: DND_NODE_TYPE,
    item: { id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  const calculate = useCallback(
    (node: HoverNode | undefined) => {
      const item = node ?? hoverNode
      if (!item) {
        return null
      }
      const topRange = item.hoverMiddleY - 10
      const bottomRange = item.hoverMiddleY + 10
      if (item.hoverClientY <= topRange) {
        return Inserted.Top
      }
      if (item.hoverClientY >= bottomRange) {
        return Inserted.Bottom
      }
      return Inserted.Child
    },
    [hoverNode]
  )

  const [{ handlerId, isOver, isOverCurrent }, drop] = useDrop({
    accept: DND_NODE_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver()
      }
    },
    hover(item: DragItem, monitor: any) {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect!.bottom! - hoverBoundingRect!.top!) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect!.top!

      setHoverNode({
        hoverMiddleY,
        hoverClientY,
        handlerId: monitor?.targetId ?? ''
      })
    },
    drop(item: DragItem, monitor: any) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      const position = calculate({
        hoverMiddleY,
        hoverClientY,
        handlerId: monitor?.targetId ?? ''
      })
      // Time to actually perform the action

      moveNode?.({
        sourceIndex: dragIndex,
        sourceId: item.id,
        targetIndex: hoverIndex,
        targetId: value,
        position: position!
      })
    }
  })

  const renderBorder = useMemo(() => {
    let css = {}
    const borderPos = calculate(hoverNode)

    switch (borderPos) {
      case Inserted.Top:
        css = {
          borderTop: isOver && isOverCurrent ? '2px dashed blue' : 'none'
        }
        break
      case Inserted.Child:
        css = {
          border: isOver && isOverCurrent ? '1px dashed blue' : 'none'
        }
        break
      case Inserted.Bottom:
        css = {
          borderBottom: isOver && isOverCurrent ? '2px dashed blue' : 'none'
        }
        break
      default:
        css = {}
        break
    }
    return css
  }, [calculate, isOver, isOverCurrent, hoverNode])

  drag(drop(ref))

  return (
    <>
      <TreeRoot.Base
        ref={ref}
        data-handler-id={handlerId}
        pressed={isPressed}
        dragging={isDragging}
        selected={Boolean(value === selectedId)}
        role="button"
        tabIndex={0}
        data-test-id="BrkTree"
        className={className}
        css={renderBorder}
      >
        <TreeRoot.Indent
          css={{
            width: rem(`${16 * indent}px`)
          }}
          data-test-id="indent"
        />
        <TreeRoot.PageItem data-test-id="page-item">
          <TreeRoot.ItemContent data-test-id="item-content">
            <TreeRoot.Content data-test-id="content">
              {hasChildren || hasEmptyNode ? (
                <TreeRoot.ContentArrow isOpen={collapsed} data-test-id="content-arrow" onClick={handleOpen}>
                  <Right data-test-id="content-icon" />
                </TreeRoot.ContentArrow>
              ) : (
                <TreeRoot.ContentArrow data-test-id="content-arrow" onClick={handleOpen}>
                  <TreeRoot.LeafDot data-test-id="leaf-dot" />
                </TreeRoot.ContentArrow>
              )}
              {icon ? <TreeRoot.ContentIcon data-test-id="content-icon">{icon}</TreeRoot.ContentIcon> : <></>}
              {/* Todo: fixed TS2769: No overload matches this call. pressProps.css */}
              <TreeRoot.ContentAction data-test-id="content-action" {...(pressProps as any)}>
                {titleRender?.(treeData)}
              </TreeRoot.ContentAction>
            </TreeRoot.Content>
          </TreeRoot.ItemContent>
        </TreeRoot.PageItem>
      </TreeRoot.Base>
      {showEmptyItem}
    </>
  )
}

InternalNode.displayName = 'BrkNode'

export const Node = memo(InternalNode)
