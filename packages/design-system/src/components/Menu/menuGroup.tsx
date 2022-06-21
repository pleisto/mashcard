import React from 'react'
import { MenuGroup as ReakitMenuGroup, MenuGroupHTMLProps } from 'reakit/Menu'
import { cx } from '../../utilities'
import { css, styled, theme } from '../../themes'
import { MenuContext } from './context'
import { itemMinHeight, itemSpacing } from './styles/index.style'

export interface MenuGroupProps extends MenuGroupHTMLProps {
  label?: React.ReactNode
}

const SectionHeading = styled('span', {
  alignItems: 'center',
  color: theme.colors.typeSecondary,
  display: 'flex',
  flexDirection: 'row',
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 500,
  minHeight: itemMinHeight,
  padding: `0 ${itemSpacing}`
})

const menuGroupStyles = css({
  listStyle: 'none',
  padding: 0
})

export const MenuGroup: React.FC<MenuGroupProps> = props => {
  const { className, children } = props
  const menuProps = React.useContext(MenuContext)
  const menuGroupClass = React.useMemo<string>(() => cx(menuGroupStyles(), className), [className])
  const label = props.label ?? props.title
  const title = props.title ?? (typeof label === 'string' ? label : '')

  return (
    <ReakitMenuGroup as="ul" {...menuProps} {...props} title={title} className={menuGroupClass}>
      {label && <SectionHeading aria-label={title}>{label}</SectionHeading>}
      {children}
    </ReakitMenuGroup>
  )
}
