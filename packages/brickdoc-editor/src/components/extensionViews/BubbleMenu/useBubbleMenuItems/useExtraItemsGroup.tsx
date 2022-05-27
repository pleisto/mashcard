import { useMemo } from 'react'
import { Message, RemoveAnchorMark, AnchorMark, More } from '@brickdoc/design-icons'
import { ToolbarSubMenuOption, ToolbarOption, ToolbarGroupOption } from '../../../ui/Toolbar'
import { isBubbleMenuVisible } from '../BubbleMenu'
import { useEditorContext, useEditorI18n, useEditorPropsContext } from '../../../../hooks'

export function useExtraItemsGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { editor } = useEditorContext()
  const [t] = useEditorI18n()
  const editorProps = useEditorPropsContext()

  const option = useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const extraItemsGroup: ToolbarGroupOption = {
      type: 'group',
      items: []
    }

    if (editorProps.featureFlags.experiment_discussion) {
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

    const moreItems: ToolbarSubMenuOption['items'] = []

    if (!editor.isActive('heading')) {
      if (editor.isActive('anchor')) {
        moreItems.push({
          type: 'item',
          name: 'removeAnchor',
          icon: <RemoveAnchorMark />,
          label: t('bubble_menu.anchor.remove'),
          onAction: () => editor.chain().focus().unsetAnchor().run()
        })
      } else {
        moreItems.push({
          type: 'item',
          name: 'anchor',
          icon: <AnchorMark />,
          label: t('bubble_menu.anchor.add'),
          onAction: () => editor.chain().focus().setAnchor().run()
        })
      }
    }

    if (moreItems.length !== 0) {
      extraItemsGroup.items.push({
        type: 'subMenu',
        trigger: 'hover',
        name: 'more',
        content: <More />,
        items: moreItems
      })
    }

    if (extraItemsGroup.items.length === 0) return null

    return extraItemsGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
