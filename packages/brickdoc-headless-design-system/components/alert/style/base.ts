import { styled } from '../../theme'

export const ContentWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row'
})

export const Content = styled('div', {
  display: 'flex',
  flex: 1,
  alignItems: 'center'
})

export const ContentIcon = styled('div', {
  display: 'fnlex',
  marginRight: '$xs',
  fontSize: '$subheadline'
})

export const ContentBody = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
})

export const ContentAction = styled('div', {
  display: 'flex',
  marginTop: '$2xs * -1'
})

export const ContentClose = styled('a', {
  fontSize: '$footnote',
  lineHeight: '$fontSizes$footnote',
  display: 'flex',
  alignItems: 'center'
})

export const Description = styled('div', {
  fontSize: '$callout',
  lineHeight: '$lg'
})

export const Title = styled('div', {
  marginBottom: '$3xs',
  fontSize: '$body',
  fontWeight: '500',
  lineHeight: '$2xl'
})

export const Base = styled('div', {
  // Reset
  boxSizing: 'border-box',
  padding: '10px 12px',
  color: '$color-type-primary',
  border: '1px solid',
  borderRadius: '$space$3xs',

  '&::before': {
    boxSizing: 'border-box'
  },
  '&::after': {
    boxSizing: 'border-box'
  },

  variants: {
    size: {
      sm: {
        [`& ${ContentIcon}`]: {},
        [`& ${Description}`]: {
          fontWeight: 500
        }
      },
      lg: {
        [`& ${Content}`]: {
          fontSize: '$title4',
          marginRight: '$md',
          alignItems: 'flex-start'
        },
        [`& ${ContentIcon}`]: {
          fontSize: '$title4',
          marginRight: '$md',
          marginTop: '$3xs'
        },
        [`& ${Description}`]: {
          // TODO: lacks token
          fontWeight: 400,
          lineHeight: '22px'
        }
      }
    },
    variant: {
      info: {
        backgroundColor: '$color-status-info-bg',
        borderColor: '$color-hue-blue-hover',
        color: '$color-primary-default',
        [`& ${ContentClose}`]: {
          color: '$color-primary-default'
        }
      },
      error: {
        backgroundColor: '$color-error-bg',
        borderColor: '$color-error-border',
        color: '$color-error-default',
        [`& ${ContentClose}`]: {
          color: '$color-error-default'
        }
      },
      warning: {
        backgroundColor: '$color-status-warning-bg',
        borderColor: '$color-hue-yellow-pressed',
        [`& ${ContentClose}`]: {
          color: '$color-type-primary'
        }
      },
      success: {
        backgroundColor: '$color-hue-green-bg',
        borderColor: '$color-hue-green-pressed',
        color: '$color-hue-green-dafault',
        [`& ${ContentClose}`]: {
          color: '$color-hue-green-dafault'
        }
      }
    },
    full: {}
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'sm',
    variant: 'success'
  }
})
