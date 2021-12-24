import * as React from 'react'
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { BubbleMenuViewProps } from '@tiptap/extension-bubble-menu'
import { Editor } from '@tiptap/core'
import { Toolbar } from '../Toolbar'
import './index.less'
import { useBubbleMenuItems } from './useBubbleMenuItems'
import { findNodesInSelection } from '../../helpers'

interface BubbleMenuProps {
  editor: Editor | null
}

const shouldShow: BubbleMenuViewProps['shouldShow'] = ({ view, state, editor, from, to }) => {
  if (!editor.isEditable || editor.isDestroyed) return false
  if (from === to) return false

  const allowedNodeTypes = ['paragraph', 'heading', 'listItem', 'orderedList', 'bulletList']
  let show = false

  const nodes = findNodesInSelection(editor, from, to)

  for (const { node } of nodes) {
    if (node) {
      // Text node
      if (node.type.name === 'text' && node.text?.length) {
        show = true
      } else if (allowedNodeTypes.includes(node.type.name)) {
        show = true
      } else {
        return false
      }
    }
  }

  return show
}

export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  const [options] = useBubbleMenuItems()

  if (!editor) return null

  return (
    <TiptapBubbleMenu tippyOptions={{ placement: 'top-start' }} shouldShow={shouldShow} editor={editor}>
      <Toolbar options={options} />
    </TiptapBubbleMenu>
  )
}
