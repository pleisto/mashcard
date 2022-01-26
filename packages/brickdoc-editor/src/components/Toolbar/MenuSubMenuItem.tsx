import React from 'react'
import { Icon, Menu, Popover, styled, theme } from '@brickdoc/design-system'
import { ToolbarSubMenuOption, ToolbarItemOption, ToolbarItemGroupOption } from './Toolbar'
import { ToolbarMenuItem } from './MenuItem'
import { itemCommon, itemHeight } from './styles/index.style'
import { variants } from './styles/variants.style'

const SubMenuItem = styled('li', {
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

export interface ToolbarMenuSubMenuItemProps {
  option: ToolbarSubMenuOption
}

const renderMenu = (
  option: ToolbarSubMenuOption,
  items: Array<ToolbarItemGroupOption | ToolbarItemOption>,
  closeMenu: () => void
): React.ReactElement => {
  return (
    <Menu aria-label={option.name} type="ghost">
      {items.map((menuItem, index) => {
        if (menuItem.type === 'group') {
          return (
            <React.Fragment key={index}>
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
            </React.Fragment>
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

export const ToolbarMenuSubMenuItem: React.FC<ToolbarMenuSubMenuItemProps> = ({ option, ...props }) => {
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
      onVisibleChange={handleVisibleChange}
      placement="bottom"
      compact={true}
      getPopupContainer={element => element}
      content={MenuContent}
    >
      {hasContent && <ToolbarMenuItem option={option} />}
      {!hasContent && (
        <SubMenuItem role="menuitem" aria-label={option.label ?? option.name} active={option.active} css={option.css}>
          {option.icon ?? option.label}
          <ArrowDown />
        </SubMenuItem>
      )}
    </Popover>
  )
}
