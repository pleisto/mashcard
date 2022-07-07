import bg from '@/common/assets/ceramic-bg.webp'
import { theme } from '@mashcard/design-system'

export const layoutStyle = {
  display: 'flex',
  flex: 'auto',
  flexDirection: 'row',
  minHeight: '100vh',
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover, cover',
  backgroundClip: 'border-box',
  '& > main': {
    paddingTop: '80px',
    display: 'flex',
    justifyContent: 'center',
    flex: 'auto',
    height: '100vh',
    scrollbarGutter: 'stable both-edges',
    overflowY: 'auto',
    background: theme.colors.backgroundPrimary,
    // include: ['ceramicSecondary'],
    '&>.container:last-child:after': {
      // fix scrollbar bottom padding
      // @see https://stackoverflow.com/questions/61380918/add-extra-scroll-space-of-the-bottom-of-an-html-sidebar
      display: 'block',
      width: '100%',
      height: '80px',
      content: ''
    }
  },
  variants: {
    width: {
      fluid: {
        '&>main>.container': {
          width: '100%'
        }
      },
      fixed: {
        '&>main>.container': {
          width: '44rem'
        }
      }
    }
  }
}
