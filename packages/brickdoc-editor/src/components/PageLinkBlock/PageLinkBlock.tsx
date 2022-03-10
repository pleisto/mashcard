import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { NodeViewProps } from '@tiptap/react'
import { isEmpty } from '@brickdoc/active-support'
import { styled, theme } from '@brickdoc/design-system'
import { BlockContainer } from '../BlockContainer'
import { EditorContext } from '../../context/EditorContext'
import { ArrowShortcut, FilePages } from '@brickdoc/design-icons'
import { EditorDataSourceContext } from '../../dataSource/DataSource'
import { PageLinkBlockOptions } from '../../extensions'

export interface PageLinkBlockProps extends NodeViewProps {}

export interface PageLinkProps {
  options?: PageLinkBlockOptions
  attributes?: {
    page?: {
      title?: string
      icon?: string
      key: string
    }
  }
}

const IconWrapper = styled('span', {
  marginRight: '.25rem',
  position: 'relative',
  variants: {
    size: {
      md: {
        fontSize: '1.5rem',
        lineHeight: '1.5rem'
      },
      sm: {
        fontSize: '1rem',
        lineHeight: '1.125rem'
      }
    }
  }
})

const IconArrowShortcut = styled(ArrowShortcut, {
  bottom: 0,
  fontSize: '.75rem',
  position: 'absolute',
  right: 0
})

const PageName = styled('span', {
  borderBottom: `1px solid ${theme.colors.grey5}`,
  fontWeight: 450,
  variants: {
    size: {
      md: {
        fontSize: theme.fontSizes.body,
        lineHeight: '1.5rem'
      },
      sm: {
        fontSize: theme.fontSizes.callout,
        lineHeight: '1.125rem'
      }
    }
  }
})

const StyledLink = styled(Link, {
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    borderBottom: 'none',
    textDecoration: 'none'
  }
})

export const PageLink: React.FC<PageLinkProps> = ({ attributes, options }) => {
  const { t } = React.useContext(EditorContext)
  const { documentPages } = useContext(EditorDataSourceContext)
  const size = options?.size ?? 'md'
  const { key } = attributes?.page ?? {}

  const page = useMemo(() => documentPages.find(page => page.key === key), [documentPages, key])
  const icon = page?.icon ?? attributes?.page?.icon
  const title = page?.title ?? attributes?.page?.title

  return (
    <span>
      <IconWrapper size={size} role="img" aria-label="">
        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
        {icon || <FilePages />}
        {icon && size !== 'sm' && <IconArrowShortcut />}
      </IconWrapper>
      <PageName>{isEmpty(title) ? t('page_link_block.untitled') : title}</PageName>
    </span>
  )
}

export const PageLinkBlock: React.FC<PageLinkBlockProps> = ({ node, extension }) => {
  return (
    <BlockContainer inline={true}>
      <StyledLink to={node.attrs?.page?.link ?? '/'}>
        <PageLink attributes={node.attrs} options={extension.options} />
      </StyledLink>
    </BlockContainer>
  )
}
