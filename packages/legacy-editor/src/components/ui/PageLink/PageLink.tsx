import { isEmpty } from '@mashcard/active-support'
import { ArrowShortcut, FilePages } from '@mashcard/design-icons'
import { styled, theme } from '@mashcard/design-system'
import { useMemo } from 'react'
import { PageLinkOptions, PageLinkAttributes } from '../../../extensions/blocks/pageLink/meta'
import { useEditorI18n } from '../../../hooks'
import { defaultSelectionStyles } from '../../../styles/index.style'

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

const PageLinkContainer = styled('span', {
  ...defaultSelectionStyles
})

export const PageLink: React.FC<PageLinkProps> = ({ attributes, options }) => {
  const [t] = useEditorI18n()
  const size = options?.size ?? 'md'
  const { key } = attributes?.page ?? {}

  const page = useMemo(() => options?.pages?.find(page => page.id === key), [key, options?.pages])
  const icon = page?.icon ?? attributes?.page?.icon
  const title = page?.title ?? attributes?.page?.title

  return (
    <PageLinkContainer>
      <IconWrapper size={size} role="img" aria-label="">
        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
        {icon || <FilePages />}
        {icon && size !== 'sm' && <IconArrowShortcut />}
      </IconWrapper>
      <PageName>{isEmpty(title) ? t('page_link_block.untitled') : title}</PageName>
    </PageLinkContainer>
  )
}
