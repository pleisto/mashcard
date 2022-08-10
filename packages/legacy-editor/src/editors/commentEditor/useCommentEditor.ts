import { Editor, Content } from '@tiptap/core'
import { useEditor } from '../../tiptapRefactor'
import { Comment, CommentOptions } from '../../extensions'
import { Base, BaseOptions } from '../../extensions/base'
import { useEffect } from 'react'

export interface CommentEditorOptions {
  defaultContent?: Content
  onSendComment: () => void
  mentionCommands: BaseOptions['mentionCommands']
}

export function useCommentEditor({
  defaultContent,
  mentionCommands,
  onSendComment
}: CommentEditorOptions): Editor | null {
  let editor: Editor | null = null

  useEffect(() => {
    const comment = editor?.extensionManager.extensions.find(extension => extension.name === Comment.name)
    if (comment) (comment?.options as CommentOptions).onSendComment = onSendComment
  }, [editor, onSendComment])

  editor = useEditor({
    autofocus: 'end',
    content: defaultContent,
    extensions: [
      Base.configure({
        commandHelper: true,
        document: true,
        mentionCommands:
          typeof mentionCommands !== 'boolean'
            ? {
                size: 'sm',
                ...mentionCommands
              }
            : false,
        pageLink:
          typeof mentionCommands !== 'boolean'
            ? {
                size: 'sm',
                pages: mentionCommands.pages
              }
            : false,
        paragraph: { native: true },
        text: true,
        user: {
          size: 'sm'
        }
      }),
      Comment.configure({
        onSendComment
      })
    ]
  })

  return editor
}
