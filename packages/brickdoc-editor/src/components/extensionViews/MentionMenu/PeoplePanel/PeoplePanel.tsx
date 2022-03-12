/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Editor, Range } from '@tiptap/core'
import { Avatar, cx } from '@brickdoc/design-system'
import './PeoplePanel.less'
import { EditorContext } from '../../../../context/EditorContext'

export interface PeopleItem {
  avatar: string | undefined
  name: string | null | undefined
  domain: string
  command: (editor: Editor, range: Range) => void
}

export interface PeoplePanelProps {
  active: boolean
  activeIndex: number
  items: PeopleItem[]
  editor: Editor
  range: Range
}

export const PeoplePanel: React.FC<PeoplePanelProps> = ({ editor, items, range, active, activeIndex }) => {
  const { t } = React.useContext(EditorContext)

  const handlePeopleSelect = (item: PeopleItem) => (): void => {
    item.command(editor, range)
  }

  return (
    <div className="mention-menu-panel">
      <div className="mention-menu-panel-head">
        {t(items.length === 0 ? 'mention.people.no_content' : 'mention.people.head')}
      </div>
      <div className="mention-menu-people-items">
        {items.map((item, index) => (
          <div
            key={index}
            role="menuitem"
            tabIndex={-1}
            onClick={handlePeopleSelect(item)}
            className={cx('mention-menu-people', { active: active && index === activeIndex })}>
            <Avatar className="mention-menu-people-avatar" initials={item.name ?? item.domain} src={item.avatar} />
            <span className="mention-menu-people-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
