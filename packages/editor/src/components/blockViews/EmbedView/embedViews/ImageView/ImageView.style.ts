import { styled, theme } from '@mashcard/design-system'

export const minWidth = 200
export const maxWidth = 960

export const EmbedToolbarContainer = styled('div', {
  background: theme.colors.backgroundPrimary,
  borderRadius: '4px',
  bottom: '.5rem',
  opacity: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: '.5rem',
  transition: 'opacity 100ms ease-in-out',

  variants: {
    center: {
      true: {
        right: '50%',
        transform: 'translateX(50%)'
      },
      false: {}
    }
  }
})

export const ImageViewContainer = styled('div', {
  display: 'inline-flex',
  maxWidth: '100%',
  position: 'relative',

  '&:hover': {
    [`& ${EmbedToolbarContainer}`]: {
      opacity: 1,
      pointerEvents: 'inherit'
    }
  },

  [`[data-rmiz-wrap='hidden'], [data-rmiz-wrap='visible']`]: {
    display: 'flex'
  }
})

export const ImageViewLayout = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  variants: {
    align: {
      left: {
        alignItems: 'flex-start'
      },
      center: {
        alignItems: 'center'
      },
      right: {
        alignItems: 'flex-end'
      },
      'full-width': {
        alignItems: 'center',

        [`& ${ImageViewContainer}`]: {
          width: '100%'
        }
      }
    }
  }
})

export const Img = styled('img', {
  borderRadius: '4px',
  maxWidth: '100%',
  minWidth: `${minWidth}px`,
  width: '100%',

  variants: {
    loading: {
      true: {
        display: 'none',
        position: 'absolute'
      },
      false: {}
    }
  }
})

export const SpinnerWrapper = styled('div', {
  include: ['flexCenter'],

  background: theme.colors.overlaySecondary,
  display: 'flex',
  height: '5.625rem',
  maxWidth: '100%',
  width: '100%'
})

export const PreviewButton = styled('button', {
  bottom: 0,
  height: '100%',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  width: '100%',

  /* reset styles */
  appearance: 'none',
  background: 'none',
  border: 'none',
  borderRadius: '0',
  color: 'inherit',
  font: 'inherit',
  margin: 0,
  padding: 0
})
