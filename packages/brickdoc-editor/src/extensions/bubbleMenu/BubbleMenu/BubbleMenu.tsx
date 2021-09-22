import * as React from 'react'
import { BubbleMenu as TiptapBubbleMenu } from '../tiptap/BubbleMenu'
import { Editor } from '@tiptap/core'
import { Icon } from '@brickdoc/design-system'
import { FontColorMenuItem } from './FontColorMenuItem'
import { MenuItem } from './MenuItem'
import './index.less'

interface BubbleMenuProps {
  editor: Editor | null
}

export interface StyleMeta {
  value: 'bold' | 'italic' | 'strike' | 'heading' | 'bulletList' | 'orderedList' | 'underline' | 'fontColor'
  label: React.ReactNode
  desc: string
  shortcutDesc?: string
  option?: any
}

const MarkStyle: StyleMeta[] = [
  {
    value: 'bold',
    label: <Icon.BoldWords />,
    desc: 'Bold',
    shortcutDesc: '⌘+B'
  },
  {
    value: 'italic',
    label: <Icon.Italics />,
    desc: 'Italic',
    shortcutDesc: '⌘+I'
  },
  {
    value: 'underline',
    label: <Icon.TextUnderline />,
    desc: 'Underline',
    shortcutDesc: '⌘+U'
  },
  {
    value: 'strike',
    label: <Icon.Strikethrough />,
    desc: 'Strike-through'
  }
]

const HeadingStyle: StyleMeta[] = [
  {
    value: 'heading',
    label: <Icon.RteH1 />,
    option: { level: 1 },
    desc: 'Heading 1'
  },
  {
    value: 'heading',
    label: <Icon.RteH2 />,
    option: { level: 2 },
    desc: 'Heading 2'
  },
  {
    value: 'heading',
    label: <Icon.RteH3 />,
    option: { level: 3 },
    desc: 'Heading 3'
  },
  {
    value: 'heading',
    label: <Icon.RteH4 />,
    option: { level: 4 },
    desc: 'Heading 4'
  },
  {
    value: 'heading',
    label: <Icon.RteH5 />,
    option: { level: 5 },
    desc: 'Heading 5'
  }
]

const ListStyle: StyleMeta[] = [
  {
    value: 'bulletList',
    label: <Icon.ListUnordered />,
    desc: 'Bullet-list'
  },
  {
    value: 'orderedList',
    label: <Icon.ListOrdered />,
    desc: 'Ordered-list'
  }
]

export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <TiptapBubbleMenu editor={editor} tippyOptions={{ placement: 'top', maxWidth: '1000px' }}>
      <div role="menu" className="brickdoc-bubble-menu">
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
          <FontColorMenuItem editor={editor} />
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
