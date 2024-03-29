import React, { useRef } from 'react'
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

const SubMenuItemWrapper = styled('div', {
  display: 'inline-block',
  position: 'relative',
  '&::after': {
    content: '',
    display: 'block',
    height: '100%',
    width: '10px',
    position: 'absolute',
    right: -10,
    top: 0,
    zIndex: '-1'
  }
})

// chrome does not render the nested backfilter properly, use this container's pseudo-element to solve this problem
const SubMenuItemContentWrapper = styled('div', {
  position: 'relative',
  '&::before': {
    content: '',
    display: 'block',
    height: '100%',
    width: '100%',
    position: 'absolute',
    backdropFilter: 'blur(20px)',
    zIndex: '-1'
  }
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
  const divRef = useRef<HTMLDivElement>(null)
  return (
    <MenuContext.Provider value={menuProps}>
      <SubMenuItemWrapper
        onMouseEnter={menuProps.show}
        onMouseLeave={() => {
          menuProps.hide()
          divRef?.current?.focus()
        }}
        ref={divRef}
      >
        <ReakitMenuButton {...menuProps} {...restProps} ref={ref} tip={<SubMenuRightArrow />} as={MenuItem} />
        <ReakitMenu {...menuProps} as="ul" aria-label={title} className={className}>
          <SubMenuItemContentWrapper>{children}</SubMenuItemContentWrapper>
        </ReakitMenu>
      </SubMenuItemWrapper>
    </MenuContext.Provider>
  )
})

/**
 *
 * @deprecated This component is planned to be abandoned. Use the PopoverN component if needed to implement
 */
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
