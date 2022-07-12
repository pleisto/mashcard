import {
  cloneElement,
  forwardRef,
  ForwardRefRenderFunction,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react'
import { MenuItem as ReakitMenuItem, MenuItemHTMLProps } from 'reakit/Menu'
import { cx } from '../../utilities'
import { css, theme, styled } from '../../themes'
import { MenuActionContext, MenuContext } from './context'
import { itemMinHeight, itemSpacing } from './styles/index.style'
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
  variants: {
    danger,
    active: {
      true: active
    }
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

type RenderElement = string | ReactElement

export interface MenuItemProps extends Omit<MenuItemHTMLProps, 'css'> {
  danger?: boolean
  label?: RenderElement
  description?: RenderElement
  icon?: ReactNode
  tip?: RenderElement
  active?: boolean
  onAction?: MenuProps['onAction']
  itemKey: string
}

const getReactElement = (element?: RenderElement): ReactElement =>
  typeof element === 'string' ? <span>{element}</span> : element!

const getString = (element?: RenderElement): string => (typeof element === 'string' ? element : '')

const _MenuItem: ForwardRefRenderFunction<HTMLLIElement, MenuItemProps> = (props, ref) => {
  const { active, className, danger, itemKey, icon, description, tip, children, onClick, onAction, ...restProps } =
    props
  const menuProps = useContext(MenuContext)
  const globalOnAction = useContext(MenuActionContext)
  const menuItemClass = useMemo<string>(
    () => cx(menuItemStyles({ active, danger }), className),
    [active, className, danger]
  )
  const label = props.label ?? props.title
  const title = props.title ?? (typeof label === 'string' ? label : '')
  const handleClick = useCallback<MouseEventHandler<HTMLLIElement>>(
    (event): void => {
      onClick?.(event)
      onAction?.(itemKey)
      globalOnAction?.(itemKey)
    },
    [globalOnAction, itemKey, onAction, onClick]
  )

  return (
    <ReakitMenuItem
      {...menuProps}
      {...restProps}
      onClick={handleClick}
      as="li"
      ref={ref}
      title={title}
      className={menuItemClass}>
      {children}
      {!children && (
        <ItemContent>
          {icon && <ItemIcon>{icon}</ItemIcon>}
          {(label ?? description) && (
            <ItemMain>
              {label && (
                <ItemLabel aria-label={getString(label)} danger={danger}>
                  {cloneElement(getReactElement(label))}
                </ItemLabel>
              )}
              {description && (
                <ItemDescription aria-describedby={getString(label)}>
                  {cloneElement(getReactElement(description))}
                </ItemDescription>
              )}
            </ItemMain>
          )}
          {tip && cloneElement(getReactElement(tip))}
        </ItemContent>
      )}
    </ReakitMenuItem>
  )
}

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(_MenuItem)
