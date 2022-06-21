import { css, theme } from '@mashcard/design-system'

export const MashcardFomulaEditor = css({
  '.ProseMirror': {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    minWidth: '0',
    padding: '1px 11px',
    color: theme.colors.typePrimary,
    fontSize: '1em',
    lineHeight: '1.8',
    backgroundColor: theme.colors.white,
    backgroundImage: 'none',
    border: `1px solid ${theme.colors.grey3}`,
    borderRadius: '4px',
    transition: 'all .3s'
  },
  p: {
    marginBottom: 0,

    mark: {
      color: 'unset',
      backgroundColor: 'unset',
      fontFamily: 'Fira Code',

      '&:hover': {
        backgroundColor: theme.colors.secondaryHover
      }
    }
  }
})()
