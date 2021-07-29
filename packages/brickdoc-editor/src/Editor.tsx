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
import { ImageSectionOptions } from './extensions/imageSection'

export interface EditorContentProps {
  editor: TiptapEditor | null
}

export const EditorContent: React.FC<EditorContentProps> = ({ editor }: EditorContentProps) => {
  return (
    <>
      <BubbleMenu editor={editor} />
      <TiptapEditorContent className="brickdoc" editor={editor} />
    </>
  )
}

export interface EditorOptions extends Partial<TiptapEditorOptions> {
  onCommit: SyncExtensionOptions['onCommit']
  prepareFileUpload?: ImageSectionOptions['prepareFileUpload']
}

export function useEditor(options: EditorOptions): TiptapEditor | null {
  const { onCommit, prepareFileUpload, ...restOptions } = options
  return useTiptapEditor({
    extensions: [
      BasicRichtextExtension.configure({ imageSection: { prepareFileUpload }, pdfSection: { prepareFileUpload } }),
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
