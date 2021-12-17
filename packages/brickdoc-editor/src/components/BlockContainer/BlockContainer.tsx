import React from 'react'
import { NodeViewWrapper, NodeViewWrapperProps, NodeViewProps } from '@tiptap/react'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import { ActionOptionGroup, BlockActions } from '../BlockActions'

export interface BlockContainerProps extends NodeViewWrapperProps {
  editor: NodeViewProps['editor']
  className?: string
  style?: React.CSSProperties
  as?: NodeViewWrapperProps['as']
  actionOptions?: ActionOptionGroup
}

export const BlockContainer: React.FC<BlockContainerProps> = React.forwardRef(
  ({ children, style, actionOptions, ...props }, ref) => {
    const editorDataSource = React.useContext(EditorDataSourceContext)
    const [isEditable, setEditable] = React.useState(editorDataSource.documentEditable)

    editorDataSource.onUpdate(type => {
      if (type === 'documentEditable') {
        setEditable(editorDataSource.documentEditable)
      }
    })
    const pointerStyle: React.CSSProperties = { pointerEvents: isEditable ? 'unset' : 'none' }

    return (
      <NodeViewWrapper {...props} style={{ ...style, ...pointerStyle }} ref={ref}>
        {actionOptions && <BlockActions options={actionOptions}>{children}</BlockActions>}
        {!actionOptions && children}
      </NodeViewWrapper>
    )
  }
)
