import React from 'react'
import { EditorContext } from '../../../context/EditorContext'
import {} from './ParagraphView'
import { BlockContext } from '../../../context/BlockContext'
import { ParagraphViewProps } from '../../../extensions/blocks/paragraph/meta'

export function usePlaceholder(
  editor: ParagraphViewProps['editor'],
  node: ParagraphViewProps['node'],
  getPos: ParagraphViewProps['getPos']
): [string] {
  const { t } = React.useContext(EditorContext)
  const { insideList } = React.useContext(BlockContext)
  const [placeholder, setPlaceholder] = React.useState('')
  const nodeRef = React.useRef(node)
  React.useEffect(() => {
    nodeRef.current = node
  }, [node])

  React.useEffect(() => {
    if (insideList) return

    const listener = (): void => {
      // TODO: remove this setTimeout
      setTimeout(() => {
        const isEmpty = !nodeRef.current.isLeaf && nodeRef.current.childCount === 0
        const position = getPos()
        const anchor = editor.state.selection.anchor
        const hasAnchor = anchor >= position && anchor <= position + nodeRef.current.nodeSize
        if (hasAnchor && isEmpty) {
          setPlaceholder(t('placeholder'))
        } else {
          setPlaceholder('')
        }
      }, 50)
    }

    listener()
    editor.on('selectionUpdate', listener).on('update', listener)

    return () => {
      editor.off('selectionUpdate', listener).off('update', listener)
    }
  }, [editor, getPos, insideList, t])

  return [insideList ? '' : placeholder]
}
