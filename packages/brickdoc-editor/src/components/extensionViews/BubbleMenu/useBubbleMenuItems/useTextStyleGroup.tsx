import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { EditorContext } from '../../../../context/EditorContext'
import { ToolbarOption, ToolbarGroupOption } from '../../../ui'
import { BubbleItemMeta, isBubbleMenuVisible } from './useBubbleMenuItems'

export function useTextStyleGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { t, editor } = React.useContext(EditorContext)

  const option = React.useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const textStyleItems: BubbleItemMeta[] = [
      {
        name: 'bold',
        icon: <Icon.BoldWords />,
        tooltip: {
          title: t('bubble_menu.bold.title'),
          description: '⌘+B'
        },
        onAction: () => editor.chain().focus().toggleBold().run()
      },
      {
        name: 'italic',
        icon: <Icon.Italics />,
        tooltip: {
          title: t('bubble_menu.italic.title'),
          description: '⌘+I'
        },
        onAction: () => editor.chain().focus().toggleItalic().run()
      },
      {
        name: 'underline',
        icon: <Icon.TextUnderline />,
        tooltip: {
          title: t('bubble_menu.underline.title'),
          description: '⌘+U'
        },
        onAction: () => editor.chain().focus().toggleUnderline().run()
      },
      {
        name: 'strike',
        icon: <Icon.Strikethrough />,
        tooltip: t('bubble_menu.strike.title') as string,
        onAction: () => editor.chain().focus().toggleStrike().run()
      }
    ]

    const textStyleGroup: ToolbarGroupOption = {
      type: 'group',
      items: textStyleItems.map(item => ({
        type: 'item',
        name: item.name,
        icon: item.icon,
        label: t(`bubble_menu.node.items.${item.name}`),
        onAction: item.onAction,
        active: editor.isActive(item.name),
        tooltip: item.tooltip
      }))
    }

    return textStyleGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
