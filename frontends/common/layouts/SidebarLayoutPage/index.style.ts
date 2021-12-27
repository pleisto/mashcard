import bg from '@/common/assets/ceramicBg.webp'
import { theme } from '@brickdoc/design-system'

export const base = {
  display: 'flex',
  flex: 'auto',
  flexDirection: 'row',
  minHeight: '100vh',
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover, cover',
  backgroundClip: 'border-box',
  '& > section': {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '270px',
    height: '100vh',
    padding: '0.1px 0.5rem 0',
    marginTop: '-0.1px',
    '& > footer': {
      marginTop: 'auto',
      bottom: '1rem',
      padding: '0 0.5rem',
      position: 'absolute',
      width: '100%'
    },
    '& > nav': {
      maxHeight: 'calc(100vh - 7rem)',
      overflow: 'scroll',
      h2: {
        fontSize: '0.75rem',
        color: theme.colors.typeSecondary,
        fontWeight: '600',
        padding: '.5rem 1rem',
        marginTop: '1.875rem'
      }
    },
    '& > nav > .brd-btn-text, & > footer .brd-btn-text, & > .brk-btn-text ': {
      border: 0,
      padding: '0.375rem 0.75rem',
      height: 'auto',
      width: '100%',
      textAlign: 'left',
      color: theme.colors.typeSecondary
    }
  },
  '& > main': {
    display: 'flex',
    flexDirection: 'column',
    flex: 'auto',
    height: '100vh',
    '& > header': {
      height: '3.5rem',
      padding: '0 0.5rem 0 0',
      lineHeight: '3.5rem'
    },
    '& > article': {
      display: 'flex',
      minHeight: '0',
      flex: 'auto',
      flexDirection: 'column',
      '--brd-editor-max-width': '960px',
      borderRadius: '2px',
      include: ['ceramicSecondary']
    }
  },
  '& > aside': {
    width: '3rem'
  }
}
