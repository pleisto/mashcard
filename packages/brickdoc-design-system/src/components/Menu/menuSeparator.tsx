import React from 'react'
import { MenuSeparator as ReakitMenuSeparator, MenuSeparatorHTMLProps } from 'reakit/Menu'
import { cx } from '../../utilities'
import { css, theme } from '../../themes'
import { itemSpacing } from './styles/index.style'
import { MenuContext } from './context'

const menuSeparatorStyles = css({
  margin: `${theme.space.xxs} ${itemSpacing}`,
  borderTop: `1px solid ${theme.colors.dividerOverlayPrimary}`,
  height: 1
})

export interface MenuSeparatorProps extends MenuSeparatorHTMLProps {}

export const MenuSeparator: React.FC<MenuSeparatorProps> = props => {
  const { className } = props
  const menuProps = React.useContext(MenuContext)
  const menuSeparatorClass = React.useMemo<string>(() => cx(menuSeparatorStyles(), className), [className])

  return <ReakitMenuSeparator as="li" {...menuProps} {...props} className={menuSeparatorClass} />
}
