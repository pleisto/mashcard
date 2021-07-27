import React from 'react'
import { useEditor as useTiptapEditor, EditorContent as TiptapEditorContent, Editor as TiptapEditor } from '@tiptap/react'
import { EditorOptions as TiptapEditorOptions } from '@tiptap/core'
import {
  BasicRichtextExtension,
  SlashCommandsExtension,
  BlockCommandsExtension,
  SyncExtension,
  BulletListExtension,
  PlaceholderExtension,
  SyncExtensionOptions,
  BubbleMenu
} from './extensions'
import './styles.less'

export interface EditorProps {
  editor: TiptapEditor
}

export const EditorContent: React.FC<EditorProps> = ({ editor }: EditorProps) => {
  return (
    <>
      <BubbleMenu editor={editor} />
      <TiptapEditorContent className="brickdoc" editor={editor} />
    </>
  )
}

export interface EditorOptions extends Partial<TiptapEditorOptions> {
  onCommit: SyncExtensionOptions['onCommit']
}

export function useEditor(options: EditorOptions): TiptapEditor | null {
  const { onCommit, ...restOptions } = options
  return useTiptapEditor({
    extensions: [
      BasicRichtextExtension,
      BlockCommandsExtension,
      SlashCommandsExtension,
      PlaceholderExtension,
      BulletListExtension,
      SyncExtension.configure({ onCommit })
    ],
    autofocus: true,
    ...restOptions
  })
}
