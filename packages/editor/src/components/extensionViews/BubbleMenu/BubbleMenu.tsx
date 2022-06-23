import { useEffect, useState } from 'react'
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { BubbleMenuViewProps } from '@tiptap/extension-bubble-menu'
import { Editor } from '@tiptap/core'
import { Toolbar } from '../../ui/Toolbar'
import { useBubbleMenuItems } from './useBubbleMenuItems'
import { Button } from '@mashcard/design-system'
import { isTextContentSelected } from '../../../extensions/extensions/selection'
import { Base } from '../../../extensions/base'

interface BubbleMenuProps {
  editor: Editor | null
}

export const shouldShow: BubbleMenuViewProps['shouldShow'] = ({ editor, from, to }) => {
  const baseExtension = editor.extensionManager.extensions.find(
    extension => extension.name === Base.name
  ) as typeof Base

  if (baseExtension?.options.bubbleMenu) {
    return isTextContentSelected({ editor, from, to })
  }

  return false
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
      editor={editor}>
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
