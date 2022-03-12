import { FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { styled, theme } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { initialTocTree, TocNode } from './tocTree'
import { TocContainer, TocNodePanel } from './TocNodePanel'
import { EditorContext } from '../../../context/EditorContext'
import { TocViewProps } from '../../../extensions/blocks/toc/meta'

export interface TocItem {
  level: 'root' | 1 | 2 | 3 | 4 | 5 | 'text'
  content?: ReactNode
  nodeSize: number
  position: number
}

const TocPlaceholder = styled('span', {
  color: theme.colors.typeDisabled,
  fontSize: theme.fontSizes.body,
  fontWeight: 400,
  lineHeight: '1.5rem'
})

export const TocView: FC<TocViewProps> = ({ editor, deleteNode, getPos }) => {
  const [tocRoot, setTocRoot] = useState<TocNode>()
  const [tocItemCount, setTocItemCount] = useState<number>(0)
  const { t } = useContext(EditorContext)

  const updateItems = useCallback(() => {
    const [tocRoot, count] = initialTocTree(editor.state.doc)
    setTocRoot(tocRoot)
    setTocItemCount(count)
  }, [editor.state.doc])

  useEffect(() => {
    updateItems()
  }, [updateItems])

  useEffect(() => {
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
