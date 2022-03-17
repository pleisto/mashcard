import { useEditor, Editor, Content } from '@tiptap/react'
import { Base } from '../../extensions/base'
import { useExternalProps } from '../../hooks/useExternalProps'

export function useCommentEditor(defaultContent?: Content): Editor | null {
  const externalProps = useExternalProps()
  return useEditor({
    autofocus: 'end',
    content: defaultContent,
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
        paragraph: { native: true },
        text: true,
        user: {
          size: 'sm'
        }
      })
    ]
  })
}
