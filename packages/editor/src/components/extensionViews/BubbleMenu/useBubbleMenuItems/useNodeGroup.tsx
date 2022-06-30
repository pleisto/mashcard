import { useMemo } from 'react'
import { ToolbarOption, ToolbarGroupOption } from '../../../ui'
import { findFirstSelectedNodes } from '../../../../helpers/selection'

import * as BLOCK from '../../../../helpers/block'
import { isBubbleMenuVisible } from '../BubbleMenu'
import { NodeIcon } from './useBubbleMenuItems'
import { useEditorContext, useEditorI18n } from '../../../../hooks'

const TRANS_TYPE_LIST = [
  { type: 'normal', items: [BLOCK.PARAGRAPH] },
  { type: 'heading', items: [BLOCK.HEADING_1, BLOCK.HEADING_2, BLOCK.HEADING_3, BLOCK.HEADING_4, BLOCK.HEADING_5] },
  {
    type: 'block',
    items: [
      BLOCK.ORDERED_LIST,
      BLOCK.BULLETED_LIST,
      BLOCK.TASK_LIST,
      BLOCK.FORMULA,
      BLOCK.CODE,
      BLOCK.BLOCKQUOTE,
      BLOCK.CALLOUT
    ]
  }
]

export function useNodeGroup(): [ToolbarOption | ToolbarGroupOption | null] {
  const [t] = useEditorI18n()
  const { editor } = useEditorContext()

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
          items: TRANS_TYPE_LIST.map(blocks => {
            return {
              type: 'group',
              items: blocks.items.map(item => ({
                type: 'item',
                name: item.key,
                active: nodeKey === item.key,
                label: t(`blocks.${item.key}.label`),
                icon: <NodeIcon>{item.icon}</NodeIcon>,
                onAction: () => {
                  if (!editor) return
                  item.setBlock(editor.chain()).setTextSelection(editor.state.selection.to).focus().run()
                }
              }))
            }
          })
        }
      ]
    }

    return nodeGroup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}
