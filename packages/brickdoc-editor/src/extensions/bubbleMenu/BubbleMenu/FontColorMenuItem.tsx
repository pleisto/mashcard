import * as React from 'react'
import { Editor } from '@tiptap/core'
import { StyleMeta } from './BubbleMenu'
import { Button, Dropdown, Tooltip, Icon } from '@brickdoc/design-system'
import { ColorMeta, COLOR as FONT_COLOR } from '../../color'

const FontColorStyle: StyleMeta = {
  value: 'fontColor',
  label: <Icon.FontSize />,
  desc: 'Font-color'
}

export const FontColorMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [lastColor, setLastColor] = React.useState<ColorMeta>()
  const [currentColor, setCurrentColor] = React.useState<ColorMeta>()
  const selectColor = (color: ColorMeta) => () => {
    setLastColor(currentColor)
    editor.chain().focus().setFontColor(color.color).run()
    setCurrentColor(color)
  }

  // TODO: Need a better solution to avoid calculate frequently
  const activeColor = (): string | undefined => FONT_COLOR.find(color => editor.isActive('textStyle', { fontColor: color.color }))?.color

  const menu = (
    <div className="brickdoc-bubble-font-menu-list">
      {lastColor && (
        <>
          <div className="font-menu-heading">Last Used</div>
          <Button onClick={selectColor(lastColor)} type="text" className="font-menu-item">
            <Icon.FontSize className="font-menu-item-icon" style={{ color: lastColor.color }} />
            <span className="font-menu-item-label">{lastColor.label}</span>
          </Button>
        </>
      )}
      <div className="font-menu-heading">Color</div>
      {FONT_COLOR.map(item => (
        <Button key={item.color} onClick={selectColor(item)} type="text" className="font-menu-item">
          <Icon.FontSize className="font-menu-item-icon" style={{ color: item.color }} />
          <span className="font-menu-item-label">{item.label}</span>
        </Button>
      ))}
    </div>
  )

  return (
    <Tooltip
      overlayClassName="brickdoc-bubble-menu-item-hint"
      title={
        <>
          <div className="item-hint-main">{FontColorStyle.desc}</div>
          {FontColorStyle.shortcutDesc && <div className="item-hint-sub">{FontColorStyle.shortcutDesc}</div>}
        </>
      }
      placement="top"
    >
      <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
        <Button role="menuitem" onClick={e => e.preventDefault()} type="text" className="bubble-menu-item">
          <Icon.FontSize className="bubble-menu-item-icon" style={{ color: activeColor() }} />
          <Icon.LineDown className="bubble-menu-item-arrow-icon" />
        </Button>
      </Dropdown>
    </Tooltip>
  )
}
