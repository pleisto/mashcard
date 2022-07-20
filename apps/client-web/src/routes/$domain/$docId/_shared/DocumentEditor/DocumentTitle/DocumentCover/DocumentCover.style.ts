import { theme, styled, ImageWithSpin } from '@mashcard/design-system'

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

  '&:hover': {
    [`${Actions}`]: {
      opacity: '100%'
    }
  }
})

export const CoverImage = styled(ImageWithSpin, {
  width: '100%',
  height: '100%'
})
