import { FC } from 'react'
import { BlockContainer } from '../BlockContainer'
import { BlockViewProps } from '../../../extensions/common'
import { BulletList, OrderedList, TaskList } from '../../../extensions'
import { orderedListStyles, bulletListStyles, taskListStyles } from './ListView.style'
import { useNodeContent } from '@mashcard/editor'

export const ListView: FC<BlockViewProps<{}, {}>> = ({ deleteNode, node, getPos }) => {
  const Tag = node.type.name === OrderedList.name ? 'ol' : 'ul'

  let className = ''
  if (node.type.name === OrderedList.name) {
    className = orderedListStyles()
  } else if (node.type.name === BulletList.name) {
    className = bulletListStyles()
  } else if (node.type.name === TaskList.name) {
    className = taskListStyles()
  }

  const nodeContentRef = useNodeContent<HTMLOListElement>()

  return (
    <BlockContainer
      editable="custom"
      node={node}
      className={className}
      actionOptions={['cut', 'copy', 'delete']}
      deleteNode={deleteNode}
      getPos={getPos}>
      <Tag ref={nodeContentRef} data-list-view="" />
    </BlockContainer>
  )
}
