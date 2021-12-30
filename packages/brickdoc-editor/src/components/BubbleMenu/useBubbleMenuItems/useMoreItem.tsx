import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { EditorContext } from '../../../context/EditorContext'
import { ToolbarDropdownOption, ToolbarOption, ToolbarGroupOption } from '../../Toolbar'
import { isBubbleMenuVisible } from './useBubbleMenuItems'

export function useMoreItem(): [ToolbarOption | ToolbarGroupOption | null] {
  const { editor, t } = React.useContext(EditorContext)

  const option = React.useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const items: ToolbarDropdownOption['items'] = []

    if (!editor.isActive('heading')) {
      if (editor.isActive('anchor')) {
        items.push({
          type: 'item',
          name: 'removeAnchor',
          icon: <Icon.RemoveAnchorMark />,
          label: t('bubble_menu.anchor.remove'),
          onAction: () => editor.chain().focus().unsetAnchor().run()
        })
      } else {
        items.push({
          type: 'item',
          name: 'anchor',
          icon: <Icon.AnchorMark />,
          label: t('bubble_menu.anchor.add'),
          onAction: () => editor.chain().focus().setAnchor().run()
        })
      }
    }

    if (items.length === 0) return null

    const moreItem: ToolbarDropdownOption = {
      type: 'dropdown',
      name: 'more',
      content: <Icon.More />,
      items
    }

    return moreItem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
