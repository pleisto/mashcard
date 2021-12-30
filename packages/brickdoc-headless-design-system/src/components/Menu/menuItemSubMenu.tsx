import React from 'react'
import {
  Menu as ReakitMenu,
  MenuButton as ReakitMenuButton,
  MenuItem as ReakitMenuItem,
  useMenuState
} from 'reakit/Menu'
import cx from 'classnames'
import { menubarStyles } from './menu'
import { MenuContext } from './context'
import { MenuItem, MenuItemProps } from './menuItem'
import { css, styled, theme } from '../../themes'
import { ArrowRight } from '@brickdoc/design-icons'

export interface MenuItemSubMenuProps extends MenuItemProps {}

const subMenuStyles = css({
  marginLeft: '0.5rem'
})

const SubMenuRightArrow = styled(ArrowRight, {
  color: theme.colors.typeThirdary
})

const SubMenuItem = React.forwardRef<HTMLLIElement, MenuItemSubMenuProps>((props, ref) => {
  const menuProps = useMenuState()
  const { children, ...restProps } = props
  const title = props.title ?? (typeof props.label === 'string' ? props.label : '')
  const className = React.useMemo<string>(() => cx(menubarStyles({ orientation: 'vertical' }), subMenuStyles()), [])
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
  return <ReakitMenuItem {...menuProps} {...props} as={SubMenuItem} />
}
