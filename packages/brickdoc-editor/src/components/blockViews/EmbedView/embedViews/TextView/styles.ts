import { styled, theme } from '@brickdoc/design-system'
import { maxWidth } from '../../styles'

export const EmbedToolbarContainer = styled('div', {
  left: '5rem',
  opacity: 0,
  paddingBottom: '5px',
  position: 'absolute',
  top: 0,
  transform: 'translate(-50%, -100%)',
  transition: 'opacity 200ms ease-in-out',
  pointerEvents: 'none'
})

export const EmbedToolbarContainerInner = styled('div', {
  background: theme.colors.backgroundPrimary,
  borderRadius: '4px'
})

export const TextViewLayout = styled('div', {
  maxWidth: '100%',
  position: 'relative',

  '&:hover': {
    [`& ${EmbedToolbarContainer}`]: {
      opacity: 1,
      pointerEvents: 'inherit'
    }
  }
})

export const TextViewContainerInner = styled('div', {
  alignItems: 'center',
  display: 'inline-flex',
  flexDirection: 'row',
  maxWidth
})

export const TextViewContainer = styled('div', {
  maxWidth: '100%',
  overflow: 'hidden'
})

export const TextViewIcon = styled('span', {
  marginRight: '.4375rem',
  fontSize: '1.125rem',
  width: '1.125rem'
})

export const TextViewContent = styled('div', {
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden'
})

export const Name = styled('span', {
  fontSize: theme.fontSizes.body,
  fontWeight: 400,
  lineHeight: '1.5rem',
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  borderBottom: `1px solid ${theme.colors.grey5}`
})
