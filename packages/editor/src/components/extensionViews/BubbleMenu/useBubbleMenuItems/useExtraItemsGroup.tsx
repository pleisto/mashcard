import { useMemo } from 'react'
import { Message, RemoveAnchorMark, AnchorMark, More } from '@mashcard/design-icons'
import { ToolbarSubMenuOption, ToolbarGroupOption } from '../../../ui/Toolbar'
import { isBubbleMenuVisible } from '../BubbleMenu'
import { useEditorContext, useEditorI18n } from '../../../../hooks'
import { Editor } from '@tiptap/core'
import { Discussion } from '../../../../extensions'

const isCommentActive = (editor: Editor | null | undefined): boolean => {
  return !!editor?.extensionManager.extensions.find(extension => extension.name === Discussion.name)
}

export function useExtraItemsGroup(): [ToolbarGroupOption | null] {
  const { editor } = useEditorContext()
  const [t] = useEditorI18n()

  const option = useMemo<ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const extraItemsGroup: ToolbarGroupOption = {
      type: 'group',
      items: []
    }

    if (isCommentActive(editor)) {
      extraItemsGroup.items.push({
        type: 'item',
        name: 'comment',
        icon: <Message />,
        tooltip: t('bubble_menu.comment.title') as string,
        onAction: () => {
          editor.chain().focus().setDiscussion().run()
        }
      })
    }

    if (extraItemsGroup.items.length === 0) return null

    return extraItemsGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
