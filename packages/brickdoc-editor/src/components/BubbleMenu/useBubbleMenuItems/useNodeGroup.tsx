import React from 'react'
import { ChainedCommands } from '@tiptap/core'
import { Icon } from '@brickdoc/design-system'
import { EditorContext } from '../../../context/EditorContext'
import { ToolbarOption, ToolbarGroupOption } from '../../Toolbar'
import { findFirstSelectedNodes } from '../../../helpers'
import { BubbleItemMeta, isBubbleMenuVisible, NodeIcon } from './useBubbleMenuItems'

export function useNodeGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { t, editor } = React.useContext(EditorContext)
  const actionCommand = React.useCallback(
    (command: (chain: ChainedCommands) => ChainedCommands): void => {
      if (!editor) return
      command(editor.chain()).setTextSelection(editor.state.selection.to).focus().run()
    },
    [editor]
  )

  const option = React.useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const { nodeKey } = findFirstSelectedNodes(editor)
    const nodeItems: BubbleItemMeta[] = [
      {
        name: 'paragraph',
        icon: <Icon.TextStyle />,
        onAction: () => actionCommand(chain => chain.setParagraph())
      },
      {
        name: 'heading1',
        icon: <Icon.RteH1 />,
        onAction: () => actionCommand(chain => chain.setHeading({ level: 1 }))
      },
      {
        name: 'heading2',
        icon: <Icon.RteH2 />,
        onAction: () => actionCommand(chain => chain.setHeading({ level: 2 }))
      },
      {
        name: 'heading3',
        icon: <Icon.RteH3 />,
        onAction: () => actionCommand(chain => chain.setHeading({ level: 3 }))
      },
      {
        name: 'heading4',
        icon: <Icon.RteH4 />,
        onAction: () => actionCommand(chain => chain.setHeading({ level: 4 }))
      },
      {
        name: 'heading5',
        icon: <Icon.RteH5 />,
        onAction: () => actionCommand(chain => chain.setHeading({ level: 5 }))
      },
      {
        name: 'bulletList',
        icon: <Icon.ListUnordered />,
        onAction: () => actionCommand(chain => chain.toggleBulletList())
      },
      {
        name: 'orderedList',
        icon: <Icon.ListOrdered />,
        onAction: () => actionCommand(chain => chain.toggleOrderedList())
      },
      {
        name: 'formulaBlock',
        icon: <Icon.Formula />,
        onAction: () => actionCommand(chain => chain.toggleFormula())
      }
    ]

    const nodeGroup: ToolbarGroupOption = {
      type: 'group',
      items: [
        {
          type: 'subMenu',
          name: 'node',
          label: t(`bubble_menu.node.items.${nodeKey ?? 'paragraph'}`),
          tooltip: t('bubble_menu.node.section_title') as string,
          items: [
            {
              type: 'group',
              title: t('bubble_menu.node.section_title'),
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
