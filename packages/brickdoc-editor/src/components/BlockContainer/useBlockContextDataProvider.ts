import React from 'react'
import { message } from '@brickdoc/design-system'
import { BlockContainerProps } from '.'
import { BlockContextData } from '../../context/BlockContext'
import { EditorContext } from '../../context/EditorContext'

export interface UseBlockContextDataProviderProps {
  deleteNode?: BlockContainerProps['deleteNode']
  contentForCopy?: BlockContainerProps['contentForCopy']
}

export function useBlockContextDataProvider({
  deleteNode,
  contentForCopy
}: UseBlockContextDataProviderProps): [BlockContextData] {
  const { t } = React.useContext(EditorContext)
  const data = React.useMemo<BlockContextData>(
    () => ({
      deleteBlock: () => deleteNode?.(),
      duplicateBlock() {},
      moveBlock() {},
      copyContent: async () => {
        await navigator.clipboard.writeText(contentForCopy ?? '')
        void message.success(t('copy_hint'))
      }
    }),
    [contentForCopy, deleteNode, t]
  )

  return [data]
}
