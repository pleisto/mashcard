import { ElementType, FC, forwardRef } from 'react'

import { useReactNodeView } from './useReactNodeView'

export interface NodeViewWrapperProps {
  [key: string]: any
  as?: ElementType
}

export const NodeViewWrapper: FC<NodeViewWrapperProps> = forwardRef((props, ref) => {
  const { onDragStart } = useReactNodeView()
  const Tag = (props.as ?? '') || 'div'

  return (
    <Tag
      {...props}
      ref={ref}
      data-node-view-wrapper=""
      onDragStart={onDragStart}
      style={{
        whiteSpace: 'normal',
        ...props.style
      }}
    />
  )
})
