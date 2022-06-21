import { useMemo } from 'react'
import { BlockContainerProps } from '.'
import { BlockContextData } from '../../../context/BlockContext'

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
  const data = useMemo<BlockContextData>(
    () => ({
      deleteBlock: () => deleteNode?.(),
      getPosition: () => getPos?.(),
      contentForCopy,
      updateDraggingStatus: updateDragging,
      dragging,
      node
    }),
    [contentForCopy, deleteNode, dragging, getPos, node, updateDragging]
  )

  return [data]
}
