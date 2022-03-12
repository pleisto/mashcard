import React from 'react'
import { HorizontalRuleViewProps } from '../../../extensions/blocks/horizontalRule/meta'
import { BlockContainer } from '../BlockContainer'

export const HorizontalRuleView: React.FC<HorizontalRuleViewProps> = ({ deleteNode, getPos }) => {
  return (
    <BlockContainer deleteNode={deleteNode} getPos={getPos} actionOptions={['delete']}>
      <hr />
    </BlockContainer>
  )
}
