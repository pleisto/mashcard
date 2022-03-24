import { useContext, useMemo } from 'react'
import { toast } from '@brickdoc/design-system'
import { BlockContainerProps } from '.'
import { BlockContextData } from '../../../context/BlockContext'
import { EditorContext } from '../../../context/EditorContext'

export interface UseBlockContextDataProviderProps {
  deleteNode?: BlockContainerProps['deleteNode']
  getPos: BlockContainerProps['getPos']
  contentForCopy?: BlockContainerProps['contentForCopy']
  insideList: boolean
  dragging: boolean
  updateDragging: (dragging: boolean) => void
  node: BlockContainerProps['node']
}

export function useBlockContextDataProvider({
  deleteNode,
  getPos,
  contentForCopy,
  insideList,
  dragging,
  updateDragging,
  node
}: UseBlockContextDataProviderProps): [BlockContextData] {
  const { t } = useContext(EditorContext)
  const data = useMemo<BlockContextData>(
    () => ({
      deleteBlock: () => deleteNode?.(),
      duplicateBlock() {},
      moveBlock() {},
      getPosition: () => getPos?.(),
      copyContent: async () => {
        await navigator.clipboard.writeText(contentForCopy ?? '')
        void toast.success(t('copy_hint'))
      },
      updateDraggingStatus: updateDragging,
      insideList,
      dragging,
      node
    }),
    [contentForCopy, deleteNode, dragging, getPos, insideList, node, t, updateDragging]
  )

  return [data]
}
