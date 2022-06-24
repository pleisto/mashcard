import { FC } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { css, cx, theme } from '@mashcard/design-system'
import { BlockContainer } from '../BlockContainer'
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
  const { node, getPos, deleteNode, extension } = props
  const placeholderClassName = placeholderStyle()
  const paragraphClassName = paragraphStyles()

  return (
    <BlockContainer
      node={node}
      getPos={getPos}
      editable="custom"
      deleteNode={deleteNode}
      style={{ position: 'relative' }}
      actionOptions={['cut', 'copy', 'delete', 'transform']}>
      <NodeViewContent
        {...extension.options.HTMLAttributes}
        draggable={false}
        data-placeholder=""
        as="p"
        className={cx(placeholderClassName, paragraphClassName)}
      />
    </BlockContainer>
  )
}
