import { theme, styled } from '../../themes'

export const ImageWithSpinWrapper = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  background: theme.colors.overlaySecondary
})

export const Image = styled('img', {
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  transition: `all .3s ${theme.transitions.easeOut}`,
  variants: {
    blur: {
      true: {
        transform: 'scale(1.2)',
        filter: 'blur(35px)'
      }
    },
    hidePic: {
      true: {
        opacity: 0
      }
    }
  }
})

export const SpinnerWrapper = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: `all .3s ${theme.transitions.easeOut}`,

  variants: {
    visible: {
      true: {
        opacity: 1
      },
      false: {
        opacity: 0,
        transform: 'scale(1.2)'
      }
    }
  },

  '.cover-spin': {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
})
