import { FC } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'
import { BlockViewProps } from '../../../extensions/common'
import { useEditorI18n } from '../../../hooks'
import { css, theme } from '@mashcard/design-system'

const placeholderStyle = css({
  '&:before': {
    color: theme.colors.typeDisabled,
    content: 'attr(data-placeholder)',
    fontWeight: 400,
    left: 'calc(1rem+2px)',
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translateY(-50%)',
    top: '50%',
    whiteSpace: 'nowrap'
  }
})

export const BlockquoteView: FC<BlockViewProps<{}, {}>> = ({ deleteNode, node, getPos }) => {
  const [t] = useEditorI18n()
  const isEmpty = node.textContent.length === 0
  const placeholder = isEmpty ? t(`placeholder.blockquote`) : ''
  const placeholderClassName = placeholderStyle()

  return (
    <BlockContainer
      editable="custom"
      node={node}
      actionOptions={['cut', 'copy', 'delete']}
      deleteNode={deleteNode}
      getPos={getPos}>
      <NodeViewContent as="blockquote" data-placeholder={placeholder} className={placeholderClassName} />
    </BlockContainer>
  )
}
