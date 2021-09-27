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
  TableExtensionOptions,
  EventHandlerExtension,
  BubbleMenu
} from './extensions'
import './styles.less'
import { ImageSectionOptions } from './extensions/imageSection'
import { PdfSectionOptions } from './extensions/pdfSection'
import { LinkBlockOptions } from './extensions/linkBlock'

export type { ImageSectionAttributes } from './extensions'

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
  onSave: SyncExtensionOptions['onSave']
  useDatabaseRows?: TableExtensionOptions['useDatabaseRows']
  prepareFileUpload?: ImageSectionOptions['prepareFileUpload']
  fetchUnsplashImages?: ImageSectionOptions['fetchUnsplashImages']
  fetchWebsiteMeta?: LinkBlockOptions['fetchWebsiteMeta']
  getImageUrl?: ImageSectionOptions['getImageUrl']
  getPdfUrl?: PdfSectionOptions['getPdfUrl']
}

export function useEditor(options: EditorOptions): TiptapEditor | null {
  const {
    onSave,
    prepareFileUpload,
    fetchUnsplashImages,
    fetchWebsiteMeta,
    getImageUrl,
    getPdfUrl,
    useDatabaseRows,
    editable,
    ...restOptions
  } = options
  return useTiptapEditor({
    extensions: [
      BasicRichtextExtension.configure({
        imageSection: { prepareFileUpload, fetchUnsplashImages, getImageUrl },
        pdfSection: { prepareFileUpload, getPdfUrl },
        tableBlock: { useDatabaseRows },
        linkBlock: { fetchWebsiteMeta }
      }),
      EventHandlerExtension,
      BlockCommandsExtension,
      SlashCommandsExtension,
      PlaceholderExtension,
      BulletListExtension,
      SyncExtension.configure({ onSave })
    ],
    autofocus: true,
    editable,
    ...restOptions
  })
}
