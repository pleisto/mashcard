import * as React from 'react'
import { MenuItem as ReakitMenuItem, MenuItemHTMLProps } from 'reakit/Menu'
import { cx } from '../../utilities'
import { css, theme, styled } from '../../themes'
import { MenuActionContext, MenuContext } from './context'
import { itemMinHeight, itemSpacing } from './styles/index.style'
import { useMemoizedFn } from '../../hooks'
import { MenuProps } from './menu'

const itemLineHeight = '1.25rem'

const danger = {
  true: {
    color: theme.colors.errorDefault
  }
}

const active = {
  background: theme.colors.secondaryHover
}

const menuItemStyles = css({
  alignItems: 'center',
  color: theme.colors.typePrimary,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 'normal',
  lineHeight: itemLineHeight,
  minHeight: itemMinHeight,
  minWidth: '15rem',
  outline: 'none',
  padding: `0 ${itemSpacing}`,
  transition: `all .2s ${theme.transitions.easeOut}`,
  '&:hover, &:focus, &:active': active,
  input: {
    background: theme.colors.ceramicQuaternary,
    border: `1px solid ${theme.colors.borderPrimary}`,
    borderRadius: '4px',
    fontSize: theme.fontSizes.subHeadline,
    fontWeight: 500,
    lineHeight: '1.25rem',
    margin: `.5rem 0 0`,
    height: '28px',
    outline: 'none',
    padding: '.5rem .625rem',
    '&::placeholder': {
      color: theme.colors.typeThirdary
    }
  },
  variants: {
    danger,
  }
})

const ItemIcon = styled('span', {
  include: ['flexCenter'],

  alignSelf: 'flex-start',
  display: 'flex',
  height: itemLineHeight,
  itemLineHeight,
  marginRight: '.5375rem'
})

const ItemContent = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  width: '100%'
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

type RenderElement = string | React.ReactElement

export interface MenuItemProps extends Omit<MenuItemHTMLProps, 'css'> {
  danger?: boolean
  label?: RenderElement
  description?: RenderElement
  icon?: React.ReactNode
  tip?: RenderElement
  active?: boolean
  onAction?: MenuProps['onAction']
  itemKey: string
}

const getReactElement = (element?: RenderElement): React.ReactElement =>
  typeof element === 'string' ? <span>{element}</span> : element!

const getString = (element?: RenderElement): string => (typeof element === 'string' ? element : '')

const _MenuItem: React.ForwardRefRenderFunction<HTMLLIElement, MenuItemProps> = (props, ref) => {
  const { active, className, danger, itemKey, icon, description, tip, children, onClick, onAction, ...restProps } =
    props
  const menuProps = React.useContext(MenuContext)
  const globalOnAction = React.useContext(MenuActionContext)
  const menuItemClass = React.useMemo<string>(
    () => cx(menuItemStyles({ active, danger }), className),
    [active, className, danger]
  )
  const label = props.label ?? props.title
  const title = props.title ?? (typeof label === 'string' ? label : '')
  const handleClick = useMemoizedFn((event: React.MouseEvent): void => {
    onClick?.(event)
    onAction?.(itemKey)
    globalOnAction?.(itemKey)
  })

  return (
    <ReakitMenuItem
      {...menuProps}
      {...restProps}
      onClick={handleClick}
      as="li"
      ref={ref}
      title={title}
      className={menuItemClass}
    >
      {children}
      {!children && (
        <ItemContent>
          {icon && <ItemIcon>{icon}</ItemIcon>}
          {(label ?? description) && (
            <ItemMain>
              {label && (
                <ItemLabel aria-label={getString(label)} danger={danger}>
                  {React.cloneElement(getReactElement(label))}
                </ItemLabel>
              )}
              {description && (
                <ItemDescription aria-describedby={getString(label)}>
                  {React.cloneElement(getReactElement(description))}
                </ItemDescription>
              )}
            </ItemMain>
          )}
          {tip && React.cloneElement(getReactElement(tip))}
        </ItemContent>
      )}
    </ReakitMenuItem>
  )
}

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(_MenuItem)
