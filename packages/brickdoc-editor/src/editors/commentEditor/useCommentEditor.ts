import { useEditor, Editor, Content } from '@tiptap/react'
import { Base } from '../../extensions/base'
import { useEditorPropsContext } from '../../hooks/useEditorPropsContext'

export function useCommentEditor(defaultContent?: Content): Editor | null {
  const editorProps = useEditorPropsContext()
  return useEditor({
    autofocus: 'end',
    content: defaultContent,
    extensions: [
      Base.configure({
        commandHelper: true,
        document: true,
        mentionCommands: {
          editorProps,
          size: 'sm'
        },
        pageLink: {
          size: 'sm'
        },
        paragraph: { native: true },
        text: true,
        user: {
          size: 'sm'
        }
      })
    ]
  })
}
