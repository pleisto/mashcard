import { useEffect, useRef, useState } from 'react'
import { ParagraphViewProps } from '../../../extensions/blocks/paragraph/meta'
import { useBlockContext, useEditorContext } from '../../../hooks'

export function usePlaceholder(
  editor: ParagraphViewProps['editor'],
  extension: ParagraphViewProps['extension'],
  node: ParagraphViewProps['node'],
  getPos: ParagraphViewProps['getPos']
): [string] {
  const { t } = useEditorContext()
  const { insideList } = useBlockContext()
  const [placeholder, setPlaceholder] = useState('')

  const placeholderText = extension?.options?.placeholder ?? t('placeholder')

  const nodeRef = useRef(node)
  useEffect(() => {
    nodeRef.current = node
  }, [node])

  useEffect(() => {
    if (insideList) return

    const listener = (): void => {
      // TODO: remove this setTimeout
      setTimeout(() => {
        if (placeholderText && placeholderText?.length > 0) {
          const isEmpty = !nodeRef.current.isLeaf && nodeRef.current.childCount === 0
          const position = getPos()
          const anchor = editor.state.selection.anchor
          const hasAnchor = anchor >= position && anchor <= position + nodeRef.current.nodeSize
          if (hasAnchor && isEmpty) {
            setPlaceholder(placeholderText)
          } else {
            setPlaceholder('')
          }
        }
      }, 50)
    }

    listener()
    editor.on('selectionUpdate', listener).on('update', listener)

    return () => {
      editor.off('selectionUpdate', listener).off('update', listener)
    }
  }, [editor, getPos, insideList, placeholderText])

  return [insideList ? '' : placeholder]
}
