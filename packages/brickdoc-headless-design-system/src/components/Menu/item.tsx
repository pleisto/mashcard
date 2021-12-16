import React from 'react'
import { AriaMenuItemProps, useMenuItem } from '@react-aria/menu'
import { ItemContext } from './itemContainer'
import { styled, theme } from '../../themes'
import { itemMinHeight, itemSpacing } from './styles/index.style'

const danger = {
  true: {
    color: theme.colors.errorDefault
  }
}

const lineHeight = '1.25rem'

const ItemRoot = styled('li', {
  alignItems: 'center',
  color: theme.colors.typePrimary,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 500,
  lineHeight,
  minHeight: itemMinHeight,
  minWidth: '15rem',
  outline: 'none',
  padding: `0 ${itemSpacing}`,
  '&:hover, &:focus, &:active': {
    background: theme.colors.secondaryHover
  },
  variants: {
    danger
  }
})

const ItemContent = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  width: '100%'
})

const ItemIcon = styled('span', {
  include: ['flexCenter'],

  alignSelf: 'flex-start',
  display: 'flex',
  height: lineHeight,
  lineHeight,
  marginRight: theme.space.xs
})

const ItemMain = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
})

const ItemLabel = styled('span', {
  variants: {
    danger
  }
})

const ItemDescription = styled('span', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.callout,
  lineHeight: '16px'
})

export interface MenuItemProps {
  'aria-label'?: AriaMenuItemProps['aria-label']
  danger?: boolean
  description?: string | React.ReactElement
  icon?: React.ReactNode
  key: AriaMenuItemProps['key']
  label?: string | React.ReactElement
  onAction?: AriaMenuItemProps['onAction']
  tip?: string | React.ReactElement
}

const getReactElement = (element?: string | React.ReactElement): React.ReactElement =>
  typeof element === 'string' ? <span>{element}</span> : element

export const Item: React.FC<MenuItemProps> = ({ children, danger, icon, label, description, tip }) => {
  const { state, item, onAction } = React.useContext(ItemContext)
  const isDisabled = React.useMemo(() => state.disabledKeys.has(item.key), [item.key, state.disabledKeys])

  const innerRef = React.useRef<HTMLLIElement>()
  const { menuItemProps, labelProps, descriptionProps, keyboardShortcutProps } = useMenuItem(
    {
      key: item.key,
      isDisabled,
      onAction
    },
    state,
    innerRef
  )

  return (
    <ItemRoot {...menuItemProps} danger={danger && typeof children === 'string'} css={{}} ref={innerRef}>
      {children}
      {!children && (
        <ItemContent>
          {icon && <ItemIcon>{icon}</ItemIcon>}
          {(label || description) && (
            <ItemMain>
              {label && <ItemLabel danger={danger}>{React.cloneElement(getReactElement(label), labelProps)}</ItemLabel>}
              {description && (
                <ItemDescription>{React.cloneElement(getReactElement(description), descriptionProps)}</ItemDescription>
              )}
            </ItemMain>
          )}
          {tip && React.cloneElement(getReactElement(tip), keyboardShortcutProps)}
        </ItemContent>
      )}
    </ItemRoot>
  )
}
