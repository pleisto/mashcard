import React from 'react'
import { NodeViewWrapper, NodeViewWrapperProps, NodeViewProps } from '@tiptap/react'
import { EditorDataSourceContext } from '../../dataSource/DataSource'

export interface BlockWrapperProps extends NodeViewWrapperProps {
  editor: NodeViewProps['editor']
  as?: NodeViewWrapperProps['as']
}

export const BlockWrapper: React.FC<BlockWrapperProps> = React.forwardRef((props, ref) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const [isEditable, setEditable] = React.useState(editorDataSource.documentEditable)

  editorDataSource.onUpdate(type => {
    if (type === 'documentEditable') {
      setEditable(editorDataSource.documentEditable)
    }
  })
  const style: React.CSSProperties = { pointerEvents: isEditable ? 'unset' : 'none' }
  return <NodeViewWrapper {...props} style={{ ...props.style, ...style }} ref={ref} />
})
