import { findParentNode } from '@tiptap/react'
import { RefObject, useEffect, useRef } from 'react'
import { BulletList, OrderedList } from '../../../extensions'
import { ParagraphViewProps } from '../../../extensions/blocks/paragraph/meta'
import { useDocumentEditable, useEditorI18n } from '../../../hooks'

// eslint-disable-next-line max-params
export function usePlaceholder(
  editor: ParagraphViewProps['editor'],
  extension: ParagraphViewProps['extension'],
  node: ParagraphViewProps['node'],
  blockContainerRef: RefObject<HTMLDivElement>,
  getPos: ParagraphViewProps['getPos']
): void {
  const [t] = useEditorI18n()
  const placeholderText = extension?.options?.placeholder ?? t('placeholder') ?? ''
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

      const insideList = !!findParentNode(
        node => node.type.name === BulletList.name || node.type.name === OrderedList.name
      )(editor.state.selection)?.node

      const needPlaceholder = hasAnchor && isEmpty && documentEditable && !insideList
      paragraphElement?.setAttribute('data-placeholder', needPlaceholder ? placeholderText : '')
    }

    listener()
    editor.on('selectionUpdate', listener).on('update', listener).on('focus', listener)

    return () => {
      editor.off('selectionUpdate', listener).off('update', listener).off('focus', listener)
    }
  }, [blockContainerRef, editor, getPos, placeholderText, t])
}
