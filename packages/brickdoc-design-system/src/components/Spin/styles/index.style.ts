import { css, theme } from '../../../themes'

export const spinStyle = css({
  display: 'inline-block',
  position: 'relative',
  opacity: 0,
  padding: 2,

  variants: {
    size: {
      sm: {
        transform: 'scale(0.6)'
      },
      md: {
        transform: 'scale(0.)'
      },
      lg: {
        transform: 'scale(1)'
      }
    },
    color: {
      light: {
        '& circle': {
          stroke: theme.colors.white
        }
      },
      dark: {
        '& > circle': {
          stroke: theme.colors.iconPrimary
        }
      }
    }
  }
})
