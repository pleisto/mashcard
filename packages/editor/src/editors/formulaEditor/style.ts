import { css, theme } from '@mashcard/design-system'

const onlyBottomBorder = {
  borderTopColor: 'transparent!important',
  borderLeftColor: 'transparent!important',
  borderRightColor: 'transparent!important',
  outline: 'none!important'
}

export const MashcardFomulaEditor = css({
  variants: {
    maxScreen: {
      true: {
        '.ProseMirror': {
          height: 300,
          overflow: 'hidden',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            appearance: 'none'
          },
          'p::before': {
            transform: 'none',
            top: '0%'
          },
          borderBottomColor: theme.colors.dividerPrimary,
          '&:hover': {
            borderBottomColor: theme.colors.dividerPrimary
          },
          '&:focus-within': {
            borderBottomColor: theme.colors.dividerPrimary
          }
        }
      }
    }
  },
  '.ProseMirror': {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    minWidth: '0',
    padding: '1px 11px',
    fontFamily: 'Fira Code',
    color: theme.colors.typePrimary,
    fontSize: '1em',
    backgroundImage: 'none',
    lineHeight: '1.8',
    border: `1px solid ${theme.colors.grey3}`,
    borderRadius: '0px',
    transition: 'all .3s',

    ...onlyBottomBorder,
    borderBottomColor: 'transparent',
    paddingLeft: '0!important',
    paddingRight: '0!important',
    boxShadow: 'none',
    '&::placeholder': {
      position: 'unset',
      color: theme.colors.typeThirdary
    },
    '&:hover': {
      ...onlyBottomBorder,
      borderBottomColor: theme.colors.dividerPrimary
    },
    '&:focus-within': {
      ...onlyBottomBorder,
      borderBottomColor: theme.colors.primaryDefault
    }
  },
  p: {
    marginBottom: '0px',
    marginTop: '2px',
    mark: {
      color: 'unset',
      backgroundColor: 'unset',

      '&:hover': {
        backgroundColor: theme.colors.secondaryHover
      }
    }
  }
})
