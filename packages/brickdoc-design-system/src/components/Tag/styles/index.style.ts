import { theme, styled, prefix } from '../../../themes'

export const TagRoot = styled('div', {
  display: 'inline-flex',
  include: ['flexCenter'],
  padding: '4px 12px',
  background: theme.colors.backgroundPrimary,
  border: `1px solid ${theme.colors.borderPrimary}`,
  borderRadius: 20,
  color: theme.colors.typePrimary,
  cursor: 'default',
  marginRight: 6,

  [`& .${prefix}-icon`]: {
    cursor: 'pointer',
    fontSize: 12,
    marginLeft: 2,
    color: theme.colors.iconSecondary
  },

  variants: {
    size: {
      sm: {
        fontSize: theme.fontSizes.callout,
        lineHeight: theme.lineHeights.callout,
        padding: '0 8px',
        [`& .${prefix}-icon`]: {
          fontSize: 8,
          marginLeft: 4
        }
      },
      md: {
        fontSize: theme.fontSizes.callout,
        lineHeight: theme.lineHeights.callout,
        [`& .${prefix}-icon`]: {
          marginLeft: 6
        }
      },
      lg: {
        fontSize: theme.fontSizes.body,
        lineHeight: theme.lineHeights.body,
        [`& .${prefix}-icon`]: {
          marginLeft: 8
        }
      }
    },
    border: {
      true: {
        border: `1px solid ${theme.colors.borderPrimary}`
      },
      false: {
        border: 'none',
        background: 'transparent'
      }
    },
    color: {
      none: {
        background: 'transparent',
        borderColor: 'transparent',
        '&:hover': {
          background: 'transparent'
        }
      },
      primary: {
        borderColor: theme.colors.borderPrimary,
        '&:hover': {
          background: theme.colors.backgroundSecondary,
          borderColor: theme.colors.borderPrimary
        }
      },
      red: {
        background: theme.colors.red1,
        borderColor: theme.colors.red2,
        color: theme.colors.red7,
        [`& .${prefix}-icon`]: {
          color: theme.colors.red9
        },
        '&:hover': {
          background: theme.colors.red2,
          borderColor: theme.colors.red3
        }
      },
      cyan: {
        background: theme.colors.cyan1,
        borderColor: theme.colors.cyan2,
        color: theme.colors.cyan6,
        [`& .${prefix}-icon`]: {
          color: theme.colors.cyan9
        },
        '&:hover': {
          background: theme.colors.cyan2,
          borderColor: theme.colors.cyan3
        }
      },
      blue: {
        background: theme.colors.blue1,
        borderColor: theme.colors.blue2,
        color: theme.colors.blue6,
        [`& .${prefix}-icon`]: {
          color: theme.colors.blue8
        },
        '&:hover': {
          background: theme.colors.blue2,
          borderColor: theme.colors.blue3
        }
      }
    },

    pressed: {
      true: {
        background: theme.colors.thirdaryPressed,
        borderColor: theme.colors.borderSecondary,
        '&:hover': {
          background: theme.colors.thirdaryPressed,
          borderColor: theme.colors.borderSecondary
        }
      }
    }
  },

  compoundVariants: [
    {
      color: 'red',
      pressed: true,
      css: {
        background: theme.colors.red3,
        borderColor: theme.colors.red3,
        '&:hover': {
          background: theme.colors.red3,
          borderColor: theme.colors.red3
        }
      }
    }
  ]
})
