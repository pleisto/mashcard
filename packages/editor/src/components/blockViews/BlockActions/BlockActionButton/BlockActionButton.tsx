import { DragEventHandler, FC, MouseEventHandler, useCallback, useMemo, useState, ReactNode } from 'react'
import { Button, IconProps, Popover, styled, theme } from '@mashcard/design-system'
import { BlockActionsMenu, BlockActionsMenuProps } from '../BlockActionsMenu'
import { DragSecondary, BlockActionAdd } from '../../../ui'
import { useBlockContext } from '../../../../hooks/useBlockContext'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

export interface BlockActionButtonProps extends Omit<BlockActionsMenuProps, 'onClose'> {
  className?: string
  children?: ReactNode
  setActive?: (active: boolean) => void
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
      {...restProps}>
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
        type="unstyled">
        {isEmpty ? <BlockActionAdd {...iconProps} /> : <DragSecondary {...iconProps} />}
      </StyledBlockActionButton>
    </div>
  )
}

export const BlockActionButton: FC<BlockActionButtonProps> = ({ className, children, setActive, ...props }) => {
  const { updateDraggingStatus } = useBlockContext()
  const [visible, setVisible] = useState(false)
  const handleVisibleChange = useCallback((visible: boolean) => {
    setVisible(visible)
    setActive?.(visible)
  }, [setActive])
  const handleCloseMenu = useCallback(() => setVisible(false), [])
  const handleDragStart = useCallback(() => {
    setTimeout(() => {
      updateDraggingStatus(true)
    })
    setVisible(false)
  }, [updateDraggingStatus])
  const handleDragEnd = useCallback(() => {
    setTimeout(() => {
      updateDraggingStatus(false)
    })
  }, [updateDraggingStatus])

  return (
    <Popover
      onVisibleChange={handleVisibleChange}
      visible={visible}
      compact={true}
      autoAdjustOverflow={true}
      destroyTooltipOnHide={true}
      trigger="hover"
      placement="bottomStart"
      content={<BlockActionsMenu onClose={handleCloseMenu} {...props} />}>
      <Trigger active={visible} className={className} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />
    </Popover>
  )
}
