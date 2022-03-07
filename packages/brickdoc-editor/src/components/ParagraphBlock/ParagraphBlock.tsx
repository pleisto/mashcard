import React from 'react'
import { NodeViewContent, NodeViewProps } from '@tiptap/react'
import { css, theme } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { usePlaceholder } from './usePlaceholder'

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

const Paragraph: React.FC<ParagraphBlockProps> = ({ node, getPos, editor }) => {
  const [placeholder] = usePlaceholder(editor, node, getPos)
  const placeholderClassName = React.useMemo(() => placeholderStyle().className, [])

  return <NodeViewContent draggable={false} data-placeholder={placeholder} as="p" className={placeholderClassName} />
}

export const ParagraphBlock: React.FC<ParagraphBlockProps> = props => {
  const { node, getPos, deleteNode } = props
  return (
    <BlockContainer
      getPos={getPos}
      deleteNode={deleteNode}
      contentForCopy={node.textContent}
      style={{ position: 'relative' }}
      actionOptions={['copy', 'delete', 'transform']}
    >
      <Paragraph {...props} />
    </BlockContainer>
  )
}
