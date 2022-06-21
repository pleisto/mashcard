import { styled, theme, Button } from '@mashcard/design-system'
import { maxWidth } from '../../EmbedView.style'
import { EmbedToolbar } from '../EmbedToolbar'

export const EmbedToolbarContainer = styled('div', {
  bottom: '.5rem',
  opacity: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: '.75rem',
  transition: 'opacity 100ms ease-in-out',

  [`& ${EmbedToolbar}`]: {}
})

export const Content = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  position: 'relative',

  '&:hover': {
    [`& ${EmbedToolbarContainer}`]: {
      opacity: 1,
      pointerEvents: 'inherit'
    }
  },

  variants: {
    type: {
      default: {
        padding: '1rem'
      },
      file: {
        padding: '.625rem'
      }
    }
  }
})

export const Cover = styled('div', {
  alignSelf: 'normal',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '9rem',
  width: '14.25rem'
})

export const Title = styled('div', {
  fontSize: theme.fontSizes.body,
  fontWeight: 600,
  lineHeight: '1.5rem',
  display: '-webkit-box',
  '-webkit-line-clamp': 1,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  maxWidth: '100%',
  whiteSpace: 'normal',
  wordBreak: 'break-all',

  variants: {
    type: {
      default: {
        marginBottom: '.375rem'
      },
      file: {
        marginBottom: 0
      }
    }
  }
})

export const Description = styled('div', {
  color: theme.colors.typeThirdary,
  display: '-webkit-box',
  fontSize: theme.fontSizes.callout,
  fontWeight: 450,
  height: '1.25rem',
  lineHeight: '1.25rem',
  '-webkit-line-clamp': 3,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  maxWidth: '100%',
  whiteSpace: 'normal',
  wordBreak: 'break-all',

  variants: {
    type: {
      default: {
        marginBottom: '.25rem'
      },
      file: {
        marginBottom: 0
      }
    }
  }
})

export const Link = styled('div', {
  alignItems: 'center',
  color: theme.colors.typeThirdary,
  display: 'flex',
  flexDirection: 'row',
  fontSize: theme.fontSizes.callout,
  fontWeight: 450,
  maxWidth: '100%'
})

export const LinkText = styled('span', {
  display: '-webkit-box',
  '-webkit-line-clamp': 1,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  maxWidth: '72%',
  whiteSpace: 'normal',
  wordBreak: 'break-all'
})

export const iconMarginRight = '.25rem'

export const LinkIcon = styled('img', {
  height: '.875rem',
  marginRight: iconMarginRight,
  width: '.875rem'
})

export const FileIconWrapper = styled('div', {
  include: ['flexCenter'],

  display: 'flex',
  fontSize: '.875rem',
  height: '.875rem',
  marginRight: iconMarginRight,
  width: '.875rem'
})

export const FileCoverWrapper = styled('div', {
  include: ['flexCenter'],

  alignSelf: 'center',
  display: 'flex',
  fontSize: '1.75rem',
  height: '2rem',
  marginLeft: '1.25rem',
  width: '2rem',

  '> span': {
    fontSize: '1.75rem'
  },

  '> img': {
    width: '100%'
  }
})

export const CardContainer = styled(Button, {
  variants: {
    contentType: {
      default: {
        maxWidth
      },
      file: {
        maxWidth: '33rem'
      }
    },
    size: {
      md: {
        alignItems: 'stretch',
        background: theme.colors.backgroundPrimary,
        border: `1px solid ${theme.colors.borderPrimary}`,
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'row',
        height: 'auto',
        justifyContent: 'center',
        minHeight: '2.5rem',
        padding: '0',
        position: 'relative',
        textAlign: 'left',
        width: '100%',

        '&:hover': {
          background: theme.colors.backgroundPrimary
        }
      }
    }
  }
})
