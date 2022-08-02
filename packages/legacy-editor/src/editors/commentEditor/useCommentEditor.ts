import { Editor, Content } from '@tiptap/core'
import { useEditor } from '../../tiptapRefactor'
import { Comment } from '../../extensions'
import { Base, BaseOptions } from '../../extensions/base'

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
  return useEditor({
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
}
