import { useMemo } from 'react'
import { Message } from '@mashcard/design-icons'
import { ToolbarGroupOption } from '../../../ui/Toolbar'
import { isBubbleMenuVisible } from '../BubbleMenu'
import { useEditorContext, useEditorI18n } from '../../../../hooks'
import { Editor } from '@tiptap/core'
import { Discussion } from '../../../../extensions'

const isCommentActive = (editor: Editor | null | undefined): boolean => {
  return !!editor?.extensionManager.extensions.find(extension => extension.name === Discussion.name)
}

export function useCommentItemGroup(): [ToolbarGroupOption | null] {
  const { editor } = useEditorContext()
  const [t] = useEditorI18n()

  const option = useMemo<ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const commentItemGroup: ToolbarGroupOption = {
      type: 'group',
      items: []
    }

    if (isCommentActive(editor)) {
      commentItemGroup.items.push({
        type: 'item',
        name: 'comment',
        icon: <Message />,
        tooltip: t('bubble_menu.comment.title') as string,
        onAction: () => {
          editor.chain().focus().setDiscussion().run()
        }
      })
    }

    if (commentItemGroup.items.length === 0) return null

    return commentItemGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
