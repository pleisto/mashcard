import { Editor } from '@tiptap/react'
import { useMemo } from 'react'
import { BlockContainerProps } from './BlockContainer'
import { findWrapper } from '../ParagraphView/wrapper'

export function useDisableActionOptions(
  editor: Editor | null | undefined,
  getPos: BlockContainerProps['getPos']
): boolean {
  return useMemo(() => {
    const blockResolvedPosition = editor?.state.doc.resolve(getPos?.() ?? 0)
    return !blockResolvedPosition ? true : !!findWrapper(blockResolvedPosition)
  }, [editor, getPos])
}
