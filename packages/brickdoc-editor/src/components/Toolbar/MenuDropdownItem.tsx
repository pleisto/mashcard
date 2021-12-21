import React from 'react'
import { Icon, Menu, Popover, styled, theme } from '@brickdoc/design-system'
import { ToolbarDropdownOption } from './Toolbar'
import { ToolbarMenuItem } from './MenuItem'
import { itemCommon, itemHeight } from './styles/index.style'
import { variants } from './styles/variants.style'
import './styles/MenuDropdownPopover.less'

const DropdownItem = styled('li', {
  include: ['flexCenter'],
  color: theme.colors.typePrimary,
  cursor: 'pointer',
  display: 'flex',
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 500,
  height: itemHeight,
  lineHeight: itemHeight,
  ...itemCommon,
  variants
})

const ArrowDown = styled(Icon.ArrowDown, {
  color: theme.colors.iconThirdary,
  fontSize: '.5rem',
  marginLeft: '4px'
})

export interface ToolbarMenuDropdownItemProps {
  option: ToolbarDropdownOption
}

export const ToolbarMenuDropdownItem: React.FC<ToolbarMenuDropdownItemProps> = ({ option }) => {
  const [visible, setVisible] = React.useState(false)
  const handleVisibleChange = (visible: boolean): void => setVisible(visible)

  return (
    <Popover
      trigger="click"
      visible={visible}
      overlayClassName="brickdoc-toolbar-dropdown-popover"
      onVisibleChange={handleVisibleChange}
      placement="bottom"
      content={
        <Menu aria-label={option.name} searchable={option.searchable}>
          {option.menuItems.map((menuItem, index) => {
            if (Array.isArray(menuItem)) {
              return (
                <Menu.Section key={index}>
                  {menuItem.map(item => (
                    <Menu.Item
                      key={item.name}
                      icon={item.icon}
                      label={item.name}
                      onAction={key => {
                        item.onAction?.(key)
                        if (item.closeOnAction) setVisible(false)
                      }}>
                      {item.content}
                    </Menu.Item>
                  ))}
                </Menu.Section>
              )
            }
            return (
              <Menu.Item key={menuItem.name} icon={menuItem.icon} label={menuItem.name} onAction={menuItem.onAction}>
                {menuItem.content}
              </Menu.Item>
            )
          })}
        </Menu>
      }>
      {option.icon && <ToolbarMenuItem option={option} />}
      {!option.icon && (
        <DropdownItem active={option.active}>
          {option.content}
          <ArrowDown />
        </DropdownItem>
      )}
    </Popover>
  )
}
