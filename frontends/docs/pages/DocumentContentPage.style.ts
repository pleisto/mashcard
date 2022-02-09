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
    width: '270px',
    height: '100vh',
    padding: '0.1px 0.5rem 0',
    marginTop: '-0.1px',
    justifyContent: 'space-between',
    '.mainActions header img': {
      height: '22px',
      width: '84px',
      margin: '1rem 18px'
    },
    '& > footer': {
      marginBottom: '1rem',
      width: '100%'
    },
    '.mainActions nav': {
      overflow: 'hidden',
      h2: {
        fontSize: '0.75rem',
        color: theme.colors.typeSecondary,
        fontWeight: '600',
        padding: '.5rem 1rem',
        marginTop: '1.875rem'
      }
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
