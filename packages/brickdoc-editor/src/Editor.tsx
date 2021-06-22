import React from 'react'
import { useEditor, EditorContent, EditorOptions } from '@tiptap/react'
import { BasicRichtextExtension } from './extensions'
import './styles.less'

export interface EditorProps {
  options?: Partial<EditorOptions>
}

export const Editor: React.FC<EditorProps> = (props: EditorProps)=>{
  const editor = useEditor({
    ...props.options,
    extensions: [
      BasicRichtextExtension,
    ],
    autofocus: true,
  })
  return <EditorContent style={{ minHeight: '100vh' }} editor={editor} />
}

