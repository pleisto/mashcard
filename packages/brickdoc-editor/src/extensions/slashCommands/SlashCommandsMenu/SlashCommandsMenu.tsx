import * as React from 'react'
import { Editor, Range } from '@tiptap/react'
import { SlashMenuItem } from './SlashMenuItem'
import './index.less'

export interface SlashCommandsMenuItem {
  title: string
  alias?: string[]
  desc: string
  icon: React.ReactNode
  command: ({ editor, range }: { editor: Editor; range: Range }) => void
}

export interface SlashCommandsMenuProps {
  items: SlashCommandsMenuItem[]
  activeIndex?: number
  onIndexChange?: (index: number) => void
  command: (item: SlashCommandsMenuItem) => void
}

export const SlashCommandsMenu: React.FC<SlashCommandsMenuProps> = ({ items, activeIndex, command, onIndexChange }) => {
  const selectItem = (index: number) => () => {
    const item = items[index]
    if (item) command(item)
  }

  const onHover = (index: number) => (): void => {
    onIndexChange?.(index)
  }
  return (
    <div role="menu" className="brickdoc-slash-menu">
      <div className="slash-menu-heading">Brickdoc</div>
      {items.map((item, index) => (
        <SlashMenuItem
          key={index}
          active={index === activeIndex}
          title={item.title}
          desc={item.desc}
          icon={item.icon}
          onClick={selectItem(index)}
          onHover={onHover(index)}
        />
      ))}
    </div>
  )
}
