import { useEffect, useState } from 'react'
import { Editor } from '@tiptap/core'
import { Toolbar } from '../../ui/Toolbar'
import { useBubbleMenuItems } from './useBubbleMenuItems'
import { Button } from '@mashcard/design-system'
import { Base } from '../../../extensions/base'
import { BubbleMenuPlugin, BubbleMenuPluginProps } from './BubbleMenuPlugin'
import { findNodesInSelection } from '../../../helpers'
import { meta as paragraphMeta } from '../../../extensions/blocks/paragraph/meta'
import { meta as headingMeta } from '../../../extensions/blocks/heading/meta'
import { meta as listItemMeta } from '../../../extensions/blocks/listItem/meta'
import { meta as orderedListMeta } from '../../../extensions/blocks/orderedList/meta'
import { meta as bulletListMeta } from '../../../extensions/blocks/bulletList/meta'
import { meta as taskItemMeta } from '../../../extensions/blocks/taskItem/meta'
import { meta as taskListMeta } from '../../../extensions/blocks/taskList/meta'
import { meta as calloutMeta } from '../../../extensions/blocks/callout/meta'
import { meta as blockquoteMeta } from '../../../extensions/blocks/blockquote/meta'

interface BubbleMenuProps {
  editor: Editor | null
}

const isTextContentSelected = ({ editor, from, to }: { editor: Editor; from: number; to: number }): boolean => {
  const allowedNodeTypes = [
    paragraphMeta.name,
    headingMeta.name,
    listItemMeta.name,
    orderedListMeta.name,
    bulletListMeta.name,
    taskItemMeta.name,
    taskListMeta.name,
    calloutMeta.name,
    blockquoteMeta.name
  ]

  if (!editor.isEditable || editor.isDestroyed) return false
  if (from === to) return false

  const isEmpty = editor.state.doc.textBetween(from, to).length === 0

  if (isEmpty) return false

  let show = false

  const nodes = findNodesInSelection(editor, from, to)

  for (const { node } of nodes) {
    if (node) {
      // Text node
      if (node.type.name === 'text') {
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

export const shouldShow: BubbleMenuPluginProps['shouldShow'] = ({ editor, from, to }) => {
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
    <BubbleMenuPlugin
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
    </BubbleMenuPlugin>
  )
}
