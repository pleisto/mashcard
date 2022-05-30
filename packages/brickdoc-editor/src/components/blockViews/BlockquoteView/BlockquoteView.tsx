import { FC } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'
import { BlockViewProps } from '../../../extensions/common'

export const BlockquoteView: FC<BlockViewProps<{}, {}>> = ({ deleteNode, node, getPos }) => {
  return (
    <BlockContainer
      node={node}
      actionOptions={['cut', 'copy', 'delete']}
      deleteNode={deleteNode}
      contentForCopy={node.textContent}
      getPos={getPos}>
      <NodeViewContent as="blockquote" />
    </BlockContainer>
  )
}
