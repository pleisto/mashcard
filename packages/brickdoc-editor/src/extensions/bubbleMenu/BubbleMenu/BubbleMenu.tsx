import * as React from 'react'
import { BubbleMenu as TiptapBubbleMenu } from '../tiptap/BubbleMenu'
import { Editor } from '@tiptap/core'
import { Icon } from '@brickdoc/design-system'
import { FontColorMenuItem } from './FontColorMenuItem'
import { MenuItem } from './MenuItem'
import { LinkMenuItem } from './LinkMenuItem'
import './index.less'

interface BubbleMenuProps {
  editor: Editor | null
}

export interface StyleMeta {
  key: string
  value?: 'bold' | 'italic' | 'strike' | 'heading' | 'underline' | 'fontColor' | 'link'
  listType?: 'bulletList' | 'orderedList'
  label: React.ReactNode
  shortcutDesc?: string
  option?: any
}

const MarkStyle: StyleMeta[] = [
  {
    key: 'bold',
    value: 'bold',
    label: <Icon.BoldWords />,
    shortcutDesc: '⌘+B'
  },
  {
    key: 'italic',
    value: 'italic',
    label: <Icon.Italics />,
    shortcutDesc: '⌘+I'
  },
  {
    key: 'underline',
    value: 'underline',
    label: <Icon.TextUnderline />,
    shortcutDesc: '⌘+U'
  },
  {
    key: 'strike',
    value: 'strike',
    label: <Icon.Strikethrough />
  }
]

const HeadingStyle: StyleMeta[] = [
  {
    key: 'h1',
    value: 'heading',
    label: <Icon.RteH1 />,
    option: { level: 1 }
  },
  {
    key: 'h2',
    value: 'heading',
    label: <Icon.RteH2 />,
    option: { level: 2 }
  },
  {
    key: 'h3',
    value: 'heading',
    label: <Icon.RteH3 />,
    option: { level: 3 }
  },
  {
    key: 'h4',
    value: 'heading',
    label: <Icon.RteH4 />,
    option: { level: 4 }
  },
  {
    key: 'h5',
    value: 'heading',
    label: <Icon.RteH5 />,
    option: { level: 5 }
  }
]

const ListStyle: StyleMeta[] = [
  {
    key: 'bulletlist',
    listType: 'bulletList',
    label: <Icon.ListUnordered />
  },
  {
    key: 'orderedlist',
    listType: 'orderedList',
    label: <Icon.ListOrdered />
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
        <div className="bubble-menu-group">
          <LinkMenuItem editor={editor} />
        </div>
      </div>
    </TiptapBubbleMenu>
  )
}
