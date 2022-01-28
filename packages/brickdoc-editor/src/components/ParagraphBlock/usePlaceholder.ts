import React from 'react'
import { Editor } from '@tiptap/core'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { EditorContext } from '../../context/EditorContext'
import { ParagraphBlockProps } from '.'
import { BlockContext } from '../../context/BlockContext'

export function usePlaceholder(editor: Editor, node: ProsemirrorNode, getPos: ParagraphBlockProps['getPos']): [string] {
  const { t } = React.useContext(EditorContext)
  const { insideList } = React.useContext(BlockContext)
  const [placeholder, setPlaceholder] = React.useState('')
  const nodeRef = React.useRef(node)
  React.useEffect(() => {
    nodeRef.current = node
  }, [node])

  React.useEffect(() => {
    if (insideList) return

    const listener = () => {
      const isEmpty = !nodeRef.current.isLeaf && nodeRef.current.childCount === 0
      const position = getPos()
      const anchor = editor.state.selection.anchor
      const hasAnchor = anchor >= position && anchor <= position + nodeRef.current.nodeSize
      if (hasAnchor && isEmpty) {
        setPlaceholder(t('placeholder'))
      } else {
        setPlaceholder('')
      }
    }

    listener()
    editor.on('selectionUpdate', listener)
    editor.on('update', listener)

    return () => {
      editor.off('selectionUpdate', listener)
      editor.off('update', listener)
    }
  }, [editor, getPos, insideList, t])

  return [insideList ? '' : placeholder]
}
