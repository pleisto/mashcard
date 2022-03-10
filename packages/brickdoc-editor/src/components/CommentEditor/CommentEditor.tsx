import { FC, MouseEvent, useCallback, useContext, useEffect, useState } from 'react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import { useEditor, EditorContent } from '@tiptap/react'
import { Avatar, Button, styled, theme } from '@brickdoc/design-system'
import { EditorContext } from '../../context/EditorContext'
import { BrickdocEventBus, DiscussionMarkInactive } from '@brickdoc/schema'

export interface CommentEditorProps {
  markId: string
}

const EditorInput = styled(EditorContent, {
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
      marginBottom: 0
    }
  }
})

const padding = '.5rem .75rem'

const EditorContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  padding
})

const ActionsRow = styled('div', {
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

const EditorAvatar = styled(Avatar, {
  marginRight: '.625rem',
  marginTop: '.2rem'
})

const DRAFT_KEY = (markId: string) => `brk-comment-draft-${markId}`

export const CommentEditor: FC<CommentEditorProps> = ({ markId }) => {
  const { t } = useContext(EditorContext)
  const placeholderText = t('discussion.editor.placeholder')
  const editor = useEditor({
    autofocus: 'end',
    content: window.localStorage.getItem(DRAFT_KEY(markId)) ?? '',
    extensions: [Document, Text, Paragraph]
  })
  const [placeholder, setPlaceholder] = useState(editor?.isEmpty ? placeholderText : '')
  useEffect(() => {
    const checkPlaceholder = () => {
      if (editor?.isDestroyed) return
      if (editor?.isEmpty && !placeholder) setPlaceholder(placeholderText)
      if (!editor?.isEmpty && placeholder) setPlaceholder('')
    }

    editor?.on('update', checkPlaceholder).on('create', checkPlaceholder)

    return () => {
      editor?.off('update', checkPlaceholder).off('create', checkPlaceholder)
    }
  }, [editor, placeholder, placeholderText])

  useEffect(() => {
    const onContentUpdate = () => {
      window.localStorage.setItem(DRAFT_KEY(markId), editor?.getHTML() ?? '')
    }

    editor?.on('update', onContentUpdate)

    return () => {
      editor?.off('update', onContentUpdate)
    }
  }, [editor, markId])

  useEffect(() => {
    // setTimeout for avoiding scroll event conflict with discussion mark
    setTimeout(() => {
      if (editor?.isFocused) editor?.commands.scrollIntoView()
    }, 70)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCancel = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      // clear draft
      window.localStorage.setItem(DRAFT_KEY(markId), '')
      // inactive mark
      BrickdocEventBus.dispatch(DiscussionMarkInactive({}))
    },
    [markId]
  )

  return (
    <>
      <EditorContainer>
        <EditorAvatar size="sm" />
        <EditorInput editor={editor} data-placeholder={placeholder} />
      </EditorContainer>
      {!editor?.isEmpty && (
        <ActionsRow>
          <Button onClick={handleCancel} size="sm">
            {t('discussion.editor.cancel')}
          </Button>
          <Button size="sm" type="primary">
            {t('discussion.editor.send')}
          </Button>
        </ActionsRow>
      )}
    </>
  )
}
