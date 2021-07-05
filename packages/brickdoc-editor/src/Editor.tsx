import React from 'react'
import { useEditor, EditorContent, EditorOptions } from '@tiptap/react'
import { BasicRichtextExtension, SlashCommandsExtension, BlockCommandsExtension, SyncExtension, SyncCallback } from './extensions'
import './styles.less'

export interface EditorProps {
  options?: Partial<EditorOptions>
  syncCallback: SyncCallback
  content: string
}

export const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const editor = useEditor({
    ...props.options,
    extensions: [
      BasicRichtextExtension,
      BlockCommandsExtension,
      SlashCommandsExtension,
      SyncExtension.configure({ callback: props.syncCallback })
    ],
    autofocus: true,
    content: props.content
  })
  return <EditorContent style={{ minHeight: '100vh' }} editor={editor} />
}
