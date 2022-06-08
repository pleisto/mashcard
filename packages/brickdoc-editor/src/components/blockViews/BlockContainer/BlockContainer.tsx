import { CSSProperties, FC, forwardRef, MouseEventHandler, ReactNode, useState } from 'react'
import { NodeViewWrapper, NodeViewWrapperProps, NodeViewProps } from '@tiptap/react'
import { BlockActionsProps } from '../BlockActions'
import { BlockContext } from '../../../context/BlockContext'
import { useDocumentEditable, useEditorContext } from '../../../hooks'
import { useBlockContextDataProvider } from './useBlockContextDataProvider'
import { useBlockElement } from './useBlockElement'
import { useDisableActionOptions } from './useDisableActionOptions'
export interface BlockContainerProps {
  inline?: boolean
  editable?: boolean | 'custom'
  deleteNode?: NodeViewProps['deleteNode']
  getPos?: NodeViewProps['getPos']
  className?: string
  style?: CSSProperties
  as?: NodeViewWrapperProps['as']
  actionOptions?: BlockActionsProps['options'] | BlockActionsProps
  actionButtonClassName?: BlockActionsProps['buttonClassName']
  contentForCopy?: string
  ref?: any
  onClick?: MouseEventHandler
  onMouseDown?: MouseEventHandler
  node: NodeViewProps['node']
  children?: ReactNode
}

export const BlockContainer: FC<BlockContainerProps> = forwardRef<HTMLElement, BlockContainerProps>(
  (
    {
      children,
      inline,
      as,
      actionButtonClassName,
      style,
      actionOptions,
      deleteNode,
      editable,
      getPos,
      contentForCopy,
      node,
      ...props
    },
    ref
  ) => {
    const { editor } = useEditorContext()
    const [documentEditable] = useDocumentEditable(editable === 'custom' ? undefined : editable)
    const disableActionOptions = useDisableActionOptions(editor, getPos)

    const [blockDragging, setBlockDragging] = useState(false)
    const [blockContextData] = useBlockContextDataProvider({
      deleteNode,
      getPos,
      contentForCopy,
      updateDragging: (dragging: boolean) => setBlockDragging(dragging),
      dragging: blockDragging,
      node
    })
    const [blockElement] = useBlockElement(children, actionOptions, {
      inline: inline ?? false,
      disableActionOptions: disableActionOptions || !documentEditable,
      blockActionClassName: actionButtonClassName
    })
    const asElement = as ?? (inline ? 'span' : undefined)

    return (
      <NodeViewWrapper
        {...props}
        as={asElement}
        style={{
          ...style,
          pointerEvents: documentEditable || editable === 'custom' ? 'unset' : 'none',
          opacity: blockDragging ? '0.2' : 'unset'
        }}
        ref={(container: HTMLElement) => {
          if (typeof ref === 'function') {
            ref(container)
          } else if (ref) {
            ref.current = container
          }
        }}>
        <BlockContext.Provider value={blockContextData}>{blockElement}</BlockContext.Provider>
      </NodeViewWrapper>
    )
  }
)
