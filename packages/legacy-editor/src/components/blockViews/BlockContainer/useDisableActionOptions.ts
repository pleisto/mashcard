import { Editor } from '@tiptap/core'
import { useMemo } from 'react'
import { BlockContainerProps } from './BlockContainer'
import { findParagraphWrapper } from '../../../extensions/extensions/placeholder/findWrapper'

export function useDisableActionOptions(
  editor: Editor | null | undefined,
  getPos: BlockContainerProps['getPos']
): boolean {
  return useMemo(() => {
    const blockResolvedPosition = editor?.state.doc.resolve(getPos?.() ?? 0)
    return !blockResolvedPosition ? true : !!findParagraphWrapper(blockResolvedPosition)
  }, [editor, getPos])
}
