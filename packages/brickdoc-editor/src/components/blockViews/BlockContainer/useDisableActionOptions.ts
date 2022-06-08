import { Editor, findParentNodeClosestToPos } from '@tiptap/react'
import { useMemo } from 'react'
import { meta as listItemMeta } from '../../../extensions/blocks/listItem/meta'
import { meta as taskItemMeta } from '../../../extensions/blocks/taskItem/meta'
import { meta as blockquoteMeta } from '../../../extensions/blocks/blockquote/meta'
import { BlockContainerProps } from './BlockContainer'

const disabledList = [listItemMeta.name, taskItemMeta.name, blockquoteMeta.name]

export function useDisableActionOptions(
  editor: Editor | null | undefined,
  getPos: BlockContainerProps['getPos']
): boolean {
  return useMemo(() => {
    const blockResolvedPosition = editor?.state.doc.resolve(getPos?.() ?? 0)

    return !blockResolvedPosition
      ? true
      : !!findParentNodeClosestToPos(blockResolvedPosition, node => disabledList.includes(node.type.name))?.node
  }, [editor, getPos])
}
