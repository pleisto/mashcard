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
  baseId?: string
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

const _Menu: React.ForwardRefRenderFunction<HTMLUListElement, MenuProps> = (props, ref) => {
  const { children, className, onAction, baseId, ...restProps } = props
  const orientation = props.orientation ?? 'vertical'
  const menuBarProps = useMenuBarState({ baseId, orientation })
  const menuBarClass = React.useMemo<string>(
    () => cx(menubarStyles({ orientation }), className),
    [className, orientation]
  )
  return (
    <MenuActionContext.Provider value={onAction}>
      <MenuContext.Provider value={menuBarProps}>
        <ReakitMenuBar
          as="ul"
          {...menuBarProps}
          {...restProps}
          orientation={orientation}
          className={menuBarClass}
          ref={ref}>
          {children}
        </ReakitMenuBar>
      </MenuContext.Provider>
    </MenuActionContext.Provider>
  )
}

const MenuRender = React.forwardRef<HTMLUListElement, MenuProps>(_Menu)

export const Menu: React.FC<MenuProps> & {
  Item: typeof MenuItem
  SubMenuItem: typeof MenuItemSubMenu
  Group: typeof MenuGroup
  Separator: typeof MenuSeparator
} = MenuRender as any

Menu.Item = MenuItem
Menu.Group = MenuGroup
Menu.Separator = MenuSeparator
Menu.SubMenuItem = MenuItemSubMenu
