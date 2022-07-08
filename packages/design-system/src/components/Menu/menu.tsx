import React from 'react'
import { cx } from '../../utilities'
import { MenuBar as ReakitMenuBar, MenuBarHTMLProps, useMenuBarState } from 'reakit/Menu'
import { css } from '../../themes'
import { MenuItem } from './menuItem'
import { MenuGroup } from './menuGroup'
import { MenuSeparator } from './menuSeparator'
import { MenuActionContext, MenuContext } from './context'
import { MenuItemSubMenu } from './menuItemSubMenu'

export interface MenuProps extends MenuBarHTMLProps {
  baseId?: string
  // TODO: horizontal
  orientation?: 'vertical' | 'horizontal'
  onAction?: (key: string) => void
  type?: 'default' | 'ghost'
}

export const menubarStyles = css({
  display: 'inline-flex',
  margin: 0,
  listStyle: 'none',
  padding: 0,
  variants: {
    theme: {
      default: {
        include: ['ceramicPrimary', 'cornerFix'],
        borderRadius: '4px'
      },
      ghost: {}
    },
    orientation: {
      vertical: {
        flexDirection: 'column'
      },
      horizontal: {
        flexDirection: 'row'
      }
    }
  }
})

const _Menu: React.ForwardRefRenderFunction<HTMLUListElement, MenuProps> = (props, ref) => {
  const { children, className, onAction, baseId, type, ...restProps } = props
  const orientation = props.orientation ?? 'vertical'
  const menuBarProps = useMenuBarState({ baseId, orientation })
  const menuBarClass = React.useMemo<string>(
    () => cx(menubarStyles({ orientation, theme: type ?? 'default' }), className),
    [className, orientation, type]
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
          ref={ref}
        >
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
