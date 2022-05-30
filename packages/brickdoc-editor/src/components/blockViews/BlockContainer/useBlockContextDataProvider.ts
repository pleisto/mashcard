import { useMemo } from 'react'
import { toast } from '@brickdoc/design-system'
import { BlockContainerProps } from '.'
import { BlockContextData } from '../../../context/BlockContext'
import { useEditorI18n } from '../../../hooks'

export interface UseBlockContextDataProviderProps {
  deleteNode?: BlockContainerProps['deleteNode']
  getPos: BlockContainerProps['getPos']
  contentForCopy?: BlockContainerProps['contentForCopy']
  dragging: boolean
  updateDragging: (dragging: boolean) => void
  node: BlockContainerProps['node']
}

export function useBlockContextDataProvider({
  deleteNode,
  getPos,
  contentForCopy,
  dragging,
  updateDragging,
  node
}: UseBlockContextDataProviderProps): [BlockContextData] {
  const [t] = useEditorI18n()
  const data = useMemo<BlockContextData>(
    () => ({
      deleteBlock: () => deleteNode?.(),
      getPosition: () => getPos?.(),
      copyContent: async () => {
        await navigator.clipboard.writeText(contentForCopy ?? '')
        void toast.success(t('copy_hint'))
      },
      updateDraggingStatus: updateDragging,
      dragging,
      node
    }),
    [contentForCopy, deleteNode, dragging, getPos, node, t, updateDragging]
  )

  return [data]
}
