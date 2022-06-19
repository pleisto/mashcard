import { Input, styled, theme } from '@brickdoc/design-system'

export const Gallery = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '28.5rem',
  maxHeight: '28.5rem',
  padding: '1rem',
  width: '39.6875rem'
})

export const GalleryImage = styled('div', {
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: '2px',
  cursor: 'pointer',
  filter: 'drop-shadow(0px 2px 4px rgba(44, 91, 255, 0.02)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.04))',
  height: '6.5625rem',
  marginBottom: '.5rem',
  marginRight: '.5rem',
  position: 'relative',
  width: '9rem'
})

export const GalleryImageList = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  overflow: 'scroll',
  paddingBottom: '.1rem',
  [`${GalleryImage}:nth-child(4n)`]: {
    marginRight: 0
  }
})

export const SearchInput = styled(Input, {
  marginBottom: '1rem'
})

export const GalleryImageInfo = styled('div', {
  background: theme.colors.backgroundOverlayPrimary,
  borderRadius: '2px',
  bottom: 0,
  left: 0,
  opacity: 0,
  position: 'absolute',
  right: 0,
  transition: 'opacity 100ms ease-in-out',
  top: 0,
  '&:hover': {
    opacity: 1
  }
})

export const GalleryImageUsername = styled('span', {
  bottom: '.5rem',
  color: theme.colors.white,
  fontSize: '.75rem',
  left: '.5rem',
  lineHeight: '1rem',
  position: 'absolute',
  textShadow: '0px 2px 4px rgba(44, 91, 255, 0.02), 0px 4px 4px rgba(0, 0, 0, 0.04)'
})

export const LoadMorePlaceholder = styled('div', {})
