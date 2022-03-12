import { isEmpty } from '@brickdoc/active-support'
import { ArrowShortcut, FilePages } from '@brickdoc/design-icons'
import { styled, theme } from '@brickdoc/design-system'
import { useContext, useMemo } from 'react'
import { EditorContext } from '../../../context/EditorContext'
import { PageLinkOptions, PageLinkAttributes } from '../../../extensions/blocks/pageLink/meta'
import { useExternalProps } from '../../../hooks/useExternalProps'

export interface PageLinkProps {
  options?: PageLinkOptions
  attributes?: PageLinkAttributes
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

export const PageLink: React.FC<PageLinkProps> = ({ attributes, options }) => {
  const { t } = useContext(EditorContext)
  const { documentPages } = useExternalProps()
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
