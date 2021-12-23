import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'

export interface DividerBlockProps extends NodeViewProps {}

export const DividerBlock: React.FC<DividerBlockProps> = ({ deleteNode }) => {
  return (
    <BlockContainer deleteNode={deleteNode} actionOptions={['delete']}>
      <hr />
    </BlockContainer>
  )
}
