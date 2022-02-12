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
    margin: '24px 24px 0',
    paddingTop: '56px',
    display: 'flex',
    justifyContent: 'center',
    flex: 'auto',
    height: 'calc(100vh - 24px)',
    scrollbarGutter: 'stable both-edges',
    overflowY: 'auto',
    include: ['ceramicSecondary'],
    '&>.container:last-child:after': {
      // fix scrollbar bottom padding
      // @see https://stackoverflow.com/questions/61380918/add-extra-scroll-space-of-the-bottom-of-an-html-sidebar
      display: 'block',
      width: '100%',
      height: '56px',
      content: ''
    }
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
