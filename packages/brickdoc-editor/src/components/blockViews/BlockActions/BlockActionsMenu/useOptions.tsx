import { cloneElement, useCallback, useMemo } from 'react'
import { ToolbarItemOption, ToolbarOptionGroup } from '../../../ui'
import { BlockActionsMenuProps, blockIconStyle } from './BlockActionsMenu'
import { BlockContextData } from '../../../../context/BlockContext'
import { BlockCommandItem } from '../../../../helpers/block'
import * as BLOCK from '../../../../helpers/block'
import { Editor } from '@tiptap/core'
import { useBlockContext, useEditorContext, useEditorI18n } from '../../../../hooks'

const getEndPosition = (editor: Editor, getPosition: BlockContextData['getPosition']): number | undefined => {
  const position = getPosition()

  if (position === undefined) return
  const node = editor?.state.doc.nodeAt(position)
  if (!node) return
  const nodeSize = node.nodeSize

  return position + nodeSize
}

export function useOptions(
  extraOptions: BlockActionsMenuProps['extraOptions'],
  basicOptions: BlockActionsMenuProps['basicOptions']
): [ToolbarOptionGroup, ToolbarOptionGroup] {
  const { editor } = useEditorContext()
  const [t] = useEditorI18n()
  const { getPosition } = useBlockContext()

  const options = useMemo<ToolbarOptionGroup>(() => {
    let value: ToolbarOptionGroup = extraOptions ?? []
    if (basicOptions) value = [...value, basicOptions]
    return value
  }, [basicOptions, extraOptions])

  const createToolbarItem = useCallback(
    (blockItem: BlockCommandItem): ToolbarItemOption => ({
      type: 'item',
      name: blockItem.key,
      label: t(`blocks.${blockItem.key}.label`),
      icon: cloneElement(blockItem.squareIcon, { className: blockIconStyle() }),
      closeOnAction: true,
      onAction: () => {
        if (!editor) return

        const position = getEndPosition(editor, getPosition)
        if (position === undefined) return

        blockItem.insertBlockAt(editor.chain(), position).focus().scrollIntoView().run()
      }
    }),
    [editor, getPosition, t]
  )

  const blockOptions = useMemo<ToolbarOptionGroup>(
    () => [
      {
        type: 'group',
        items: [
          BLOCK.PARAGRAPH,
          BLOCK.FORMULA,
          BLOCK.SPREADSHEET,
          BLOCK.UPLOAD,
          BLOCK.GALLERY,
          BLOCK.LINK,
          BLOCK.HEADING_1,
          BLOCK.HEADING_2,
          BLOCK.HEADING_3,
          BLOCK.HEADING_4,
          BLOCK.HEADING_5,
          BLOCK.BULLETED_LIST,
          BLOCK.ORDERED_LIST,
          BLOCK.TASK_LIST,
          BLOCK.CODE,
          BLOCK.BLOCKQUOTE,
          BLOCK.DIVIDER,
          BLOCK.TOC,
          BLOCK.SUB_PAGE_MENU
        ].map(createToolbarItem)
      }
    ],
    [createToolbarItem]
  )

  return [options, blockOptions]
}
