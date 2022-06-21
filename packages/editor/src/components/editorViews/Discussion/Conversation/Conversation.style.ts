import { styled, theme, Button, css } from '@mashcard/design-system'
import { CommentCard } from '../Comment'

export const ConversationCard = styled('div', {
  backgroundColor: theme.colors.ceramicPrimary,
  border: `1px solid ${theme.colors.borderSecondary}`,
  borderRadius: '4px',
  boxShadow: '0px 2px 4px rgba(44, 91, 255, 0.02), 0px 4px 4px rgba(0, 0, 0, 0.04)',
  marginBottom: '.5rem',

  [`& ${CommentCard}:last-child`]: {
    paddingBottom: '.5rem'
  }
})

export const ConversationHeader = styled('div', {
  alignItems: 'center',
  backgroundColor: theme.colors.backgroundOverlaySecondary,
  display: 'flex',
  flexDirection: 'row',
  padding: '.5rem .75rem'
})

export const ContentQuote = styled('blockquote', {
  color: theme.colors.typeSecondary,
  flex: 1,
  fontFamily: 'inherit',
  fontSize: '.75rem',
  lineHeight: '1.125rem',
  margin: 0,
  marginRight: '1rem',
  overflow: 'hidden',
  paddingLeft: '.25rem',
  position: 'relative',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  '&:before': {
    backgroundColor: theme.colors.grey4,
    content: '',
    height: '.75rem',
    left: '-2px',
    position: 'absolute',
    transform: 'translateY(-50%)',
    top: '50%',
    width: '2px'
  }
})

export const ActionButton = styled(Button, {
  variants: {
    size: {
      sm: {
        height: '1rem',
        padding: 0,
        width: '1rem',
        '&:hover, &:focus, &:active': {
          background: theme.colors.secondaryHover
        }
      }
    }
  }
})

export const ResolvedStateWrapper = styled('span', {
  alignItems: 'center',
  backgroundColor: theme.colors.iconThirdary,
  borderRadius: '1rem',
  display: 'flex',
  height: '1rem',
  justifyContent: 'center',
  width: '1rem',
  variants: {
    status: {
      opened: {
        backgroundColor: 'transparent'
      },
      resolved: {
        backgroundColor: theme.colors.iconThirdary,
        color: theme.colors.white
      },
      deleted: {}
    }
  }
})

export const menuIconStyles = css({
  height: '1.3rem',
  width: '1.3rem'
})
