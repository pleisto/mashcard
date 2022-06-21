import { useMemo } from 'react'
import { ToolbarOption, ToolbarGroupOption } from '../../../ui'
import { findFirstSelectedNodes } from '../../../../helpers/selection'

import { TRANS_TYPE_LIST } from '../../../../helpers/blockConstant'
import { isBubbleMenuVisible } from '../BubbleMenu'
import { NodeIcon } from './useBubbleMenuItems'
import { useEditorContext, useEditorI18n } from '../../../../hooks'

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
