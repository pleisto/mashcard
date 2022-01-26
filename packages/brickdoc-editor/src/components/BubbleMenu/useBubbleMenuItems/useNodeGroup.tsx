import React from 'react'
import { EditorContext } from '../../../context/EditorContext'
import { ToolbarOption, ToolbarGroupOption } from '../../Toolbar'
import { BLOCK, BlockCommandItem, findFirstSelectedNodes, ORDER_TOGGLE_BLOCK } from '../../../helpers'
import { isBubbleMenuVisible, NodeIcon } from './useBubbleMenuItems'
import { theme } from '@brickdoc/design-system'

const blockItems: BlockCommandItem[] = ORDER_TOGGLE_BLOCK.map(
  key => Object.values(BLOCK).find(block => block.key === key)!
)

export function useNodeGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { t, editor } = React.useContext(EditorContext)

  const option = React.useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const { nodeKey } = findFirstSelectedNodes(editor)

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
              items: blockItems.map(item => ({
                type: 'item',
                name: item.key,
                active: nodeKey === item.key,
                label: t(`blocks.${item.key}.label`),
                icon: <NodeIcon>{React.cloneElement(item.icon, { fill: [theme.colors.iconPrimary.value] })}</NodeIcon>,
                onAction: () => {
                  if (!editor) return
                  item.setBlock(editor.chain()).setTextSelection(editor.state.selection.to).focus().run()
                }
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
