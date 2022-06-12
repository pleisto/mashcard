import { styled, theme } from '../../../themes'
import { Button } from '../../Button'

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
  display: 'flex',
  marginRight: theme.space.xs,
  fontSize: theme.fontSizes.subHeadline
})

export const ContentBody = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
})

export const ContentAction = styled('div', {
  display: 'flex',
  marginTop: `calc(${theme.space.xxs} * -1)`
})

export const ContentClose = styled(Button, {})

export const Description = styled('div', {
  fontSize: theme.fontSizes.callout,
  lineHeight: theme.space.lg
})

export const Title = styled('div', {
  marginBottom: theme.space.xxxs,
  fontSize: theme.fontSizes.body,
  fontWeight: '500',
  lineHeight: theme.space.xxl
})

export const Base = styled('div', {
  isolation: 'isolation',
  padding: '10px 12px',
  color: theme.colors.typePrimary,
  border: '1px solid',
  borderRadius: theme.space.xxxs,

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
          fontSize: theme.fontSizes.title4,
          marginRight: theme.space.md,
          alignItems: 'flex-start'
        },
        [`& ${ContentIcon}`]: {
          fontSize: theme.fontSizes.title4,
          marginRight: theme.space.md,
          marginTop: theme.space.xxxs
        },
        [`& ${Description}`]: {
          fontWeight: 400,
          lineHeight: '22px'
        }
      }
    },
    variant: {
      info: {
        backgroundColor: theme.colors.statusInfoBg,
        borderColor: theme.colors.blue2,
        color: theme.colors.blue8,
        [`& ${ContentClose}`]: {
          color: theme.colors.blue8
        }
      },
      error: {
        backgroundColor: theme.colors.errorBg,
        borderColor: theme.colors.errorBorder,
        color: theme.colors.errorDefault,
        [`& ${ContentClose}`]: {
          color: theme.colors.errorDefault
        }
      },
      warning: {
        backgroundColor: theme.colors.statusWarningBg,
        borderColor: theme.colors.yellow3,
        color: theme.colors.yellow9,
        [`& ${ContentClose}`]: {
          color: theme.colors.yellow9
        }
      },
      success: {
        backgroundColor: theme.colors.statusSuccessBg,
        borderColor: theme.colors.green2,
        color: theme.colors.green9,
        [`& ${ContentClose}`]: {
          color: theme.colors.green9
        }
      }
    },
    full: {}
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'small',
    variant: 'success'
  }
})
