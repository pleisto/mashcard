import { FC, useMemo } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { css } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { HeadingViewProps } from '../../../extensions/blocks/heading/meta'

const h1ActionButtonStyle = css({
  marginTop: '.5rem'
})

export const HeadingView: FC<HeadingViewProps> = ({ node, deleteNode, getPos }) => {
  const as = useMemo(() => {
    switch (Number(node.attrs.level)) {
      case 2:
        return 'h2'
      case 3:
        return 'h3'
      case 4:
        return 'h4'
      case 5:
        return 'h5'
      case 1:
      default:
        return 'h1'
    }
  }, [node.attrs.level])

  const actionButtonClassName = useMemo(() => {
    switch (Number(node.attrs.level)) {
      case 2:
      case 3:
      case 4:
      case 5:
        return ''
      case 1:
      default:
        return h1ActionButtonStyle()
    }
  }, [node.attrs.level])

  return (
    <BlockContainer
      node={node}
      actionOptions={['cut', 'copy', 'delete', 'transform']}
      actionButtonClassName={actionButtonClassName}
      getPos={getPos}
      deleteNode={deleteNode}
      contentForCopy={node.textContent}>
      <NodeViewContent as={as} />
    </BlockContainer>
  )
}
