import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { EditorContext } from '../../../context/EditorContext'
import { ToolbarOption, ToolbarGroupOption } from '../../Toolbar'
import { findFirstSelectedNodes } from '../../../helpers'
import { BubbleItemMeta, isBubbleMenuVisible, NodeIcon } from './useBubbleMenuItems'

export function useNodeGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { t, editor } = React.useContext(EditorContext)

  const option = React.useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const { nodeKey } = findFirstSelectedNodes(editor)
    const nodeItems: BubbleItemMeta[] = [
      {
        name: 'paragraph',
        icon: <Icon.TextStyle />,
        onAction: () => editor.commands.setParagraph()
      },
      {
        name: 'heading1',
        icon: <Icon.RteH1 />,
        onAction: () => editor.commands.setHeading({ level: 1 })
      },
      {
        name: 'heading2',
        icon: <Icon.RteH2 />,
        onAction: () => editor.commands.setHeading({ level: 2 })
      },
      {
        name: 'heading3',
        icon: <Icon.RteH3 />,
        onAction: () => editor.commands.setHeading({ level: 3 })
      },
      {
        name: 'heading4',
        icon: <Icon.RteH4 />,
        onAction: () => editor.commands.setHeading({ level: 4 })
      },
      {
        name: 'heading5',
        icon: <Icon.RteH5 />,
        onAction: () => editor.commands.setHeading({ level: 5 })
      },
      {
        name: 'bulletList',
        icon: <Icon.ListUnordered />,
        onAction: () => editor.commands.toggleBulletList()
      },
      {
        name: 'orderedList',
        icon: <Icon.ListOrdered />,
        onAction: () => editor.commands.toggleOrderedList()
      },
      {
        name: 'formulaBlock',
        icon: <Icon.Formula />,
        onAction: () => editor.commands.toggleFormula()
      }
    ]

    const nodeGroup: ToolbarGroupOption = {
      type: 'group',
      items: [
        {
          type: 'dropdown',
          name: 'node',
          label: t(`bubble_menu.node.items.${nodeKey ?? 'paragraph'}`),
          tooltip: t('bubble_menu.node.Group_title') as string,
          items: [
            {
              type: 'group',
              title: t('bubble_menu.node.Group_title'),
              items: nodeItems.map(item => ({
                type: 'item',
                name: item.name,
                icon: <NodeIcon>{item.icon}</NodeIcon>,
                label: t(`bubble_menu.node.items.${item.name}`),
                onAction: item.onAction,
                active: nodeKey === item.name
              }))
            }
          ]
        }
      ]
    }

    return nodeGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
