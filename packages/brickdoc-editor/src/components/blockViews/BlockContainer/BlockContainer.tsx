import React from 'react'
import { NodeViewWrapper, NodeViewWrapperProps, NodeViewProps } from '@tiptap/react'
import { BlockActionsProps } from '../BlockActions'
import { BlockContext } from '../../../context/BlockContext'
import { useDocumentEditable } from '../../../hooks'
import { useBlockContextDataProvider } from './useBlockContextDataProvider'
import { useBlockElement } from './useBlockElement'

export interface BlockContainerProps {
  inline?: boolean
  editable?: boolean
  deleteNode?: NodeViewProps['deleteNode']
  getPos?: NodeViewProps['getPos']
  className?: string
  style?: React.CSSProperties
  as?: NodeViewWrapperProps['as']
  actionOptions?: BlockActionsProps['options'] | BlockActionsProps
  actionButtonClassName?: BlockActionsProps['buttonClassName']
  contentForCopy?: string
  ref?: any
  onClick?: React.MouseEventHandler
}

export const BlockContainer: React.FC<BlockContainerProps> = React.forwardRef<HTMLElement, BlockContainerProps>(
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
      ...props
    },
    ref
  ) => {
    const [insideList, setInsideList] = React.useState(false)
    // hide block actions default
    const [disableActionOptions, setDisableActionOptions] = React.useState(true)
    const [blockDragging, setBlockDragging] = React.useState(false)
    const [blockContextData] = useBlockContextDataProvider({
      deleteNode,
      getPos,
      contentForCopy,
      updateDragging: (dragging: boolean) => setBlockDragging(dragging),
      insideList,
      dragging: blockDragging
    })
    const [documentEditable] = useDocumentEditable(editable)
    const [blockElement] = useBlockElement(children, actionOptions, {
      inline: inline ?? false,
      disableActionOptions,
      blockActionClassName: actionButtonClassName
    })
    const asElement = as ?? (inline ? 'span' : undefined)
    const innerRef = React.useRef<HTMLElement | null>(null)

    // this effect is for checking dom element when mounted
    React.useEffect(() => {
      // waiting for dom mounted by ProseMirror
      // TODO: find a better way to check if paragraph inside list
      setTimeout(() => {
        if (!innerRef.current) return
        // check if block is in the list
        const element = innerRef.current.parentElement
        const parentElement = element?.parentElement
        const newInsideList = parentElement?.tagName === 'LI'

        if (newInsideList !== disableActionOptions) setDisableActionOptions(newInsideList)
        if (insideList !== newInsideList) setInsideList(newInsideList)
      }, 50)

      return () => {
        innerRef.current = null
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

          innerRef.current = container
        }}>
        <BlockContext.Provider value={blockContextData}>{blockElement}</BlockContext.Provider>
      </NodeViewWrapper>
    )
  }
)
