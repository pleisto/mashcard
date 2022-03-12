import { FC, MouseEvent, useCallback, useContext, useEffect } from 'react'
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import { Avatar, Button, styled, theme } from '@brickdoc/design-system'
import { BrickdocEventBus, DiscussionMarkInactive } from '@brickdoc/schema'
import { EditorContext } from '../../context/EditorContext'
import { usePlaceholder } from './usePlaceholder'
import { useExternalProps } from '../../hooks/useExternalProps'
import { Base } from '../../extensions/base'

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

const DRAFT_KEY = (markId: string): string => `brk-comment-draft-${markId}`

const getDraft = (markId: string): JSONContent | undefined => {
  try {
    const local = window.localStorage.getItem(DRAFT_KEY(markId))
    if (!local) return undefined
    return JSON.parse(local)
  } catch (error) {
    console.error(error)
  }

  return undefined
}

const setDraft = (markId: string, content: JSONContent): void => {
  try {
    window.localStorage.setItem(DRAFT_KEY(markId), JSON.stringify(content))
  } catch (error) {
    console.error(error)
  }
}

export const CommentEditorContent: FC<CommentEditorProps> = ({ markId }) => {
  const { t } = useContext(EditorContext)
  const externalProps = useExternalProps()
  const editor = useEditor({
    autofocus: 'end',
    content: getDraft(markId),
    extensions: [
      Base.configure({
        commandHelper: true,
        document: true,
        mentionCommands: {
          externalProps
        },
        pageLink: {
          size: 'sm'
        },
        paragraph: true,
        text: true,
        user: {
          size: 'sm'
        }
      })
    ]
  })
  const [placeholder] = usePlaceholder(editor)

  useEffect(() => {
    const onContentUpdate = (): void => {
      setDraft(markId, editor?.getJSON() ?? [])
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

  const handleContainerClick = useCallback((event: MouseEvent) => {
    event.stopPropagation()
  }, [])

  return (
    <>
      <EditorContainer onClick={handleContainerClick}>
        <EditorAvatar size="sm" />
        <EditorInput editor={editor} data-placeholder={placeholder} />
      </EditorContainer>
      {!editor?.isEmpty && (
        <ActionsRow onClick={handleContainerClick}>
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
