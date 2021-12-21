import React from 'react'
import { NodeViewWrapper, NodeViewWrapperProps, NodeViewProps } from '@tiptap/react'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import { BlockActions, BlockActionsProps } from '../BlockActions'
import { BlockContext, BlockContextData } from '../../context/BlockContext'
import { message } from '@brickdoc/design-system'
import { EditorContext } from '../../context/EditorContext'

export interface BlockContainerProps {
  deleteNode?: NodeViewProps['deleteNode']
  className?: string
  style?: React.CSSProperties
  as?: NodeViewWrapperProps['as']
  actionOptions?: BlockActionsProps['options']
  contentForCopy?: string
  ref?: any
}

export const BlockContainer: React.FC<BlockContainerProps> = React.forwardRef(
  ({ children, style, actionOptions, deleteNode, contentForCopy, ...props }, ref) => {
    const { t } = React.useContext(EditorContext)
    const blockContextData = React.useMemo<BlockContextData>(
      () => ({
        deleteBlock: () => deleteNode?.(),
        duplicateBlock() {},
        moveBlock() {},
        copyContent: async () => {
          await navigator.clipboard.writeText(contentForCopy ?? '')
          void message.success(t('copy_hint'))
        }
      }),
      [contentForCopy, deleteNode, t]
    )

    const editorDataSource = React.useContext(EditorDataSourceContext)
    const [isEditable, setEditable] = React.useState(editorDataSource.documentEditable)
    editorDataSource.onUpdate(type => {
      if (type === 'documentEditable') {
        setEditable(editorDataSource.documentEditable)
      }
    })

    const pointerStyle: React.CSSProperties = { pointerEvents: isEditable ? 'unset' : 'none' }
    const hasActionOptions = (actionOptions?.length ?? 0) > 0

    return (
      <NodeViewWrapper {...props} style={{ ...style, ...pointerStyle }} ref={ref}>
        <BlockContext.Provider value={blockContextData}>
          {hasActionOptions && <BlockActions options={actionOptions!}>{children}</BlockActions>}
          {!hasActionOptions && children}
        </BlockContext.Provider>
      </NodeViewWrapper>
    )
  }
)
