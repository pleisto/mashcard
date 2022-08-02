import { FC, MouseEvent, useCallback, useEffect, useRef } from 'react'
import { Editor, JSONContent } from '@tiptap/core'
import { Button } from '@mashcard/design-system'
import { MashcardEventBus, DiscussionMarkInactive } from '@mashcard/schema'
import { usePlaceholder } from './usePlaceholder'
import { EditorContainer, EditorAvatar, EditorInput, ActionsRow } from './commentEditor.style'
import { useCommentEditor } from './useCommentEditor'
import { clearDraft, getDraft } from './draft'
import { useContentUpdated } from './useContentUpdated'
import { useEditorI18n } from '../../hooks'
import { BaseOptions } from '../../Editor'

export interface CommentEditorProps {
  markId: string
  onSend?: (editor: Editor, content: JSONContent | undefined) => void
  mentionCommandsOptions: BaseOptions['mentionCommands']
}

export const CommentEditorContent: FC<CommentEditorProps> = ({ markId, onSend, mentionCommandsOptions }) => {
  const [t] = useEditorI18n()

  const editor = useRef<Editor | null>(null)

  const handleSend = useCallback(
    (event?: MouseEvent) => {
      event?.stopPropagation()
      console.log('editor', editor)
      if (!editor.current) return
      onSend?.(editor.current, getDraft(markId))
    },
    [markId, onSend]
  )

  editor.current = useCommentEditor({
    defaultContent: getDraft(markId),
    mentionCommands: mentionCommandsOptions,
    onSendComment: handleSend
  })
  const [placeholder] = usePlaceholder(editor.current)

  useContentUpdated(editor.current, markId)

  useEffect(() => {
    // setTimeout for avoiding scroll event conflict with discussion mark
    setTimeout(() => {
      if (editor.current?.isFocused) editor.current?.commands.scrollIntoView()
    }, 70)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCancel = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      clearDraft(markId)
      MashcardEventBus.dispatch(DiscussionMarkInactive({}))
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
        <EditorInput editor={editor.current} data-placeholder={placeholder} />
      </EditorContainer>
      {!editor.current?.isEmpty && (
        <ActionsRow onClick={handleContainerClick}>
          <Button onClick={handleCancel} size="sm">
            {t('discussion.editor.cancel')}
          </Button>
          <Button size="sm" type="primary" onClick={handleSend}>
            {t('discussion.editor.send')}
          </Button>
        </ActionsRow>
      )}
    </>
  )
}
