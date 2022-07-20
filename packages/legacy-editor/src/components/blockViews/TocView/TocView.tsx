import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { styled, theme } from '@mashcard/design-system'
import { debounce } from '@mashcard/active-support'
import { BlockContainer } from '../BlockContainer'
import { initialTocTree, TocNode } from './tocTree'
import { TocContainer, TocNodePanel } from './TocNodePanel'
import { TocViewProps } from '../../../extensions/blocks/toc/meta'
import { useEditorI18n } from '../../../hooks'

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

export const TocView: FC<TocViewProps> = ({ editor, node, deleteNode, getPos }) => {
  const [t] = useEditorI18n()
  const [tocRoot, setTocRoot] = useState<TocNode>()
  const [tocItemCount, setTocItemCount] = useState<number>(0)

  const updateItems = useCallback(() => {
    const [tocRoot, count] = initialTocTree(editor.state.doc)
    setTocRoot(tocRoot)
    setTocItemCount(count)
  }, [editor.state.doc])

  useEffect(() => {
    updateItems()
  }, [updateItems])

  useEffect(() => {
    const onUpdate = debounce(updateItems, 100)
    editor.on('update', onUpdate)
    return () => {
      editor.off('update', onUpdate)
    }
  }, [editor, updateItems])

  return (
    <BlockContainer node={node} getPos={getPos} deleteNode={deleteNode} actionOptions={['cut', 'copy', 'delete']}>
      <TocContainer tocItemCount={tocItemCount}>
        {tocItemCount === 0 && <TocPlaceholder>{t('blocks.toc.placeholder')}</TocPlaceholder>}
        {tocRoot?.children.map((node, index) => (
          <TocNodePanel key={index} tocNode={node} />
        ))}
      </TocContainer>
    </BlockContainer>
  )
}
