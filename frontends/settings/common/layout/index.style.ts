import bg from '@/common/assets/ceramicBg.webp'

export const layoutStyle = {
  display: 'flex',
  flex: 'auto',
  flexDirection: 'row',
  minHeight: '100vh',
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover, cover',
  backgroundClip: 'border-box',
  '& > main': {
    margin: '24px 24px 0 0',
    paddingTop: '56px',
    display: 'flex',
    justifyContent: 'center',
    flex: 'auto',
    minHeight: '100vh',
    include: ['ceramicSecondary']
  },
  variants: {
    width: {
      fluid: {
        '&>main>.container': {
          width: '100%',
          margin: '0 2rem'
        }
      },
      fixed: {
        '&>main>.container': {
          width: '900px'
        }
      }
    }
  }
}
