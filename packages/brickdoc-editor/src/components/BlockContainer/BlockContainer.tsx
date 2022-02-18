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
    const [insideList, setInsideList] = React.useState(false)
    const [blockContextData] = useBlockContextDataProvider({ deleteNode, getPos, contentForCopy, insideList })
    const [documentEditable] = useDocumentEditable(editable)
    const [blockElement] = useBlockElement(children, actionOptions, inline ?? false, insideList)
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

        if (insideList !== newInsideList) setInsideList(newInsideList)
      }, 100)

      return () => {
        innerRef.current = null
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

          innerRef.current = container
        }}
      >
        <BlockContext.Provider value={blockContextData}>{blockElement}</BlockContext.Provider>
      </NodeViewWrapper>
    )
  }
)
