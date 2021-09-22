import * as React from 'react'
import cx from 'classnames'
import { Editor } from '@tiptap/core'
import { StyleMeta } from './BubbleMenu'
import { Button, Tooltip } from '@brickdoc/design-system'

export const MenuItem: React.FC<{ editor: Editor; style: StyleMeta }> = ({ editor, style }) => {
  // TODO: Need a better solution to avoid calculate frequently
  const activeClass = (style: StyleMeta): string => (editor.isActive(style.value, style.option) ? 'active' : '')
  const [tooltipVisible, setTooltipVisible] = React.useState(false)
  const handleTooltipVisibleChange = (visible: boolean): void => setTooltipVisible(visible)

  const toggleStyle = (style: StyleMeta) => () => {
    switch (style.value) {
      case 'bold':
        editor.chain().focus().toggleBold().run()
        break
      case 'strike':
        editor.chain().focus().toggleStrike().run()
        break
      case 'italic':
        editor.chain().focus().toggleItalic().run()
        break
      case 'heading':
        editor.chain().focus().toggleHeading({ level: style.option.level }).run()
        break
      case 'bulletList':
        editor.chain().focus().toggleBulletList().run()
        break
      case 'orderedList':
        editor.chain().focus().toggleOrderedList().run()
        break
      case 'underline':
        editor.chain().focus().toggleUnderline().run()
        break
    }

    setTooltipVisible(false)
  }

  return (
    <Tooltip
      overlayClassName="brickdoc-bubble-menu-item-hint"
      destroyTooltipOnHide={true}
      title={
        <>
          <div className="item-hint-main">{style.desc}</div>
          {style.shortcutDesc && <div className="item-hint-sub">{style.shortcutDesc}</div>}
        </>
      }
      visible={tooltipVisible}
      onVisibleChange={handleTooltipVisibleChange}
      placement="top"
    >
      <Button role="menuitem" onClick={toggleStyle(style)} type="text" className={cx('bubble-menu-item', activeClass(style))}>
        {style.label}
      </Button>
    </Tooltip>
  )
}
