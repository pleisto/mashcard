import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { BlockContext } from '../../context/BlockContext'
import { ActionItemOption, ActionItemOptionGroup } from './BlockActions'
import { EditorContext } from '../../context/EditorContext'

export type BasicActionOptionType = 'delete' | 'duplicate' | 'copy' | 'move'

export interface UseActionOptionsProps {
  types: BasicActionOptionType[]
}

export function useBasicActionOptions({ types }: UseActionOptionsProps): ActionItemOptionGroup | null {
  const { deleteBlock, duplicateBlock, copyContent, moveBlock } = React.useContext(BlockContext)
  const { t } = React.useContext(EditorContext)

  return React.useMemo<ActionItemOptionGroup | null>(() => {
    const group: ActionItemOptionGroup = []
    const normalGroup: ActionItemOption[] = []

    if (types.length === 0) {
      return null
    }

    if (types.includes('duplicate')) {
      normalGroup.push({
        label: t('block_actions.basic.duplicate'),
        name: 'duplicate',
        type: 'item',
        icon: <Icon.Copy />,
        onAction: duplicateBlock,
        closeOnAction: true
      })
    }

    if (types.includes('copy')) {
      normalGroup.push({
        name: 'copy',
        label: t('block_actions.basic.copy'),
        type: 'item',
        icon: <Icon.Link />,
        onAction: copyContent,
        closeOnAction: true
      })
    }

    if (types.includes('move')) {
      normalGroup.push({
        label: t('block_actions.basic.move'),
        name: 'move',
        type: 'item',
        icon: <Icon.MoveIn />,
        onAction: moveBlock,
        closeOnAction: true
      })
    }

    if (normalGroup.length > 0) {
      group.push(normalGroup)
    }

    if (types.includes('delete'))
      group.push({
        label: t('block_actions.basic.delete'),
        name: 'delete',
        type: 'item',
        icon: <Icon.Delete />,
        onAction: deleteBlock,
        closeOnAction: true
      })

    return group
  }, [copyContent, deleteBlock, duplicateBlock, moveBlock, t, types])
}
