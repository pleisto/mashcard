import { useCallback, useMemo } from 'react'
// @ts-expect-error
import { __serializeForClipboard } from 'prosemirror-view'
import { NodeSelection } from 'prosemirror-state'
import { Cutting, Link, Delete, CornerDownRight } from '@mashcard/design-icons'
import { BlockCommandItem } from '../../../helpers/block'
import * as BLOCK from '../../../helpers/block'
import { useDocumentEditable, useEditorContext, useEditorI18n } from '../../../hooks'
import { ActionGroupOption, ActionItemOption } from './BlockActions'
import { useBlockContext } from '../../../hooks/useBlockContext'
import { NodeIcon } from '../../../components/extensionViews/BubbleMenu/useBubbleMenuItems/useBubbleMenuItems'

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

export type BasicActionOptionType = 'delete' | 'cut' | 'copy' | 'transform'

export interface UseActionOptionsProps {
  types: BasicActionOptionType[]
}

const isClipboardWriteable = (): boolean => !!window.ClipboardItem

export function useBasicActionOptions({ types }: UseActionOptionsProps): ActionGroupOption | null {
  const [t] = useEditorI18n()
  const { deleteBlock, getPosition, contentForCopy, node } = useBlockContext()
  const { editor } = useEditorContext()
  const [documentEditable] = useDocumentEditable(undefined)

  const setNodeSelection = useCallback(() => {
    if (!editor) return false
    const position = getPosition()
    if (position === undefined) return false
    const selection = NodeSelection.create(editor.view.state.doc, position)
    const transaction = editor.view.state.tr.setSelection(selection)
    editor.view.dispatch(transaction)

    return true
  }, [editor, getPosition])

  const createActionOption = useCallback(
    (blockItem: BlockCommandItem): ActionItemOption => ({
      type: 'item',
      name: blockItem.key,
      label: t(`blocks.${blockItem.key}.label`),
      icon: <NodeIcon>{blockItem.icon}</NodeIcon>,
      onAction: () => {
        if (!setNodeSelection()) return
        blockItem.setBlock(editor!.chain()).run()
      }
    }),
    [editor, setNodeSelection, t]
  )

  const hasTextContent = (node?.textContent?.length ?? 0) > 0

  const copyBlock = useCallback(async () => {
    if (!setNodeSelection()) return false

    const slice = editor!.state.selection.content()
    const { dom, text } = __serializeForClipboard(editor!.view, slice)

    // copy block to clipboard
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([dom.innerHTML], { type: 'text/html' }),
        'text/plain': new Blob([contentForCopy ?? text], { type: 'text/plain' })
      })
    ])

    return true
  }, [contentForCopy, editor, setNodeSelection])

  return useMemo<ActionGroupOption | null>(() => {
    const group: ActionGroupOption = { type: 'group', items: [] }

    if (!documentEditable || types.length === 0) {
      return null
    }

    if (isClipboardWriteable() && types.includes('cut')) {
      group.items.push({
        label: t('block_actions.basic.cut'),
        name: 'cut',
        type: 'item',
        icon: <Cutting />,
        onAction: async () => {
          if (!(await copyBlock())) return
          deleteBlock()
        }
      })
    }

    if (isClipboardWriteable() && types.includes('copy')) {
      group.items.push({
        name: 'copy',
        label: t('block_actions.basic.copy'),
        type: 'item',
        icon: <Link />,
        onAction: copyBlock
      })
    }

    if (types.includes('delete'))
      group.items.push({
        label: t('block_actions.basic.delete'),
        name: 'delete',
        type: 'item',
        icon: <Delete />,
        onAction: deleteBlock
      })

    if (types.includes('transform') && hasTextContent) {
      group.items.push({
        label: t('block_actions.basic.transform'),
        name: 'transform',
        type: 'subMenu',
        icon: <CornerDownRight />,
        items: TRANS_TYPE_LIST.map(types => {
          return {
            type: 'group',
            items: types.items.map(item => createActionOption(item!))
          }
        })
      })
    }

    return group
  }, [copyBlock, createActionOption, deleteBlock, documentEditable, hasTextContent, t, types])
}
