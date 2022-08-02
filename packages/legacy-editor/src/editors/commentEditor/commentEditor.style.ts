import { styled, theme, Avatar } from '@mashcard/design-system'
import { EditorContent } from '../../tiptapRefactor'

export const EditorInput = styled(EditorContent, {
  background: theme.colors.backgroundOverlayPrimary,
  border: `1px solid ${theme.colors.borderOverlayThirdary}`,
  borderRadius: '4px',
  flex: 1,
  padding: '.5rem .625rem',
  position: 'relative',

  '&:before': {
    content: 'attr(data-placeholder)',
    color: theme.colors.typeThirdary,
    lineHeight: '1.125rem',
    position: 'absolute',
    left: '.625rem'
  },
  '& .ProseMirror': {
    caretColor: theme.colors.blue6,
    outline: 'none',

    '& p': {
      fontSize: theme.fontSizes.callout,
      lineHeight: '1rem',
      margin: 0,
      wordBreak: 'break-all'
    }
  }
})

const padding = '.5rem .75rem'

export const EditorContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  padding
})

export const ActionsRow = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  padding,
  paddingTop: 0,
  'button + button': {
    marginLeft: '.5rem'
  }
})

export const EditorAvatar = styled(Avatar, {
  marginRight: '.625rem',
  marginTop: '.2rem'
})
