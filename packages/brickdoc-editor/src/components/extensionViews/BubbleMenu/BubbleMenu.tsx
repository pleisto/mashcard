import { useEffect, useState } from 'react'
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { BubbleMenuViewProps } from '@tiptap/extension-bubble-menu'
import { Editor } from '@tiptap/core'
import { Toolbar } from '../../ui/Toolbar'
import { useBubbleMenuItems } from './useBubbleMenuItems'
import { findNodesInSelection } from '../../../helpers'
import { Button } from '@brickdoc/design-system'

interface BubbleMenuProps {
  editor: Editor | null
}

export const shouldShow: BubbleMenuViewProps['shouldShow'] = ({ editor, from, to }) => {
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
      } else if (allowedNodeTypes.includes(node.type.name) && node.textContent.length) {
        show = true
      } else {
        return false
      }
    }
  }

  return show
}

export const isBubbleMenuVisible = (editor: Editor | null | undefined): editor is Editor => {
  if (!editor) return false
  const { from, to } = editor.state.selection
  if (from === to) return false
  return true
}

export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  const [options] = useBubbleMenuItems()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const currentVisible = isBubbleMenuVisible(editor)
    if (currentVisible !== visible) setVisible(currentVisible)
  }, [editor, editor?.state.selection, visible])

  if (!editor) return null

  return (
    <TiptapBubbleMenu
      tippyOptions={{ placement: 'top-start', maxWidth: '500px', delay: [1000, 0] }}
      shouldShow={shouldShow}
      editor={editor}
    >
      {visible && (
        // Puts toolbar inside a button to prevent toolbar from blink.
        // ref: https://tiptap.dev/api/extensions/bubble-menu
        // Not sure why
        <Button type="unstyled" css={{ boxShadow: 'none!important' }}>
          <Toolbar options={options} />
        </Button>
      )}
    </TiptapBubbleMenu>
  )
}
