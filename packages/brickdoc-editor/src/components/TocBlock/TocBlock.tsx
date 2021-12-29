import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'
import { initialTocTree, TocNode } from './tocTree'
import { TocContainer, TocNodePanel } from './TocNodePanel'

export interface TocBlockProps extends NodeViewProps {}

export interface TocItem {
  level: 'root' | 1 | 2 | 3 | 4 | 5 | 'text'
  text?: string
  nodeSize: number
  position: number
}

export const TocBlock: React.FC<TocBlockProps> = ({ editor, deleteNode }) => {
  const [tocRoot, setTocRoot] = React.useState<TocNode>()
  const [tocItemCount, setTocItemCount] = React.useState<number>(0)

  const updateItems = React.useCallback(() => {
    const [tocRoot, count] = initialTocTree(editor.state.doc)
    setTocRoot(tocRoot)
    setTocItemCount(count)
  }, [editor.state.doc])

  React.useEffect(() => {
    updateItems()
  }, [updateItems])

  React.useEffect(() => {
    editor.on('update', updateItems)
    return () => {
      editor.off('update', updateItems)
    }
  }, [editor, updateItems])

  return (
    <BlockContainer deleteNode={deleteNode} actionOptions={['delete']}>
      <TocContainer tocItemCount={tocItemCount}>
        {tocRoot?.children.map((node, index) => (
          <TocNodePanel key={index} tocNode={node} />
        ))}
      </TocContainer>
    </BlockContainer>
  )
}
