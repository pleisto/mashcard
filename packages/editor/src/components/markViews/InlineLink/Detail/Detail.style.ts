import { styled, theme } from '@mashcard/design-system'
import { IconBackground } from '../../../ui'

export const DetailPopover = styled('div', {})

export const DetailContainer = styled('div', {
  include: ['ceramicPrimary'],
  padding: '.5rem 1rem',
  width: '22rem'
})

export const Page = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row'
})

export const PageTitle = styled('span', {
  color: theme.colors.typePrimary,
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 450,
  lineHeight: theme.lineHeights.subHeadline,
  maxWidth: '17.5rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})

export const PageIcon = styled(IconBackground, {
  include: ['flexCenter'],

  color: theme.colors.iconThirdary,
  cursor: 'pointer',
  display: 'flex',
  height: '2rem',
  marginRight: '.375rem',
  width: '2rem'
})

export const Link = styled('a', {
  color: theme.colors.typePrimary,
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 450,
  lineHeight: theme.lineHeights.subHeadline,
  maxWidth: '17.5rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  '&:hover': {
    textDecorationLine: 'none'
  }
})

export const EditIconWrapper = styled(IconBackground, {
  include: ['flexCenter'],

  color: theme.colors.iconThirdary,
  cursor: 'pointer',
  display: 'flex',
  height: '2rem',
  width: '2rem'
})

export const Row = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '.3125rem 0',
  position: 'relative'
})
