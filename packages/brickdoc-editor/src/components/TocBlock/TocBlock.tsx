import React from 'react'
import { styled, theme } from '@brickdoc/design-system'
import { NodeViewProps } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'
import { initialTocTree, TocNode } from './tocTree'
import { TocContainer, TocNodePanel } from './TocNodePanel'
import { EditorContext } from '../../context/EditorContext'

export interface TocBlockProps extends NodeViewProps {}

export interface TocItem {
  level: 'root' | 1 | 2 | 3 | 4 | 5 | 'text'
  text?: string
  nodeSize: number
  position: number
}

const TocPlaceholder = styled('span', {
  color: theme.colors.typeDisabled,
  fontSize: theme.fontSizes.body,
  fontWeight: 400,
  lineHeight: '1.5rem'
})

export const TocBlock: React.FC<TocBlockProps> = ({ editor, deleteNode, getPos }) => {
  const [tocRoot, setTocRoot] = React.useState<TocNode>()
  const [tocItemCount, setTocItemCount] = React.useState<number>(0)
  const { t } = React.useContext(EditorContext)

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
    <BlockContainer getPos={getPos} deleteNode={deleteNode} actionOptions={['delete']}>
      <TocContainer tocItemCount={tocItemCount}>
        {tocItemCount === 0 && <TocPlaceholder>{t('blocks.toc.placeholder')}</TocPlaceholder>}
        {tocRoot?.children.map((node, index) => (
          <TocNodePanel key={index} tocNode={node} />
        ))}
      </TocContainer>
    </BlockContainer>
  )
}
