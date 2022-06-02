import { theme, styled } from '../../themes'

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
        transform: 'scale(1.2)',
        filter: 'blur(35px)'
      }
    },
    hidePic: {
      true: {
        filter: 'opacity(0%)!important'
      }
    }
  }
})

export const BlurHashWrapper = styled('div', {
  position: 'absolute',
  left: 0,
  top: 0
})
