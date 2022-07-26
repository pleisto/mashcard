import { DragEventHandler, FC, MouseEventHandler, useCallback, useMemo, useState, ReactNode } from 'react'
import { Button, IconProps, Popover, styled, theme } from '@mashcard/design-system'
import { BlockActionsMenu, BlockActionsMenuProps } from '../BlockActionsMenu'
import { DragSecondary, BlockActionAdd } from '../../../ui'
import { useBlockContext } from '../../../../hooks/useBlockContext'
import { TEST_ID_ENUM } from '@mashcard/test-helper'
import { useEditorContext } from '../../../../hooks'
import { BlockSelector, BlockSelectorProps } from '../../../ui/BlockSelector'
export interface BlockActionButtonProps extends Omit<BlockActionsMenuProps, 'onClose'> {
  className?: string
  children?: ReactNode
  onMenuVisibleChange?: (visible: boolean) => void
}

const StyledBlockActionButton = styled(Button, {
  variants: {
    size: {
      sm: {
        borderRadius: '100%',
        fontSize: '1.375rem',
        height: '1.375rem',
        padding: 0,
        width: '1.375rem'
      }
    }
  }
})

const Trigger: FC<{
  className?: string
  onClick?: MouseEventHandler
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
  onDragStart?: DragEventHandler
  onDragEnd?: DragEventHandler
  active: boolean
}> = ({ className, onClick, onMouseEnter, onMouseLeave, onDragStart, onDragEnd, active, ...restProps }) => {
  const { node } = useBlockContext()
  const isEmpty = !node?.isLeaf && !node?.childCount
  const [hovered, setHovered] = useState(false)
  const iconProps = useMemo<IconProps>(() => {
    if (hovered || active) return {}
    return { fill: [theme.colors.typeSecondary.value, theme.colors.grey3.value] }
  }, [hovered, active])
  return (
    <div
      onMouseLeave={event => {
        onMouseLeave?.(event)
      }}
      onMouseEnter={event => {
        onMouseEnter?.(event)
      }}
      className={className}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      contentEditable={false}
      suppressContentEditableWarning={true}
      draggable={true}
      data-drag-handle
      data-testid={TEST_ID_ENUM.editor.blockAction.button.id}
      style={{
        zIndex: 2
      }}
      {...restProps}
    >
      <StyledBlockActionButton
        onClick={event => {
          event.stopPropagation()
          onClick?.(event)
        }}
        onMouseLeave={event => {
          setHovered(false)
        }}
        onMouseEnter={event => {
          setHovered(true)
        }}
        size="sm"
        type="unstyled"
      >
        {isEmpty ? <BlockActionAdd {...iconProps} /> : <DragSecondary {...iconProps} />}
      </StyledBlockActionButton>
    </div>
  )
}

type OnBlockSelect = NonNullable<BlockSelectorProps['onBlockSelect']>

export function useBlockActionHandlers(onMenuVisibleChange: BlockActionButtonProps['onMenuVisibleChange']): {
  menuVisible: boolean
  onMenuVisibleChange: (visible: boolean) => void
  onCloseMenu: () => void
  onDragStart: DragEventHandler
  onDragEnd: DragEventHandler
  onBlockSelect: OnBlockSelect
} {
  const { editor } = useEditorContext()
  const { updateDraggingStatus, getPosition, node } = useBlockContext()
  const [menuVisible, setMenuVisible] = useState(false)
  const handleMenuVisibleChange = useCallback(
    (visible: boolean) => {
      setMenuVisible(visible)
      onMenuVisibleChange?.(visible)
    },
    [onMenuVisibleChange]
  )
  const onCloseMenu = useCallback(() => setMenuVisible(false), [])
  const onDragStart = useCallback(() => {
    setTimeout(() => {
      updateDraggingStatus(true)
    })
    setMenuVisible(false)
  }, [updateDraggingStatus])
  const onDragEnd = useCallback(() => {
    setTimeout(() => {
      updateDraggingStatus(false)
    })
  }, [updateDraggingStatus])

  const onBlockSelect = useCallback<OnBlockSelect>(
    item => {
      const position = getPosition()
      if (!node || !editor || position === undefined) return

      const from = position + 1
      item.command({ editor, range: from })
      setMenuVisible(false)
    },
    [editor, getPosition, node]
  )

  return {
    menuVisible,
    onCloseMenu,
    onDragStart,
    onDragEnd,
    onMenuVisibleChange: handleMenuVisibleChange,
    onBlockSelect
  }
}

export const BlockActionButton: FC<BlockActionButtonProps> = ({
  className,
  children,
  onMenuVisibleChange,
  ...props
}) => {
  const { node } = useBlockContext()
  const isEmpty = !node?.isLeaf && !node?.childCount

  const {
    menuVisible,
    onCloseMenu: handleCloseMenu,
    onMenuVisibleChange: handleMenuVisibleChange,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onBlockSelect: handleBlockSelect
  } = useBlockActionHandlers(onMenuVisibleChange)

  return (
    <Popover
      onVisibleChange={handleMenuVisibleChange}
      visible={menuVisible}
      compact={true}
      autoAdjustOverflow={true}
      destroyTooltipOnHide={true}
      trigger="hover"
      placement="bottomStart"
      content={
        isEmpty ? (
          <BlockSelector onBlockSelect={handleBlockSelect} />
        ) : (
          <BlockActionsMenu onClose={handleCloseMenu} {...props} />
        )
      }
    >
      <Trigger active={menuVisible} className={className} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />
    </Popover>
  )
}
