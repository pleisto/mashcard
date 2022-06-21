import { cloneElement, useMemo } from 'react'
import { theme } from '@mashcard/design-system'
import { ToolbarOption, ToolbarGroupOption } from '../../../ui'
import { findFirstSelectedNodes } from '../../../../helpers/selection'
import { BlockCommandItem } from '../../../../helpers/block'
import * as BLOCK from '../../../../helpers/block'
import { isBubbleMenuVisible } from '../BubbleMenu'
import { NodeIcon } from './useBubbleMenuItems'
import { useEditorContext, useEditorI18n } from '../../../../hooks'

const blockItems: BlockCommandItem[] = [
  BLOCK.PARAGRAPH,
  BLOCK.HEADING_1,
  BLOCK.HEADING_2,
  BLOCK.HEADING_3,
  BLOCK.HEADING_4,
  BLOCK.HEADING_5,
  BLOCK.ORDERED_LIST,
  BLOCK.BULLETED_LIST,
  BLOCK.TASK_LIST,
  BLOCK.FORMULA,
  BLOCK.CODE,
  BLOCK.BLOCKQUOTE,
  BLOCK.CALLOUT
]

export function useNodeGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const { editor } = useEditorContext()
  const [t] = useEditorI18n()

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
          trigger: 'hover',
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
