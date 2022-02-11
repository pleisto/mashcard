import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { styled, theme } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { EditorDataSourceContext } from '../../dataSource/DataSource'

export interface SubPageMenuBlockProps extends NodeViewProps {}

const SubPageMenu = styled('div', {
  background: theme.colors.backgroundPrimary,
  border: `1px solid ${theme.colors.borderPrimary}`,
  borderRadius: '8px',
  display: 'inline-block',
  minWidth: '23.375rem',
  padding: '1rem .25rem'
})

export const SubPageMenuBlock: React.FC<SubPageMenuBlockProps> = ({ deleteNode, getPos }) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)

  return (
    <BlockContainer deleteNode={deleteNode} getPos={getPos} actionOptions={['delete']}>
      <SubPageMenu>{editorDataSource.renderPageTree()}</SubPageMenu>
    </BlockContainer>
  )
}
