import { isEmpty } from '@brickdoc/active-support'
import { ArrowShortcut, FilePages } from '@brickdoc/design-icons'
import { styled, theme } from '@brickdoc/design-system'
import { useMemo } from 'react'
import { PageLinkOptions, PageLinkAttributes } from '../../../extensions/blocks/pageLink/meta'
import { useEditorI18n } from '../../../hooks'

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
  const [t] = useEditorI18n()
  const size = options?.size ?? 'md'
  const { key } = attributes?.page ?? {}

  const page = useMemo(() => options?.pages?.find(page => page.id === key), [key, options?.pages])
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
