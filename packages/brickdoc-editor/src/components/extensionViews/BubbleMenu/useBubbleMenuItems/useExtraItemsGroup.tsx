import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { EditorContext } from '../../../../context/EditorContext'
import { ToolbarSubMenuOption, ToolbarOption, ToolbarGroupOption } from '../../../ui/Toolbar'
import { isBubbleMenuVisible } from './useBubbleMenuItems'
import { useExternalProps } from '../../../../hooks/useExternalProps'

export function useExtraItemsGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { editor, t } = React.useContext(EditorContext)
  const { featureFlags } = useExternalProps()

  const option = React.useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const extraItemsGroup: ToolbarGroupOption = {
      type: 'group',
      items: []
    }

    if (featureFlags.experiment_discussion) {
      extraItemsGroup.items.push({
        type: 'item',
        name: 'comment',
        icon: <Icon.Message />,
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
          icon: <Icon.RemoveAnchorMark />,
          label: t('bubble_menu.anchor.remove'),
          onAction: () => editor.chain().focus().unsetAnchor().run()
        })
      } else {
        moreItems.push({
          type: 'item',
          name: 'anchor',
          icon: <Icon.AnchorMark />,
          label: t('bubble_menu.anchor.add'),
          onAction: () => editor.chain().focus().setAnchor().run()
        })
      }
    }

    if (moreItems.length !== 0) {
      extraItemsGroup.items.push({
        type: 'subMenu',
        name: 'more',
        content: <Icon.More />,
        items: moreItems
      })
    }

    if (extraItemsGroup.items.length === 0) return null

    return extraItemsGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
