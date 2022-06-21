import React from 'react'
import {
  Menu as ReakitMenu,
  MenuButton as ReakitMenuButton,
  MenuItem as ReakitMenuItem,
  useMenuState
} from 'reakit/Menu'
import { cx } from '../../utilities'
import { menubarStyles, MenuProps } from './menu'
import { MenuContext } from './context'
import { MenuItem, MenuItemProps } from './menuItem'
import { css, styled, theme } from '../../themes'
import { ArrowRight } from '@mashcard/design-icons'

export interface MenuItemSubMenuProps extends MenuItemProps {
  baseId?: MenuProps['baseId']
  type?: MenuProps['type']
}

const subMenuStyles = css({
  maxHeight: '60vh',
  overflow: 'auto'
})

const SubMenuRightArrow = styled(ArrowRight, {
  color: theme.colors.typeThirdary
})

interface SubMenuItemContextValue {
  baseId?: MenuItemSubMenuProps['baseId']
  type?: MenuItemSubMenuProps['type']
}

const SubMenuItemContext = React.createContext<SubMenuItemContextValue>({})

const SubMenuItem = React.forwardRef<HTMLLIElement, MenuItemSubMenuProps>((props, ref) => {
  const { children, ...restProps } = props
  const { baseId, type } = React.useContext(SubMenuItemContext)
  const menuProps = useMenuState({ gutter: 8, baseId })
  const title = props.title ?? (typeof props.label === 'string' ? props.label : '')
  const className = React.useMemo<string>(
    () => cx(menubarStyles({ orientation: 'vertical', theme: type ?? 'default' }), subMenuStyles()),
    [type]
  )
  return (
    <MenuContext.Provider value={menuProps}>
      <ReakitMenuButton {...menuProps} {...restProps} ref={ref} tip={<SubMenuRightArrow />} as={MenuItem} />
      <ReakitMenu {...menuProps} as="ul" aria-label={title} className={className}>
        {children}
      </ReakitMenu>
    </MenuContext.Provider>
  )
})

export const MenuItemSubMenu: React.FC<MenuItemSubMenuProps> = props => {
  const menuProps = React.useContext(MenuContext)
  const value = React.useMemo<SubMenuItemContextValue>(
    () => ({
      type: props.type,
      baseId: props.baseId
    }),
    [props.baseId, props.type]
  )
  return (
    <SubMenuItemContext.Provider value={value}>
      <ReakitMenuItem {...menuProps} {...props} as={SubMenuItem} />
    </SubMenuItemContext.Provider>
  )
}
