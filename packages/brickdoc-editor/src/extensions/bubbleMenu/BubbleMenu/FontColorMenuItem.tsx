import * as React from 'react'
import { Editor } from '@tiptap/core'
import { StyleMeta } from './BubbleMenu'
import { Button, Dropdown, Tooltip, Icon } from '@brickdoc/design-system'

interface ColorMeta {
  color: string
  label: string
}

const FONT_COLOR: ColorMeta[] = [
  {
    color: '#3E3E3E',
    label: 'Default'
  },
  {
    color: '#A6A6A6',
    label: 'Gray'
  },
  {
    color: '#2DC5E3',
    label: 'Cyan'
  },
  {
    color: '#D43730',
    label: 'Red'
  },
  {
    color: '#E47F2A',
    label: 'Orange'
  },
  {
    color: '#FFE27D',
    label: 'Yellow'
  },
  {
    color: '#2CAD94',
    label: 'Green'
  },
  {
    color: '#55C6DF',
    label: 'Blue'
  },
  {
    color: '#5423B9',
    label: 'Purple'
  },
  {
    color: '#9F0F64',
    label: 'Purplish Red'
  }
]

const FontColorStyle: StyleMeta = {
  value: 'fontColor',
  label: <Icon name="font-size" />,
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
            <Icon name="font-size" className="font-menu-item-icon" style={{ color: lastColor.color }} />
            <span className="font-menu-item-label">{lastColor.label}</span>
          </Button>
        </>
      )}
      <div className="font-menu-heading">Color</div>
      {FONT_COLOR.map(item => (
        <Button key={item.color} onClick={selectColor(item)} type="text" className="font-menu-item">
          <Icon name="font-size" className="font-menu-item-icon" style={{ color: item.color }} />
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
      placement="top">
      <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
        <Button onClick={e => e.preventDefault()} type="text" className="bubble-menu-item">
          <Icon name="font-size" className="font-menu-item-icon" style={{ color: activeColor() }} />
          <Icon name="line-down" className="font-menu-item-arrow-icon" />
        </Button>
      </Dropdown>
    </Tooltip>
  )
}
