import * as React from 'react'
import cx from 'classnames'
import { Button } from '@brickdoc/design-system'

interface SlashMenuItemProps {
  active?: boolean
  title: string
  desc: string
  icon: React.ReactNode
  onClick?: () => void
  onHover?: () => void
}

export const SlashMenuItem: React.FC<SlashMenuItemProps> = ({ active, title, desc, icon, onClick, onHover }) => {
  return (
    <Button role="menuitem" type="text" className={cx('slash-menu-item', { active })} onClick={onClick} onMouseEnter={onHover}>
      <div className="menu-item-icon-wrapper">{icon}</div>
      <div className="menu-item-content">
        <div className="menu-item-title">{title}</div>
        <div className="menu-item-desc">{desc}</div>
      </div>
    </Button>
  )
}
