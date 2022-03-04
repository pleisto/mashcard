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
    '.mainActions header > .brk-logo': {
      height: '22px',
      width: '84px',
      margin: '1rem 18px'
    },
    '& > footer': {
      marginBottom: '1rem',
      width: '100%'
    },
    '.mainActions nav': {
      overflow: 'hidden'
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

export const sidebarButtonStyles = {
  color: theme.colors.typeSecondary,
  display: 'flex',
  fontSize: theme.fontSizes.subHeadline,
  justifyContent: 'flex-start',
  marginBottom: '1.5rem',
  width: '100%'
}
