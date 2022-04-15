import { theme, styled } from '@brickdoc/design-system'

export const Actions = styled('div', {
  opacity: '0%',
  position: 'absolute',
  bottom: '8px',
  right: '110px',
  transition: `all .2s ${theme.transitions.easeOut}`,
  '& button': {
    marginLeft: 4
  }
})

export const Cover = styled('div', {
  position: 'relative',
  height: '260px',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 50%',
  backgroundSize: '100%',

  'img.cover': {
    height: '100%',
    width: '100%'
  },

  '.cover-spin': {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },

  '&:hover': {
    [`${Actions}`]: {
      opacity: '100%'
    }
  },

  variants: {
    uncover: {
      true: {
        display: 'none'
      },
      false: {}
    }
  }
})
