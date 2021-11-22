/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import cx from 'classnames'
import { Editor, Range } from '@tiptap/core'
import { Avatar } from '@brickdoc/design-system'
import './PeoplePanel.less'
import { useEditorI18n } from '../../../..'

export interface PeopleItem {
  avatar: string | undefined
  name: string | null | undefined
  webid: string
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
  const [t] = useEditorI18n()

  const handlePeopleSelect = (item: PeopleItem) => (): void => {
    item.command(editor, range)
  }

  return (
    <div className="mention-menu-panel">
      <div className="mention-menu-panel-head">{t(items.length === 0 ? 'mention.people.no_content' : 'mention.people.head')}</div>
      <div className="mention-menu-people-items">
        {items.map((item, index) => (
          <div
            key={index}
            role="button"
            tabIndex={-1}
            onClick={handlePeopleSelect(item)}
            className={cx('mention-menu-people', { active: active && index === activeIndex })}>
            <Avatar className="mention-menu-people-avatar" initials={item.name ?? item.webid} src={item.avatar} />
            <span className="mention-menu-people-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
