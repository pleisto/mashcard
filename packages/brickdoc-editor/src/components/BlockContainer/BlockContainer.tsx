import React from 'react'
import { NodeViewWrapper, NodeViewWrapperProps, NodeViewProps } from '@tiptap/react'
import { BlockActionsProps } from '../BlockActions'
import { BlockContext } from '../../context/BlockContext'
import { useDocumentEditable } from '../../hooks'
import { useBlockContextDataProvider } from './useBlockContextDataProvider'
import { useBlockElement } from './useBlockElement'

export interface BlockContainerProps {
  inline?: boolean
  deleteNode?: NodeViewProps['deleteNode']
  getPos?: NodeViewProps['getPos']
  className?: string
  style?: React.CSSProperties
  as?: NodeViewWrapperProps['as']
  actionOptions?: BlockActionsProps['options']
  contentForCopy?: string
  ref?: any
}

export const BlockContainer: React.FC<BlockContainerProps> = React.forwardRef(
  ({ children, inline, as, style, actionOptions, deleteNode, getPos, contentForCopy, ...props }, ref) => {
    const [blockContextData] = useBlockContextDataProvider({ deleteNode, getPos, contentForCopy })
    const [documentEditable] = useDocumentEditable()
    const [blockElement] = useBlockElement(children, actionOptions, inline)
    const asElement = as ?? (inline ? 'span' : undefined)

    return (
      <NodeViewWrapper
        {...props}
        as={asElement}
        style={{ ...style, ...{ pointerEvents: documentEditable ? 'unset' : 'none' } }}
        ref={ref}
      >
        <BlockContext.Provider value={blockContextData}>{blockElement}</BlockContext.Provider>
      </NodeViewWrapper>
    )
  }
)
