import { CSSProperties, FC, forwardRef, MouseEventHandler, useMemo, useState } from 'react'
import { NodeViewWrapper, NodeViewWrapperProps, NodeViewProps } from '@tiptap/react'
import { BlockActionsProps } from '../BlockActions'
import { BlockContext } from '../../../context/BlockContext'
import { useDocumentEditable } from '../../../hooks'
import { useBlockContextDataProvider } from './useBlockContextDataProvider'
import { useBlockElement } from './useBlockElement'
import { useExternalProps } from '../../../hooks/useExternalProps'
export interface BlockContainerProps {
  inline?: boolean
  editable?: boolean
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
    const { blocks } = useExternalProps()

    // if node can not be found in first level blocks, it must be inside other blocks.
    const insideList = useMemo(() => !blocks.find(block => block.id === node.attrs.uuid), [blocks, node.attrs.uuid])
    const disableActionOptions = insideList

    const [blockDragging, setBlockDragging] = useState(false)
    const [blockContextData] = useBlockContextDataProvider({
      deleteNode,
      getPos,
      contentForCopy,
      updateDragging: (dragging: boolean) => setBlockDragging(dragging),
      insideList,
      dragging: blockDragging,
      node
    })
    const [documentEditable] = useDocumentEditable(editable)
    const [blockElement] = useBlockElement(children, actionOptions, {
      inline: inline ?? false,
      disableActionOptions,
      blockActionClassName: actionButtonClassName
    })
    const asElement = as ?? (inline ? 'span' : undefined)

    return (
      <NodeViewWrapper
        {...props}
        as={asElement}
        style={{
          ...style,
          pointerEvents: documentEditable ? 'unset' : 'none',
          opacity: blockDragging ? '0.2' : 'unset'
        }}
        ref={(container: HTMLElement) => {
          if (typeof ref === 'function') {
            ref(container)
          } else if (ref) {
            ref.current = container
          }
        }}
      >
        <BlockContext.Provider value={blockContextData}>{blockElement}</BlockContext.Provider>
      </NodeViewWrapper>
    )
  }
)
