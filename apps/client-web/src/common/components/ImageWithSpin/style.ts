import { theme, styled } from '@brickdoc/design-system'

export const ImageWithSpinWrapper = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  background: theme.colors.overlaySecondary,

  '.cover-spin': {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
})

export const Image = styled('img', {
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  variants: {
    spining: {
      true: {
        filter: 'blur(75px)'
      }
    }
  }
})
