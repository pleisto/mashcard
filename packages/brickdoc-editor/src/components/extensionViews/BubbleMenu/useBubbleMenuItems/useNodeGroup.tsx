import { cloneElement, useMemo } from 'react'
import { theme } from '@brickdoc/design-system'
import { ToolbarOption, ToolbarGroupOption } from '../../../ui'
import { findFirstSelectedNodes } from '../../../../helpers/selection'
import { BLOCK, BlockCommandItem, ORDER_TOGGLE_BLOCK } from '../../../../helpers/block'
import { isBubbleMenuVisible } from '../BubbleMenu'
import { NodeIcon } from './useBubbleMenuItems'
import { useEditorContext } from '../../../../hooks'

const blockItems: BlockCommandItem[] = ORDER_TOGGLE_BLOCK.map(
  key => Object.values(BLOCK).find(block => block.key === key)!
)

export function useNodeGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { t, editor } = useEditorContext()

  const option = useMemo<ToolbarOption | ToolbarGroupOption | null>(() => {
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
                icon: <NodeIcon>{cloneElement(item.icon, { fill: [theme.colors.iconPrimary.value] })}</NodeIcon>,
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
