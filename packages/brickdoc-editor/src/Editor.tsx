import React from 'react'
import { useEditor as useTiptapEditor, EditorContent as TiptapEditorContent, Editor as TiptapEditor } from '@tiptap/react'
import { EditorOptions as TiptapEditorOptions } from '@tiptap/core'
import {
  BasicRichtextExtension,
  SlashCommandsExtension,
  SyncExtension,
  brickListExtension,
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
  getAttachmentUrl?: PdfSectionOptions['getAttachmentUrl']
}

export function useEditor(options: EditorOptions): TiptapEditor | null {
  const {
    onSave,
    prepareFileUpload,
    fetchUnsplashImages,
    fetchWebsiteMeta,
    getImageUrl,
    getAttachmentUrl,
    useDatabaseRows,
    editable,
    ...restOptions
  } = options
  return useTiptapEditor({
    extensions: [
      BasicRichtextExtension.configure({
        imageSection: { prepareFileUpload, fetchUnsplashImages, getImageUrl },
        pdfSection: { prepareFileUpload, getAttachmentUrl },
        tableBlock: { useDatabaseRows },
        linkBlock: { fetchWebsiteMeta, prepareFileUpload, getAttachmentUrl }
      }),
      EventHandlerExtension,
      SlashCommandsExtension,
      PlaceholderExtension,
      brickListExtension,
      SyncExtension.configure({ onSave })
    ],
    autofocus: true,
    editable,
    ...restOptions
  })
}
