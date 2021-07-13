import React from 'react'
import { useEditor, EditorContent, EditorOptions, JSONContent } from '@tiptap/react'
import { BasicRichtextExtension, SlashCommandsExtension, BlockCommandsExtension, SyncExtension, SyncHandler } from './extensions'
import './styles.less'

export interface EditorProps {
  options?: Partial<EditorOptions>
  onSync: SyncHandler
  content?: string | JSONContent
}

export const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const editor = useEditor({
    ...props.options,
    extensions: [BasicRichtextExtension, BlockCommandsExtension, SlashCommandsExtension, SyncExtension.configure({ onSync: props.onSync })],
    autofocus: true,
    content: props.content
  })
  return <EditorContent style={{ minHeight: '100vh' }} editor={editor} />
}
