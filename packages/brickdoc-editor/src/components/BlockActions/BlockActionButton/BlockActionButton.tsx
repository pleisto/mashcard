import React from 'react'
import { Button, Popover, styled } from '@brickdoc/design-system'
import * as EditorIcon from '../../Icon'
import { BlockActionsMenu, BlockActionsMenuProps } from '../BlockActionsMenu'

export interface BlockActionButtonProps extends Omit<BlockActionsMenuProps, 'onClose'> {
  className?: string
}

const StyledBlockActionButton = styled(Button, {
  borderRadius: '100%',
  fontSize: '1.375rem',
  height: '1.375rem',
  width: '1.375rem'
})

const Trigger: React.FC<{
  className?: string
  onClick?: React.MouseEventHandler
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
}> = ({ className, onClick, onMouseEnter, onMouseLeave, ...restProps }) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <StyledBlockActionButton
      {...restProps}
      onClick={event => {
        event.stopPropagation()
        onClick?.(event)
      }}
      onMouseLeave={event => {
        setHovered(false)
        onMouseLeave?.(event)
      }}
      onMouseEnter={event => {
        setHovered(true)
        onMouseEnter?.(event)
      }}
      className={className}
      size="small"
      type="text"
    >
      {hovered ? <EditorIcon.DragSecondary /> : <EditorIcon.DragSecondaryGrey />}
    </StyledBlockActionButton>
  )
}

export const BlockActionButton: React.FC<BlockActionButtonProps> = ({ className, children, ...props }) => {
  const [visible, setVisible] = React.useState(false)
  const handleVisibleChange = React.useCallback((visible: boolean) => {
    setVisible(visible)
  }, [])
  const handleCloseMenu = React.useCallback(() => setVisible(false), [])
  return (
    <Popover
      onVisibleChange={handleVisibleChange}
      visible={visible}
      compact={true}
      autoAdjustOverflow={true}
      trigger="hover"
      placement="startTop"
      content={<BlockActionsMenu onClose={handleCloseMenu} {...props} />}
    >
      <Trigger className={className} />
    </Popover>
  )
}
