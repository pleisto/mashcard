import React from 'react'
import { AriaMenuItemProps } from '@react-aria/menu'
import { styled, theme } from '../../themes'
import { itemMinHeight, itemSpacing } from './styles/index.style'
import { MenuContext } from './context'

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
  input: {
    background: theme.colors.ceramicQuaternary,
    border: `1px solid ${theme.colors.borderPrimary}`,
    borderRadius: '4px',
    fontSize: theme.fontSizes.subHeadline,
    fontWeight: 500,
    lineHeight: '1.25rem',
    margin: `${itemSpacing} 0`,
    height: '28px',
    outline: 'none',
    padding: '.5rem .625rem',
    '&::placeholder': {
      color: theme.colors.typeThirdary
    }
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
  itemKey: string
  label?: string | React.ReactElement
  onAction?: (key: string) => void
  tip?: string | React.ReactElement
}

const getReactElement = (element?: string | React.ReactElement): React.ReactElement =>
  typeof element === 'string' ? <span>{element}</span> : element

export const Item: React.FC<MenuItemProps> = ({
  children,
  itemKey,
  danger,
  icon,
  label,
  description,
  tip,
  onAction,
  ...props
}) => {
  const context = React.useContext(MenuContext)
  const onClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    ;(props as any).onClick?.(event)
    onAction?.(itemKey)
    context.onAction?.(itemKey)
  }

  return (
    <ItemRoot {...props} onClick={onClick} role="menuitem" danger={danger && typeof children === 'string'} css={{}}>
      {children}
      {!children && (
        <ItemContent>
          {icon && <ItemIcon>{icon}</ItemIcon>}
          {(label || description) && (
            <ItemMain>
              {label && <ItemLabel danger={danger}>{React.cloneElement(getReactElement(label))}</ItemLabel>}
              {description && <ItemDescription>{React.cloneElement(getReactElement(description))}</ItemDescription>}
            </ItemMain>
          )}
          {tip && React.cloneElement(getReactElement(tip))}
        </ItemContent>
      )}
    </ItemRoot>
  )
}
