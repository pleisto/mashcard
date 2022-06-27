import { css, styled, keyframes, theme } from '@mashcard/design-system'

const rotation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

export const MashcardFormulaMenuPopover = css({
  display: 'inline'
})()

export const FormulaResult = styled('div', {
  color: '@basic-color',
  margin: '12px 0',
  fontSize: '14px',
  lineHeight: '20px',
  fontFamily: "'Fira Code'",

  '.formula-result-error': {
    flexDirection: 'column',
    '.formula-result-error-type': {
      marginRight: 12,
      color: '#df5641'
    },
    '.formula-result-error-message': {
      color: '#bfbcc6'
    }
  },

  '.formula-result-ok': {
    '.formula-result-ok-equal': {
      marginRight: 12
    },
    '.formula-result-ok-icon': {
      color: theme.colors.typeThirdary,
      float: 'right'
    }
  }
})

export const MashcardFormulaMenu = styled('div', {
  minWidth: 600,
  width: 656,
  maxWidth: '100%',
  padding: '0px',

  '.formula-menu-row': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,

    '.formula-menu-item': {
      flex: 1,

      '.formula-menu-item-name': {
        display: 'flex',
        flex: 1,

        '.formula-menu-item-name-field': {
          marginRight: 12,
          padding: 1,
          lineHeight: '1.8',
          fontFamily: 'Fira Code',

          '&::placeholder': {
            color: theme.colors.typeThirdary
          }
        },
        '.formula-menu-item-reference-count': {
          color: theme.colors.typeThirdary,
          paddingLeft: 2,
          paddingRight: 2,
          float: 'right'
        },
        '.formula-menu-item-reference-icon': {
          color: theme.colors.typeThirdary,
          paddingLeft: 2,
          paddingRight: 2,
          float: 'right'
        }
      }
    },

    '.formula-menu-item + .formula-menu-item': {
      marginLeft: 24
    }
  }
})

export const MashcardFormulaNormal = css({
  cursor: 'pointer',
  padding: '3px 8px',
  margin: '0 3px',
  borderRadius: 20,
  fontSize: 16,

  '.mashcard-formula-normal-icon': {
    marginRight: 5
  }
})()

export const MashcardFormulaBorderless = css({
  cursor: 'pointer',
  fontFamily: "'Fira Code'"
})()

export const MashcardFormulaEmpty = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f9f9f9',
  borderRadius: 4,
  width: 24,
  height: 24,
  cursor: 'pointer',

  '.mashcard-formula-empty-icon': {
    fontSize: 12,
    color: '#bfbcc6'
  }
})()

export const MashcardFormulaPending = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  cursor: 'pointer',
  position: 'relative',

  '&::before': {
    content: ' ',
    border: '3px solid #FFFFFF',
    borderBottomColor: '#3E3E3E',
    borderRadius: '50%',
    display: 'inline-block',
    '-webkit-animation': `${rotation} 1s linear infinite`,
    animation: `${rotation} 1s linear infinite`,
    position: 'absolute',
    zIndex: 100,
    right: '0%',
    marginTop: -20,
    marginRight: -2
  },

  '.mashcard-formula-pending-icon': {
    fontSize: 12,
    color: ' #bfbcc6'
  }
})()

export const MashcardFormulaError = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  width: 24,
  height: 24,
  cursor: 'pointer',
  position: 'relative',

  '&::before': {
    content: ' ',
    border: '3px solid red',
    borderRadius: 3,
    position: 'absolute',
    zIndex: '1000',
    right: '0%',
    marginTop: -20,
    marginRight: -2
  },

  '.mashcard-formula-error-icon': {
    fontSize: 12,
    color: '#bfbcc6'
  }
})()
