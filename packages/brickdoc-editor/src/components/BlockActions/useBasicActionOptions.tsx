import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { BlockContext } from '../../context/BlockContext'
import { ActionItemOption, ActionItemOptionGroup } from './BlockActions'

export type BasicActionOptionType = 'delete' | 'duplicate' | 'copy' | 'move'

export interface UseActionOptionsProps {
  types: BasicActionOptionType[]
}

export function useBasicActionOptions({ types }: UseActionOptionsProps): ActionItemOptionGroup | null {
  const { deleteBlock, duplicateBlock, copyContent, moveBlock } = React.useContext(BlockContext)

  return React.useMemo<ActionItemOptionGroup | null>(() => {
    const group: ActionItemOptionGroup = []
    const normalGroup: ActionItemOption[] = []

    if (types.length === 0) {
      return null
    }

    if (types.includes('duplicate')) {
      normalGroup.push({
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
        type: 'item',
        icon: <Icon.Link />,
        onAction: copyContent,
        closeOnAction: true
      })
    }

    if (types.includes('move')) {
      normalGroup.push({
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
        name: 'delete',
        type: 'item',
        icon: <Icon.Delete />,
        onAction: deleteBlock,
        closeOnAction: true
      })

    return group
  }, [copyContent, deleteBlock, duplicateBlock, moveBlock, types])
}
