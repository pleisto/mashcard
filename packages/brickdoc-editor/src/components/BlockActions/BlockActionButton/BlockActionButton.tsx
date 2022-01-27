import React from 'react'
import { Button, IconProps, Popover, styled, theme } from '@brickdoc/design-system'
import { BlockActionsMenu, BlockActionsMenuProps } from '../BlockActionsMenu'
import * as EditorIcon from '../../Icon'

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
  const iconProps = React.useMemo<IconProps>(() => {
    if (hovered) return {}
    return { fill: [theme.colors.iconPrimary.value, theme.colors.grey3.value] }
  }, [hovered])
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
      size="sm"
      type="text"
    >
      <EditorIcon.DragSecondary {...iconProps} />
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
      destroyTooltipOnHide={true}
      trigger="hover"
      placement="startTop"
      content={<BlockActionsMenu onClose={handleCloseMenu} {...props} />}
    >
      <Trigger className={className} />
    </Popover>
  )
}
