import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { styled, theme } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { EditorDataSourceContext } from '../../dataSource/DataSource'

export interface SubPageMenuBlockProps extends NodeViewProps {}

const SubPageMenu = styled('div', {
  background: theme.colors.backgroundPrimary,
  border: `1px solid ${theme.colors.borderPrimary}`,
  minWidth: '23.375rem',
  padding: '1rem .25rem'
})

export const SubPageMenuBlock: React.FC<SubPageMenuBlockProps> = () => {
  const editorDataSource = React.useContext(EditorDataSourceContext)

  return (
    <BlockContainer>
      <SubPageMenu>{editorDataSource.renderPageTree()}</SubPageMenu>
    </BlockContainer>
  )
}
