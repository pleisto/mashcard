import * as React from 'react'
import { SuggestionProps } from '@tiptap/suggestion'
import { PeopleItem, PeoplePanel } from './PeoplePanel/PeoplePanel'
import { PageItem, PagePanel } from './PagePanel/PagePanel'
import './MentionMenu.less'

export interface MentionCommandsMenuProps extends Omit<SuggestionProps, 'items'> {
  activeCategory: 'people' | 'page'
  activeIndex: number
  items: {
    people: PeopleItem[]
    page: PageItem[]
  }
}

export const MentionCommandsMenu: React.FC<MentionCommandsMenuProps> = ({
  editor,
  range,
  items,
  activeCategory = 'people',
  activeIndex = 0
}) => {
  if (items.page.length === 0 && items.people.length === 0) {
    return null
  }

  return (
    <div role="menu" className="brickdoc-mention-menu">
      <PeoplePanel
        active={activeCategory === 'people'}
        activeIndex={activeIndex}
        editor={editor}
        range={range}
        items={items.people}
      />
      <div className="mention-menu-divider" />
      <PagePanel
        active={activeCategory === 'page'}
        activeIndex={activeIndex}
        editor={editor}
        range={range}
        items={items.page}
      />
    </div>
  )
}
