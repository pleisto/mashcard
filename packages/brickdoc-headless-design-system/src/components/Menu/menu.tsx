import React from 'react'
import cx from 'classnames'
import { MenuBar as ReakitMenuBar, MenuBarHTMLProps, useMenuBarState } from 'reakit/Menu'
import { css } from '../../themes'
import { MenuItem } from './menuItem'
import { MenuGroup } from './menuGroup'
import { MenuSeparator } from './menuSeparator'
import { MenuActionContext, MenuContext } from './context'
import { MenuItemSubMenu } from './menuItemSubMenu'

export interface MenuProps extends MenuBarHTMLProps {
  // TODO: add horizontal
  orientation?: 'vertical'
  onAction?: (key: string) => void
}

export const menubarStyles = css({
  include: ['ceramicPrimary'],
  borderRadius: '4px',
  display: 'inline-flex',
  margin: 0,
  listStyle: 'none',
  padding: 0,
  variants: {
    orientation: {
      vertical: {
        flexDirection: 'column'
      }
    }
  }
})

export const Menu: React.FC<MenuProps> & {
  Item: typeof MenuItem
  SubMenuItem: typeof MenuItemSubMenu
  Group: typeof MenuGroup
  Separator: typeof MenuSeparator
} = props => {
  const { children, className, onAction, ...restProps } = props
  const orientation = props.orientation ?? 'vertical'
  const menuBarProps = useMenuBarState({ orientation })
  const menuBarClass = React.useMemo<string>(
    () => cx(menubarStyles({ orientation }), className),
    [className, orientation]
  )
  return (
    <MenuActionContext.Provider value={onAction}>
      <MenuContext.Provider value={menuBarProps}>
        <ReakitMenuBar as="ul" {...menuBarProps} {...restProps} orientation={orientation} className={menuBarClass}>
          {children}
        </ReakitMenuBar>
      </MenuContext.Provider>
    </MenuActionContext.Provider>
  )
}

Menu.Item = MenuItem
Menu.Group = MenuGroup
Menu.Separator = MenuSeparator
Menu.SubMenuItem = MenuItemSubMenu
