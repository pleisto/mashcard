import { FC } from 'react'
import { HorizontalRuleViewProps } from '../../../extensions/blocks/horizontalRule/meta'
import { BlockContainer } from '../BlockContainer'

export const HorizontalRuleView: FC<HorizontalRuleViewProps> = ({ node, deleteNode, getPos }) => {
  return (
    <BlockContainer node={node} deleteNode={deleteNode} getPos={getPos} actionOptions={['cut', 'delete']}>
      <hr />
    </BlockContainer>
  )
}
