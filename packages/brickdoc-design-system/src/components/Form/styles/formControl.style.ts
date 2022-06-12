import { styled, theme } from '../../../themes'

const gap = '8px'
const maskStyle = {
  content: '*',
  color: theme.colors.errorDefault,
  lineHeight: '1',
  display: 'inline-block'
}

export const Description = styled('div', {
  fontSize: theme.fontSizes.subHeadline,
  color: theme.colors.typeThirdary
})

export const InvalidMsg = styled('div', {
  fontSize: theme.fontSizes.subHeadline,
  color: theme.colors.errorDefault
})

export const FormControlWrapper = styled('div', {
  display: 'flex',
  '& > label': {
    display: 'inline-flex',
    color: theme.colors.typePrimary,
    fontSize: theme.fontSizes.subHeadline,
    lineHeight: theme.lineHeights.subHeadline,
    fontWeight: 500
  },
  '&[hidden]': {
    display: 'none'
  },
  variants: {
    layout: {
      vertical: {
        flexDirection: 'column',
        marginBottom: '1.5rem',
        '& > label': {
          marginBottom: gap
        },
        [`${Description}`]: {
          marginTop: `calc(${gap} / 2 * -1)`,
          marginBottom: gap
        },
        [`${InvalidMsg}`]: {
          marginTop: gap
        }
      },
      horizontal: {
        flexDirection: 'row',
        alignItems: 'baseline',
        '& > label': {
          marginRight: gap
        },
        [`${Description}, ${InvalidMsg}`]: {
          marginTop: gap
        },
        [`${Description}+${InvalidMsg}`]: {
          marginTop: `calc(${gap} / 2)`
        }
      }
    },
    requiredMask: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      layout: 'vertical',
      requiredMask: true,
      css: {
        '&>label:after': {
          ...maskStyle,
          marginLeft: '4px'
        }
      }
    },
    {
      layout: 'horizontal',
      requiredMask: true,
      css: {
        '&>label:before': {
          ...maskStyle,
          marginRight: '4px'
        }
      }
    }
  ]
})

export const FieldWrapper = styled('div', {
  display: 'flex',
  alignItems: 'start',
  width: '100%',
  outline: 'none',
  variants: {
    inlineWrapper: {
      false: {
        flexDirection: 'column'
      },
      true: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        '&>button': {
          marginRight: '1rem'
        },
        '&>button:last-child': {
          marginRight: 0
        }
      }
    }
  }
})
