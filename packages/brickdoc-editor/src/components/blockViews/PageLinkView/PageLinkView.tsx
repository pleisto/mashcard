import { FC } from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { PageLink } from '../../ui'
import { PageLinkViewProps } from '../../../extensions/blocks/pageLink/meta'

const StyledLink = styled(Link, {
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    borderBottom: 'none',
    textDecoration: 'none'
  }
})

export const PageLinkView: FC<PageLinkViewProps> = ({ node, extension }) => {
  return (
    <BlockContainer node={node} inline={true}>
      <StyledLink to={node.attrs?.page?.link ?? '/'}>
        <PageLink attributes={node.attrs} options={extension.options} />
      </StyledLink>
    </BlockContainer>
  )
}
