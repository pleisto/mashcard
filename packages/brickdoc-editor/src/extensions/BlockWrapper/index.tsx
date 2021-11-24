import React from 'react'
import { NodeViewWrapper, NodeViewWrapperProps, NodeViewProps } from '@tiptap/react'

export interface BlockWrapperProps extends NodeViewWrapperProps {
  editor: NodeViewProps['editor']
  as?: NodeViewWrapperProps['as']
}

export const BlockWrapper: React.FC<BlockWrapperProps> = React.forwardRef((props, ref) => {
  const style: React.CSSProperties = { pointerEvents: props.editor.isEditable ? 'unset' : 'none' }
  return <NodeViewWrapper {...props} style={{ ...props.style, ...style }} ref={ref} />
})
