import { RefObject, useEffect, useRef } from 'react'
import { ParagraphViewProps } from '../../../extensions/blocks/paragraph/meta'
import { useDocumentEditable, useEditorI18n } from '../../../hooks'
import { findWrapper } from './wrapper'

export function usePlaceholder({
  editor,
  extension,
  node,
  blockContainerRef,
  getPos
}: ParagraphViewProps & {
  blockContainerRef: RefObject<HTMLDivElement>
}): void {
  const [t] = useEditorI18n()
  const [documentEditable] = useDocumentEditable(undefined)
  const dataRef = useRef({ node, documentEditable })

  useEffect(() => {
    dataRef.current = {
      node,
      documentEditable
    }
  }, [documentEditable, node])

  useEffect(() => {
    if (!documentEditable) {
      const paragraphElement = blockContainerRef.current?.querySelector('p[data-node-view-content]')
      paragraphElement?.setAttribute('data-placeholder', '')
    }
  }, [blockContainerRef, documentEditable])

  useEffect(() => {
    const listener = (): void => {
      const { node, documentEditable } = dataRef.current
      const paragraphElement = blockContainerRef.current?.querySelector('p[data-node-view-content]')

      const isEmpty = (paragraphElement?.textContent?.length ?? 0) === 0
      const position = getPos()
      const anchor = editor.state.selection.anchor
      const hasAnchor = anchor >= position && anchor <= position + node.nodeSize

      const needPlaceholder = hasAnchor && isEmpty && documentEditable

      if (needPlaceholder) {
        const wrapper = findWrapper(editor.state.selection.$anchor)

        const placeholderText = wrapper
          ? t(`placeholder.${wrapper?.type.name ?? 'default'}`)
          : extension?.options?.placeholder ?? t('placeholder.default') ?? ''

        paragraphElement?.setAttribute('data-placeholder', needPlaceholder ? placeholderText : '')
      } else {
        paragraphElement?.setAttribute('data-placeholder', '')
      }
    }

    listener()
    editor.on('selectionUpdate', listener).on('update', listener).on('focus', listener)

    return () => {
      editor.off('selectionUpdate', listener).off('update', listener).off('focus', listener)
    }
  }, [blockContainerRef, editor, extension?.options?.placeholder, getPos, t])
}
