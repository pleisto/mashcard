import { useMemo } from 'react'
import { Icon } from '@mashcard/design-system'
import { ToolbarOption, ToolbarGroupOption } from '../../../ui'
import { BubbleItemMeta } from './useBubbleMenuItems'
import { isBubbleMenuVisible } from '../BubbleMenu'
import { useEditorContext, useEditorI18n } from '../../../../hooks'
import { useFontColorGroup } from './useFontColorGroup'

export function useTextStyleGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { editor } = useEditorContext()
  const [t] = useEditorI18n()
  const fontColorGroup = useFontColorGroup()
  const option = useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
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
    if (fontColorGroup) {
      textStyleGroup.items.push(fontColorGroup)
    }
    return textStyleGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
