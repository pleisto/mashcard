import { FC } from 'react'
import { styled, theme } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { SubPageMenuViewProps } from '../../../extensions/blocks/subPageMenu/meta'
import { useEditorPropsContext } from '../../../hooks/useEditorPropsContext'

const SubPageMenu = styled('div', {
  background: theme.colors.backgroundPrimary,
  border: `1px solid ${theme.colors.borderPrimary}`,
  borderRadius: '8px',
  display: 'inline-block',
  minWidth: '23.375rem',
  maxWidth: '100%',
  padding: '1rem .25rem'
})

export const SubPageMenuView: FC<SubPageMenuViewProps> = ({ node, deleteNode, getPos }) => {
  const editorProps = useEditorPropsContext()

  return (
    <BlockContainer node={node} deleteNode={deleteNode} getPos={getPos} actionOptions={['cut', 'copy', 'delete']}>
      <SubPageMenu>{editorProps.renderPageTree()}</SubPageMenu>
    </BlockContainer>
  )
}
