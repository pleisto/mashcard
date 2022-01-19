import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'

export interface DividerBlockProps extends NodeViewProps {}

export const DividerBlock: React.FC<DividerBlockProps> = ({ deleteNode, getPos }) => {
  return (
    <BlockContainer deleteNode={deleteNode} getPos={getPos} actionOptions={['delete']}>
      <hr />
    </BlockContainer>
  )
}
