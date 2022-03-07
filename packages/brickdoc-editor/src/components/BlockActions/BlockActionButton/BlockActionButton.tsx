import React from 'react'
import { Button, IconProps, Popover, styled, theme } from '@brickdoc/design-system'
import { BlockActionsMenu, BlockActionsMenuProps } from '../BlockActionsMenu'
import * as EditorIcon from '../../Icon'
import { BlockContext } from '../../../context/BlockContext'

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

const Trigger: React.FC<{
  className?: string
  onClick?: React.MouseEventHandler
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onDragStart?: React.DragEventHandler
  onDragEnd?: React.DragEventHandler
}> = ({ className, onClick, onMouseEnter, onMouseLeave, onDragStart, onDragEnd, ...restProps }) => {
  const [hovered, setHovered] = React.useState(false)
  const iconProps = React.useMemo<IconProps>(() => {
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
        type="text"
      >
        <EditorIcon.DragSecondary {...iconProps} />
      </StyledBlockActionButton>
    </div>
  )
}

export const BlockActionButton: React.FC<BlockActionButtonProps> = ({ className, children, ...props }) => {
  const { updateDraggingStatus } = React.useContext(BlockContext)
  const [visible, setVisible] = React.useState(false)
  const handleVisibleChange = React.useCallback((visible: boolean) => {
    setVisible(visible)
  }, [])
  const handleCloseMenu = React.useCallback(() => setVisible(false), [])
  const handleDragStart = React.useCallback(() => {
    setTimeout(() => {
      updateDraggingStatus(true)
    })
    setVisible(false)
  }, [updateDraggingStatus])
  const handleDragEnd = React.useCallback(() => {
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
      content={<BlockActionsMenu onClose={handleCloseMenu} {...props} />}
    >
      <Trigger className={className} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />
    </Popover>
  )
}
