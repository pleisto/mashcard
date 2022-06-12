import { FC, Fragment, ReactElement, useState } from 'react'
import { Icon, Menu, Popover, styled, theme } from '@brickdoc/design-system'
import { ToolbarSubMenuOption, ToolbarItemOption, ToolbarItemGroupOption } from './Toolbar'
import { ToolbarMenuItem } from './MenuItem'
import { itemCommon, itemHeight, LinkInputWrapper } from './styles/index.style'
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

const HorizontalGroup = styled(Menu.Group, {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  maxWidth: '100%',
  padding: '0 1.25rem',

  'li + li': {
    marginLeft: 0
  }
})

const ArrowDown = styled(Icon.ArrowDown, {
  color: theme.colors.iconThirdary,
  fontSize: '.5rem',
  marginLeft: '4px'
})

export interface ToolbarMenuSubMenuItemProps {
  option: ToolbarSubMenuOption
}

const renderMenuInner = (option: ToolbarItemGroupOption, closeMenu: VoidFunction): ReactElement => {
  const items = option.items.map(item => (
    <Menu.Item
      className={item.className}
      key={item.name}
      itemKey={item.name}
      icon={item.icon}
      label={item.label}
      onAction={key => {
        item.onAction?.(key)
        if (item.closeOnAction) closeMenu()
      }}
    >
      {item.content}
    </Menu.Item>
  ))

  if (option.orientation === 'horizontal') return <HorizontalGroup>{items}</HorizontalGroup>

  return <>{items}</>
}

const renderMenu = (
  option: ToolbarSubMenuOption,
  items: Array<ToolbarItemGroupOption | ToolbarItemOption>,
  closeMenu: () => void
): ReactElement => {
  return (
    <Menu orientation={option.orientation} className={option.className} aria-label={option.name} type="ghost">
      {items.map((menuItem, index) => {
        if (menuItem.type === 'group') {
          return (
            <Fragment key={index}>
              <Menu.Group className={menuItem.className} title={menuItem.title} label={menuItem.label} key={index}>
                {renderMenuInner(menuItem, closeMenu)}
              </Menu.Group>
              {!menuItem.disableSeparator && index < items.length - 1 && <Menu.Separator key={`separator-${index}`} />}
            </Fragment>
          )
        }
        if (menuItem.name === 'linkInput') {
          return <LinkInputWrapper key={menuItem.name}>{menuItem.content}</LinkInputWrapper>
        }
        return (
          <Menu.Item
            key={menuItem.name}
            className={menuItem.className}
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

export const ToolbarMenuSubMenuItem: FC<ToolbarMenuSubMenuItemProps> = ({ option, ...props }) => {
  const [visible, setVisible] = useState(false)
  const handleVisibleChange = (visible: boolean): void => setVisible(visible)
  const hasContent = !!option.content

  const MenuContent = Array.isArray(option.items)
    ? renderMenu(option, option.items, () => setVisible(false))
    : option.items()

  return (
    <Popover
      {...props}
      trigger={option.trigger ?? 'click'}
      visible={visible}
      onVisibleChange={handleVisibleChange}
      placement="bottom"
      compact={true}
      getPopupContainer={element => element}
      content={MenuContent}
      destroyTooltipOnHide={true}
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
