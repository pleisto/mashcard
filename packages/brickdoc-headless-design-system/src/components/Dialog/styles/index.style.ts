import { css, theme } from '../../../themes'

export const maskStyle = css({
  position: 'fixed',
  inset: '0px',
  zIndex: theme.zIndices.mask,
  '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
  background: theme.colors.overlayPrimary,
  display: 'flex',
  include: ['flexCenter'],
  width: '100%',
  height: '100%'
})

export const dialogStyle = css({
  background: theme.colors.ceramicPrimary,
  include: ['refractionPrimary'],
  borderRadius: '8px',
  minWidth: '384px',
  maxWidth: 'calc(100vw - 3rem)',
  main: {
    padding: '24px 20px',
    header: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      '& > h1': {
        fontWeight: 500,
        lineHeight: '1.4',
        fontSize: theme.fontSizes.title5,
        margin: 0,
        padding: 0
      }
    }
  },
  footer: {
    padding: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    button: {
      height: '40px'
    }
  }
})
