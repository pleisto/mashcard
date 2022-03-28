import { FC, useMemo, useRef } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { css, theme } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { usePlaceholder } from './usePlaceholder'
import { ParagraphViewProps } from '../../../extensions/blocks/paragraph/meta'

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

export const ParagraphView: FC<ParagraphViewProps> = props => {
  const { node, getPos, deleteNode, editor, extension } = props
  const blockContainerRef = useRef<HTMLDivElement>(null)
  usePlaceholder(editor, extension, node, blockContainerRef, getPos)
  const placeholderClassName = useMemo(() => placeholderStyle().className, [])

  return (
    <BlockContainer
      node={node}
      getPos={getPos}
      deleteNode={deleteNode}
      contentForCopy={node.textContent}
      style={{ position: 'relative' }}
      ref={blockContainerRef}
      actionOptions={['copy', 'delete', 'transform']}>
      <NodeViewContent draggable={false} data-placeholder="" as="p" className={placeholderClassName} />
    </BlockContainer>
  )
}
