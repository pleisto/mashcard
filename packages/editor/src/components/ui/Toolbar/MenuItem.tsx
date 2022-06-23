import { FC, MouseEvent, useCallback } from 'react'
import { styled, theme } from '@mashcard/design-system'
import { ToolbarOption } from './Toolbar'
import { itemCommon, itemHeight } from './styles/index.style'
import { variants } from './styles/variants.style'

const MenuItem = styled('li', {
  include: ['flexCenter'],
  color: theme.colors.iconPrimary,
  cursor: 'pointer',
  display: 'flex',
  fontSize: '1rem',
  fontWeight: 500,
  height: itemHeight,
  ...itemCommon,
  padding: '0 2px',
  variants
})

export interface ToolbarMenuItemProps {
  option: ToolbarOption
}

export const ToolbarMenuItem: FC<ToolbarMenuItemProps> = ({ option, ...props }) => {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      option.onAction?.(option.name)
      ;(props as any).onClick?.(event)
    },
    [option, props]
  )

  return (
    <MenuItem
      {...props}
      role="menuitem"
      aria-label={option.label ?? option.name}
      aria-describedby=""
      onClick={handleClick}
      active={option.active}
      css={option.css}
    >
      {option.content ?? option.icon ?? option.label}
    </MenuItem>
  )
}
