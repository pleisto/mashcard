import { styled, theme } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { SubPageMenuViewProps } from '../../../extensions/blocks/subPageMenu/meta'
import { useExternalProps } from '../../../hooks/useExternalProps'

const SubPageMenu = styled('div', {
  background: theme.colors.backgroundPrimary,
  border: `1px solid ${theme.colors.borderPrimary}`,
  borderRadius: '8px',
  display: 'inline-block',
  minWidth: '23.375rem',
  padding: '1rem .25rem'
})

export const SubPageMenuView: React.FC<SubPageMenuViewProps> = ({ deleteNode, getPos }) => {
  const externalProps = useExternalProps()

  return (
    <BlockContainer deleteNode={deleteNode} getPos={getPos} actionOptions={['delete']}>
      <SubPageMenu>{externalProps.renderPageTree()}</SubPageMenu>
    </BlockContainer>
  )
}
