import * as React from 'react'
import cx from 'classnames'
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import {
  Button,
  Dropdown,
  Tooltip,
  IconBoldWords,
  IconListOrdered,
  IconListUnordered,
  IconItalics,
  IconStrikeThrough,
  IconTextUnderline,
  IconRteH1,
  IconRteH2,
  IconRteH3,
  IconFontSize,
  IconLineDown
} from '@brickdoc/design-system'
import './index.less'

interface BubbleMenuProps {
  editor: Editor | null
}

interface StyleMeta {
  value: 'bold' | 'italic' | 'strike' | 'heading' | 'bulletList' | 'orderedList' | 'underline' | 'fontColor'
  label: React.ReactNode
  desc: string
  shortcutDesc?: string
  option?: any
}

const MarkStyle: StyleMeta[] = [
  {
    value: 'bold',
    label: <IconBoldWords />,
    desc: 'Bold',
    shortcutDesc: '⌘+B'
  },
  {
    value: 'italic',
    label: <IconItalics />,
    desc: 'Italic',
    shortcutDesc: '⌘+I'
  },
  {
    value: 'underline',
    label: <IconTextUnderline />,
    desc: 'Underline',
    shortcutDesc: '⌘+U'
  },
  {
    value: 'strike',
    label: <IconStrikeThrough />,
    desc: 'Strike-through'
  }
]

const HeadingStyle: StyleMeta[] = [
  {
    value: 'heading',
    label: <IconRteH1 />,
    option: { level: 1 },
    desc: 'Heading 1'
  },
  {
    value: 'heading',
    label: <IconRteH2 />,
    option: { level: 2 },
    desc: 'Heading 2'
  },
  {
    value: 'heading',
    label: <IconRteH3 />,
    option: { level: 3 },
    desc: 'Heading 3'
  }
]

const FontColorStyle: StyleMeta = {
  value: 'fontColor',
  label: <IconFontSize />,
  desc: 'Font-color'
}

const ListStyle: StyleMeta[] = [
  {
    value: 'bulletList',
    label: <IconListUnordered />,
    desc: 'Bullet-list'
  },
  {
    value: 'orderedList',
    label: <IconListOrdered />,
    desc: 'Ordered-list'
  }
]

const MenuItem: React.FC<{ editor: Editor; style: StyleMeta }> = ({ editor, style }) => {
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
      default:
        break
    }
  }

  const activeClass = (style: StyleMeta) => (editor.isActive(style.value, style.option) ? 'active' : '')

  return (
    <Tooltip
      overlayClassName="brickdoc-bubble-menu-item-hint"
      title={
        <>
          <div className="item-hint-main">{style.desc}</div>
          {style.shortcutDesc && <div className="item-hint-sub">{style.shortcutDesc}</div>}
        </>
      }
      placement="top">
      <Button onClick={toggleStyle(style)} type="text" className={cx('bubble-menu-item', activeClass(style))}>
        {style.label}
      </Button>
    </Tooltip>
  )
}

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

const FontColorMenuItem: React.FC<{ editor: Editor; style: StyleMeta }> = ({ editor, style }) => {
  const [lastColor, setLastColor] = React.useState<ColorMeta>(null)
  const [currentColor, setCurrentColor] = React.useState<ColorMeta>(null)
  const selectColor = (color: ColorMeta) => () => {
    setLastColor(currentColor)
    editor.chain().focus().setFontColor(color.color).run()
    setCurrentColor(color)
  }

  const activeColor = () => FONT_COLOR.find(color => editor.isActive('textStyle', { fontColor: color.color }))?.color

  const menu = (
    <div className="brickdoc-bubble-font-menu-list">
      {lastColor && (
        <>
          <div className="font-menu-heading">Last Used</div>
          <Button onClick={selectColor(lastColor)} type="text" className="font-menu-item">
            <IconFontSize className="font-menu-item-icon" style={{ color: lastColor.color }} />
            <span className="font-menu-item-label">{lastColor.label}</span>
          </Button>
        </>
      )}
      <div className="font-menu-heading">Color</div>
      {FONT_COLOR.map(item => (
        <Button key={item.color} onClick={selectColor(item)} type="text" className="font-menu-item">
          <IconFontSize className="font-menu-item-icon" style={{ color: item.color }} />
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
          <div className="item-hint-main">{style.desc}</div>
          {style.shortcutDesc && <div className="item-hint-sub">{style.shortcutDesc}</div>}
        </>
      }
      placement="top">
      <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
        <Button onClick={e => e.preventDefault()} type="text" className="bubble-menu-item">
          <IconFontSize className="font-menu-item-icon" style={{ color: activeColor() }} />
          <IconLineDown className="font-menu-item-arrow-icon" />
        </Button>
      </Dropdown>
    </Tooltip>
  )
}

const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <TiptapBubbleMenu editor={editor} tippyOptions={{ placement: 'top', maxWidth: '1000px' }}>
      <div className="brickdoc-bubble-menu">
        <div className="bubble-menu-group">
          {HeadingStyle.map((s, index) => (
            <MenuItem key={index} editor={editor} style={s} />
          ))}
        </div>
        <div className="bubble-menu-group">
          {MarkStyle.map((s, index) => (
            <MenuItem key={index} editor={editor} style={s} />
          ))}
        </div>
        <div className="bubble-menu-group">
          <FontColorMenuItem editor={editor} style={FontColorStyle} />
        </div>
        <div className="bubble-menu-group">
          {ListStyle.map((s, index) => (
            <MenuItem key={index} editor={editor} style={s} />
          ))}
        </div>
      </div>
    </TiptapBubbleMenu>
  )
}

export default BubbleMenu
