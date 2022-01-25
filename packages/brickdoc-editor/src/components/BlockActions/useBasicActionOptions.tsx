import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { BlockContext } from '../../context/BlockContext'
import { EditorContext } from '../../context/EditorContext'
import { useDocumentEditable } from '../../hooks'
import { ActionItemGroupOption } from './BlockActions'

export type BasicActionOptionType = 'delete' | 'duplicate' | 'copy' | 'move'

export interface UseActionOptionsProps {
  types: BasicActionOptionType[]
}

export function useBasicActionOptions({ types }: UseActionOptionsProps): ActionItemGroupOption | null {
  const { deleteBlock, duplicateBlock, copyContent, moveBlock } = React.useContext(BlockContext)
  const { t } = React.useContext(EditorContext)
  const [documentEditable] = useDocumentEditable(undefined)

  return React.useMemo<ActionItemGroupOption | null>(() => {
    const group: ActionItemGroupOption = { type: 'group', items: [] }

    if (!documentEditable || types.length === 0) {
      return null
    }

    if (types.includes('duplicate')) {
      group.items.push({
        label: t('block_actions.basic.duplicate'),
        name: 'duplicate',
        type: 'item',
        icon: <Icon.Copy />,
        onAction: duplicateBlock
      })
    }

    if (types.includes('copy')) {
      group.items.push({
        name: 'copy',
        label: t('block_actions.basic.copy'),
        type: 'item',
        icon: <Icon.Link />,
        onAction: copyContent
      })
    }

    if (types.includes('move')) {
      group.items.push({
        label: t('block_actions.basic.move'),
        name: 'move',
        type: 'item',
        icon: <Icon.MoveIn />,
        onAction: moveBlock
      })
    }

    if (types.includes('delete'))
      group.items.push({
        label: t('block_actions.basic.delete'),
        name: 'delete',
        type: 'item',
        icon: <Icon.Delete />,
        onAction: deleteBlock
      })

    return group
  }, [copyContent, deleteBlock, documentEditable, duplicateBlock, moveBlock, t, types])
}
