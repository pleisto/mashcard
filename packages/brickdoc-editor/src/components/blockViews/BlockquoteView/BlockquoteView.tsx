import { FC } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'
import { BlockViewProps } from '../../../extensions/common'

export const BlockquoteView: FC<BlockViewProps<{}, {}>> = ({ deleteNode, node, getPos }) => {
  return (
    <BlockContainer
      editable="custom"
      node={node}
      actionOptions={['cut', 'copy', 'delete']}
      deleteNode={deleteNode}
      getPos={getPos}>
      <NodeViewContent as="blockquote" />
    </BlockContainer>
  )
}
