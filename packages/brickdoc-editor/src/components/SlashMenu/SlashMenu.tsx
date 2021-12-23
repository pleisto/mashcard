import * as React from 'react'
import { Editor, Range } from '@tiptap/core'
import { SlashMenuItem as SlashMenuItemComponent } from './SlashMenuItem'
import { useEditorI18n } from '../../hooks'

import './index.less'

export interface SlashMenuItem {
  key: string
  alias?: string[]
  icon: React.ReactNode
  command: ({ editor, range }: { editor: Editor; range: Range }) => void
}

export interface SlashMenuProps {
  items: SlashMenuItem[]
  activeIndex?: number
  onIndexChange?: (index: number) => void
  command: (item: SlashMenuItem) => void
}

export const SlashMenu: React.FC<SlashMenuProps> = ({ items, activeIndex, command, onIndexChange }) => {
  const selectItem = (index: number) => () => {
    const item = items[index]
    if (item) command(item)
  }

  const onHover = (index: number) => (): void => {
    onIndexChange?.(index)
  }

  const { t } = useEditorI18n()
  return (
    <div role="menu" className="brickdoc-slash-menu">
      <div className="slash-menu-heading">{t(`slashmenu.heading`)}</div>
      {items.map((item, index) => (
        <SlashMenuItemComponent
          key={item.key}
          active={index === activeIndex}
          title={t(`slashmenu.items.${item.key}.title`)}
          desc={t(`slashmenu.items.${item.key}.desc`)}
          icon={item.icon}
          onClick={selectItem(index)}
          onHover={onHover(index)}
        />
      ))}
    </div>
  )
}
