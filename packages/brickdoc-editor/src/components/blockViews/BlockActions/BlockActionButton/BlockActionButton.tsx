import { DragEventHandler, FC, MouseEventHandler, useCallback, useContext, useMemo, useState } from 'react'
import { Button, IconProps, Popover, styled, theme } from '@brickdoc/design-system'
import { BlockActionsMenu, BlockActionsMenuProps } from '../BlockActionsMenu'
import { BlockContext } from '../../../../context/BlockContext'
import { DragSecondary } from '../../../ui'

export interface BlockActionButtonProps extends Omit<BlockActionsMenuProps, 'onClose'> {
  className?: string
}

const StyledBlockActionButton = styled(Button, {
  variants: {
    size: {
      sm: {
        borderRadius: '100%',
        fontSize: '1.375rem',
        height: '1.375rem',
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
}> = ({ className, onClick, onMouseEnter, onMouseLeave, onDragStart, onDragEnd, ...restProps }) => {
  const [hovered, setHovered] = useState(false)
  const iconProps = useMemo<IconProps>(() => {
    if (hovered) return {}
    return { fill: [theme.colors.iconPrimary.value, theme.colors.grey3.value] }
  }, [hovered])
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
        type="text">
        <DragSecondary {...iconProps} />
      </StyledBlockActionButton>
    </div>
  )
}

export const BlockActionButton: FC<BlockActionButtonProps> = ({ className, children, ...props }) => {
  const { updateDraggingStatus } = useContext(BlockContext)
  const [visible, setVisible] = useState(false)
  const handleVisibleChange = useCallback((visible: boolean) => {
    setVisible(visible)
  }, [])
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
      placement="startTop"
      content={<BlockActionsMenu onClose={handleCloseMenu} {...props} />}>
      <Trigger className={className} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />
    </Popover>
  )
}
