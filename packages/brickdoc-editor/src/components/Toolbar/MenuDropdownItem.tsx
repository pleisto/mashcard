import React from 'react'
import { Icon, Menu, Popover, styled, theme } from '@brickdoc/design-system'
import { ToolbarDropdownOption, ToolbarItemOption, ToolbarItemGroupOption } from './Toolbar'
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

const renderMenu = (
  option: ToolbarDropdownOption,
  items: Array<ToolbarItemGroupOption | ToolbarItemOption>,
  closeMenu: () => void
): React.ReactElement => {
  return (
    <Menu aria-label={option.name}>
      {items.map((menuItem, index) => {
        if (menuItem.type === 'group') {
          return (
            <>
              <Menu.Group title={menuItem.title} key={index}>
                {menuItem.items.map(item => (
                  <Menu.Item
                    key={item.name}
                    itemKey={item.name}
                    icon={item.icon}
                    label={item.label ?? item.name}
                    onAction={key => {
                      item.onAction?.(key)
                      if (item.closeOnAction) closeMenu()
                    }}
                  >
                    {item.content}
                  </Menu.Item>
                ))}
              </Menu.Group>
              {index < items.length - 1 && <Menu.Separator key={`separator-${index}`} />}
            </>
          )
        }
        return (
          <Menu.Item
            key={menuItem.name}
            itemKey={menuItem.name}
            icon={menuItem.icon}
            label={menuItem.label ?? menuItem.name}
            onAction={key => {
              menuItem.onAction?.(key)
              if (menuItem.closeOnAction) closeMenu()
            }}
          >
            {menuItem.content}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export const ToolbarMenuDropdownItem: React.FC<ToolbarMenuDropdownItemProps> = ({ option, ...props }) => {
  const [visible, setVisible] = React.useState(false)
  const handleVisibleChange = (visible: boolean): void => setVisible(visible)
  const hasContent = !!option.content

  const MenuContent = Array.isArray(option.items)
    ? renderMenu(option, option.items, () => setVisible(false))
    : option.items()

  return (
    <Popover
      {...props}
      trigger="click"
      visible={visible}
      overlayClassName="brickdoc-toolbar-dropdown-popover"
      onVisibleChange={handleVisibleChange}
      placement="bottom"
      getPopupContainer={element => element}
      content={MenuContent}
    >
      {hasContent && <ToolbarMenuItem option={option} />}
      {!hasContent && (
        <DropdownItem role="menuitem" aria-label={option.label ?? option.name} active={option.active} css={option.css}>
          {option.icon ?? option.label}
          <ArrowDown />
        </DropdownItem>
      )}
    </Popover>
  )
}
