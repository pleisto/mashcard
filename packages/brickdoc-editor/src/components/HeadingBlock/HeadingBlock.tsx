import React from 'react'
import { NodeViewContent, NodeViewProps } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'

export interface HeadingBlockProps extends NodeViewProps {}

export const HeadingBlock: React.FC<HeadingBlockProps> = ({ node, deleteNode }) => {
  const as = React.useMemo(() => {
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

  return (
    <BlockContainer actionOptions={['copy', 'delete']} deleteNode={deleteNode} contentForCopy={node.textContent}>
      <NodeViewContent as={as} />
    </BlockContainer>
  )
}
