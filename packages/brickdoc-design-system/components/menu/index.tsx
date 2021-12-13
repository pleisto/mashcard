// eslint-disable-next-line max-classes-per-file
import * as React from 'react'
import RcMenu, { ItemGroup, MenuProps as RcMenuProps } from 'rc-menu'
import classNames from 'classnames'
import omit from 'rc-util/lib/omit'

import './style'
import { More as EllipsisOutlined } from '../icon'
import SubMenu, { SubMenuProps } from './SubMenu'
import Item, { MenuItemProps } from './MenuItem'
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider'
import devWarning from '../_util/devWarning'
import collapseMotion from '../_util/motion'
import { cloneElement } from '../_util/reactNode'
import MenuContext, { MenuTheme } from './MenuContext'
import MenuDivider from './MenuDivider'

export type { MenuDividerProps } from './MenuDivider'
export type { MenuItemGroupProps } from 'rc-menu'

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline'

export interface MenuProps extends RcMenuProps {
  theme?: MenuTheme
  inlineIndent?: number
}

type InternalMenuProps = MenuProps & {
  collapsedWidth?: string | number
}

class InternalMenu extends React.Component<InternalMenuProps> {
  static defaultProps: Partial<MenuProps> = {
    theme: 'light' // or dark
  }

  constructor(props: InternalMenuProps) {
    super(props)

    devWarning(
      !('inlineCollapsed' in props && props.mode !== 'inline'),
      'Menu',
      '`inlineCollapsed` should only be used when `mode` is inline.'
    )
  }

  getInlineCollapsed() {
    return false
  }

  renderMenu = ({ getPopupContainer, getPrefixCls, direction }: ConfigConsumerProps) => {
    const rootPrefixCls = getPrefixCls()

    const { prefixCls: customizePrefixCls, className, theme, expandIcon, ...restProps } = this.props

    const passedProps = omit(restProps, ['collapsedWidth'])
    const inlineCollapsed = this.getInlineCollapsed()

    const defaultMotions = {
      horizontal: { motionName: `${rootPrefixCls}-slide-up` },
      inline: collapseMotion,
      other: { motionName: `${rootPrefixCls}-zoom-big` }
    }

    const prefixCls = getPrefixCls('menu', customizePrefixCls)
    const menuClassName = classNames(`${prefixCls}-${theme}`, className)

    return (
      <MenuContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          prefixCls,
          inlineCollapsed: inlineCollapsed || false,
          antdMenuTheme: theme,
          direction,
          firstLevel: true
        }}
      >
        <RcMenu
          getPopupContainer={getPopupContainer}
          overflowedIndicator={<EllipsisOutlined />}
          overflowedIndicatorPopupClassName={`${prefixCls}-${theme}`}
          {...passedProps}
          inlineCollapsed={inlineCollapsed}
          className={menuClassName}
          prefixCls={prefixCls}
          direction={direction}
          defaultMotions={defaultMotions}
          expandIcon={cloneElement(expandIcon, {
            className: `${prefixCls}-submenu-expand-icon`
          })}
        />
      </MenuContext.Provider>
    )
  }

  render() {
    return <ConfigConsumer>{this.renderMenu}</ConfigConsumer>
  }
}

// We should keep this as ref-able
class Menu extends React.Component<MenuProps, {}> {
  static Divider = MenuDivider

  static Item = Item

  static SubMenu = SubMenu

  static ItemGroup = ItemGroup

  render() {
    return <InternalMenu {...this.props} />
  }
}

export type { MenuTheme, SubMenuProps, MenuItemProps }

export default Menu
