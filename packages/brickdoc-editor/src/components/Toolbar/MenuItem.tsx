import React from 'react'
import { styled, theme } from '@brickdoc/design-system'
import { ToolbarOption } from './Toolbar'
import { itemCommon, itemHeight } from './styles/index.style'
import { variants } from './styles/variants.style'

const MenuItem = styled('li', {
  include: ['flexCenter'],
  color: theme.colors.iconPrimary,
  cursor: 'pointer',
  display: 'flex',
  fontSize: '.75rem',
  fontWeight: 500,
  height: itemHeight,
  ...itemCommon,
  variants
})

export interface ToolbarMenuItemProps {
  option: ToolbarOption
}

export const ToolbarMenuItem: React.FC<ToolbarMenuItemProps> = ({ option }) => {
  const handleClick = React.useCallback(() => {
    option.onAction?.(option.name)
  }, [option])

  return (
    <MenuItem onClick={handleClick} active={option.active}>
      {option.icon}
    </MenuItem>
  )
}
