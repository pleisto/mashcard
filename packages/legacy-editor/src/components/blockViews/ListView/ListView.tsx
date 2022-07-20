import { FC } from 'react'
import { NodeViewContent } from '../../../tiptapRefactor'
import { BlockContainer } from '../BlockContainer'
import { BlockViewProps } from '../../../extensions/common'
import { BulletList, OrderedList, TaskList } from '../../../extensions'
import { orderedListStyles, bulletListStyles, taskListStyles } from './ListView.style'

export const ListView: FC<BlockViewProps<{}, {}>> = ({ deleteNode, node, getPos }) => {
  const as = node.type.name === OrderedList.name ? 'ol' : 'ul'

  let className = ''
  if (node.type.name === OrderedList.name) {
    className = orderedListStyles()
  } else if (node.type.name === BulletList.name) {
    className = bulletListStyles()
  } else if (node.type.name === TaskList.name) {
    className = taskListStyles()
  }

  return (
    <BlockContainer
      editable="custom"
      node={node}
      className={className}
      actionOptions={['cut', 'copy', 'delete']}
      deleteNode={deleteNode}
      getPos={getPos}
    >
      <NodeViewContent as={as} data-task-list={TaskList.name === node.type.name ? '' : undefined} />
    </BlockContainer>
  )
}
