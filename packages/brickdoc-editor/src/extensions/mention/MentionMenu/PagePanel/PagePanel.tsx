/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import cx from 'classnames'
import { Editor, Range } from '@tiptap/core'
import './PagePanel.less'
import { useEditorI18n } from '../../../..'
import { Icon } from '@brickdoc/design-system'

export interface PageItem {
  icon: string | null
  name: string
  category?: string
  command: (editor: Editor, range: Range) => void
}

export interface PagePanelProps {
  active: boolean
  activeIndex: number
  items: PageItem[]
  editor: Editor
  range: Range
}

export const PagePanel: React.FC<PagePanelProps> = ({ editor, range, items, active, activeIndex }) => {
  const [t] = useEditorI18n()
  const handlePageSelect = (item: PageItem) => (): void => {
    item.command(editor, range)
  }

  return (
    <div className="mention-menu-panel">
      <div className="mention-menu-panel-head">{t(items.length === 0 ? 'mention.page_link.no_content' : 'mention.page_link.head')}</div>
      <div className="mention-menu-page-items">
        {items.map((item, index) => (
          <div
            key={index}
            role="menuitem"
            tabIndex={-1}
            onClick={handlePageSelect(item)}
            className={cx('mention-menu-page', { active: active && index === activeIndex })}
          >
            {item.icon ? (
              <span role="img" className="mention-menu-page-icon" aria-label="">
                {item.icon}
              </span>
            ) : (
              <Icon.FilePages className="mention-menu-page-icon" />
            )}
            <div className="mention-menu-page-content">
              <span className="mention-menu-page-name">{item.name}</span>
              {item.category && <span className="mention-menu-page-category">{item.category}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
