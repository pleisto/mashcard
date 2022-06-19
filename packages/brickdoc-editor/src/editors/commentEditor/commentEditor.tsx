import { FC, MouseEvent, useCallback, useEffect } from 'react'
import { Editor, JSONContent } from '@tiptap/core'
import { Button } from '@brickdoc/design-system'
import { BrickdocEventBus, DiscussionMarkInactive } from '@brickdoc/schema'
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
  const editor = useCommentEditor({ defaultContent: getDraft(markId), mentionCommands: mentionCommandsOptions })
  const [placeholder] = usePlaceholder(editor)

  useContentUpdated(editor, markId)

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
      clearDraft(markId)
      BrickdocEventBus.dispatch(DiscussionMarkInactive({}))
    },
    [markId]
  )

  const handleSend = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      if (!editor) return
      onSend?.(editor, getDraft(markId))
    },
    [editor, markId, onSend]
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
          <Button size="sm" type="primary" onClick={handleSend}>
            {t('discussion.editor.send')}
          </Button>
        </ActionsRow>
      )}
    </>
  )
}
