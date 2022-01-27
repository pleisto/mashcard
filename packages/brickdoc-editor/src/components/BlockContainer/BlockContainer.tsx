import React from 'react'
import { NodeViewWrapper, NodeViewWrapperProps, NodeViewProps } from '@tiptap/react'
import { BlockActionsProps } from '../BlockActions'
import { BlockContext } from '../../context/BlockContext'
import { useDocumentEditable } from '../../hooks'
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
  contentForCopy?: string
  ref?: any
}

export const BlockContainer: React.FC<BlockContainerProps> = React.forwardRef<HTMLElement, BlockContainerProps>(
  ({ children, inline, as, style, actionOptions, deleteNode, editable, getPos, contentForCopy, ...props }, ref) => {
    const [atListStart, setAtListStart] = React.useState(false)
    const [blockContextData] = useBlockContextDataProvider({ deleteNode, getPos, contentForCopy })
    const [documentEditable] = useDocumentEditable(editable)
    const [blockElement] = useBlockElement(children, actionOptions, inline ?? false, atListStart)
    const asElement = as ?? (inline ? 'span' : undefined)

    return (
      <NodeViewWrapper
        {...props}
        as={asElement}
        style={{ ...style, ...{ pointerEvents: documentEditable ? 'unset' : 'none' } }}
        ref={(container: HTMLElement) => {
          if (typeof ref === 'function') {
            ref(container)
          } else if (ref) {
            ref.current = container
          }

          // check if block is the first element of list
          const element = container?.parentElement
          const parentElement = element?.parentElement
          if (parentElement?.firstChild === element && parentElement?.tagName === 'LI') {
            setAtListStart(true)
          } else {
            setAtListStart(false)
          }
        }}>
        <BlockContext.Provider value={blockContextData}>{blockElement}</BlockContext.Provider>
      </NodeViewWrapper>
    )
  }
)
