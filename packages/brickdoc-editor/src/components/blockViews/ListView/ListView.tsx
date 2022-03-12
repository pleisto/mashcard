import React from 'react'
import { NodeViewContent } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'
import BulletList from '@tiptap/extension-bullet-list'
import { BlockViewProps } from '../../../extensions/common'

export const ListView: React.FC<BlockViewProps<{}, {}>> = ({ deleteNode, node }) => {
  const as = node.type.name === BulletList.name ? 'ul' : 'ol'
  return (
    <BlockContainer actionOptions={['copy', 'delete']} deleteNode={deleteNode} contentForCopy={node.textContent}>
      <NodeViewContent as={as} />
    </BlockContainer>
  )
}
