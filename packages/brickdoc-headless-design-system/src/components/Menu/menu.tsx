import React from 'react'
import { PressEvents } from '@react-types/shared'
import { styled } from '../../themes'
import { Item, MenuItemProps } from './item'
import { Section } from './section'
import { MenuContext, MenuContextData } from './context'

export interface MenuProps extends PressEvents {
  'aria-label'?: string
  className?: string
  searchable?: boolean
  onAction?: MenuItemProps['onAction']
}

const MenuRoot = styled('ul', {
  include: ['ceramicPrimary'],
  borderRadius: '4px',
  display: 'inline-block',
  margin: 0,
  listStyle: 'none',
  padding: 0
})

export const Menu: React.FC<MenuProps> & {
  Item: typeof Item
  Section: typeof Section
} = ({ children, className, onAction, ...props }) => {
  const menuContextData = React.useMemo<MenuContextData>(() => ({ onAction }), [onAction])

  return (
    <MenuContext.Provider value={menuContextData}>
      <MenuRoot {...props} role="menu" className={className} css={{}}>
        {children}
      </MenuRoot>
    </MenuContext.Provider>
  )
}

Menu.Item = Item
Menu.Section = Section
