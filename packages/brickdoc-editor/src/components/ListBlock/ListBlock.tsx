import React from 'react'
import { NodeViewContent, NodeViewProps } from '@tiptap/react'
import { BlockContainer } from '..'
import BulletList from '@tiptap/extension-bullet-list'

export interface ListBlockProps extends NodeViewProps {}

export const ListBlock: React.FC<ListBlockProps> = ({ deleteNode, node }) => {
  const as = node.type.name === BulletList.name ? 'ul' : 'ol'
  return (
    <BlockContainer actionOptions={['copy', 'delete']} deleteNode={deleteNode} contentForCopy={node.textContent}>
      <NodeViewContent as={as} />
    </BlockContainer>
  )
}
