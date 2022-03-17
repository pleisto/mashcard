import { FC, MouseEvent, useCallback, useContext, useEffect } from 'react'
import { Editor, JSONContent } from '@tiptap/core'
import { Button } from '@brickdoc/design-system'
import { BrickdocEventBus, DiscussionMarkInactive } from '@brickdoc/schema'
import { EditorContext } from '../../context/EditorContext'
import { usePlaceholder } from './usePlaceholder'
import { EditorContainer, EditorAvatar, EditorInput, ActionsRow } from './styled'
import { useCommentEditor } from './useCommentEditor'
import { clearDraft, getDraft } from './draft'
import { useContentUpdated } from './useContentUpdated'

export interface CommentEditorProps {
  markId: string
  onSend?: (editor: Editor, content: JSONContent | undefined) => void
}

export const CommentEditorContent: FC<CommentEditorProps> = ({ markId, onSend }) => {
  const { t } = useContext(EditorContext)
  const editor = useCommentEditor(getDraft(markId))
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
