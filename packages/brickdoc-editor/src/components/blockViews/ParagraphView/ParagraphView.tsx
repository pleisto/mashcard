import { FC, useRef } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { css, cx, theme } from '@brickdoc/design-system'
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

const paragraphStyles = css({
  minWidth: '1em'
})

export const ParagraphView: FC<ParagraphViewProps> = props => {
  const { node, getPos, deleteNode, editor, extension } = props
  const blockContainerRef = useRef<HTMLDivElement>(null)
  usePlaceholder(editor, extension, node, blockContainerRef, getPos)
  const placeholderClassName = placeholderStyle()
  const paragraphClassName = paragraphStyles()

  return (
    <BlockContainer
      node={node}
      getPos={getPos}
      editable="custom"
      deleteNode={deleteNode}
      style={{ position: 'relative' }}
      ref={blockContainerRef}
      actionOptions={['cut', 'copy', 'delete', 'transform']}>
      <NodeViewContent
        draggable={false}
        data-placeholder=""
        as="p"
        className={cx(placeholderClassName, paragraphClassName)}
      />
    </BlockContainer>
  )
}
