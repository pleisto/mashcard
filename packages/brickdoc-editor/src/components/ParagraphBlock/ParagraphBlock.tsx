import React from 'react'
import { NodeViewContent, NodeViewProps } from '@tiptap/react'
import { css, theme } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { EditorContext } from '../../context/EditorContext'

export interface ParagraphBlockProps extends NodeViewProps {}

const placeholderStyle = css({
  '&:before': {
    color: theme.colors.typeThirdary,
    content: 'attr(data-placeholder)',
    fontSize: theme.fontSizes.body,
    fontWeight: 400,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translateY(-50%)',
    top: '50%',
    whiteSpace: 'nowrap'
  }
})

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ node, getPos, deleteNode, editor }) => {
  const { t } = React.useContext(EditorContext)
  const [placeholder, setPlaceholder] = React.useState('')

  editor.on('selectionUpdate', () => {
    const isEmpty = !node.isLeaf && node.childCount === 0
    const position = getPos()
    const anchor = editor.state.selection.anchor
    const hasAnchor = anchor >= position && anchor <= position + node.nodeSize
    if (hasAnchor && isEmpty) {
      setPlaceholder(t('placeholder'))
    } else {
      setPlaceholder('')
    }
  })

  const placeholderClassName = React.useMemo(() => placeholderStyle().className, [])

  return (
    <BlockContainer
      getPos={getPos}
      deleteNode={deleteNode}
      contentForCopy={node.textContent}
      style={{ position: 'relative' }}
      actionOptions={['copy', 'delete']}>
      <NodeViewContent data-placeholder={placeholder} as="p" className={placeholderClassName} />
    </BlockContainer>
  )
}
