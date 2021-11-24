import React from 'react'
import { useEditor as useTiptapEditor, EditorContent as TiptapEditorContent, Editor as TiptapEditor } from '@tiptap/react'
import { EditorOptions as TiptapEditorOptions } from '@tiptap/core'
import Placeholder from '@tiptap/extension-placeholder'
import UniqueID from '@tiptap/extension-unique-id'
import {
  BasicRichtextExtension,
  SlashCommandsExtension,
  MentionCommandsExtension,
  SyncExtension,
  brickListExtension,
  SyncExtensionOptions,
  TableExtensionOptions,
  EventHandlerExtension,
  BubbleMenu,
  PdfSectionOptions,
  ImageSectionOptions,
  LinkBlockOptions,
  UserBlockExtension,
  PageLinkBlockExtension,
  MentionCommandsOptions,
  FormulaOptions
} from './extensions'
import './styles.less'
import { useEditorI18n } from './hooks'

export type { ImageSectionAttributes } from './extensions'

export { useEditorI18n }

export interface EditorContentProps {
  editor: TiptapEditor | null
  formulaContextActions: FormulaOptions['formulaContextActions']
}

export const EditorContent: React.FC<EditorContentProps> = ({ editor, formulaContextActions }: EditorContentProps) => {
  return (
    <>
      <BubbleMenu editor={editor} formulaContextActions={formulaContextActions} />
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
  getCollaborators?: MentionCommandsOptions['getCollaborators']
  getPages?: MentionCommandsOptions['getPages']
  formulaContextActions: FormulaOptions['formulaContextActions']
}

export function useEditor(options: EditorOptions): TiptapEditor | null {
  const {
    onSave,
    prepareFileUpload,
    fetchUnsplashImages,
    fetchWebsiteMeta,
    getImageUrl,
    getAttachmentUrl,
    getCollaborators,
    getPages,
    formulaContextActions,
    useDatabaseRows,
    editable,
    ...restOptions
  } = options
  const { t } = useEditorI18n()
  const PlaceholderExtension = Placeholder.configure({
    placeholder: t('placeholder')
  })

  const typesWithUuid = [
    'blockquote',
    'bulletList',
    'codeBlock',
    'hardBreak',
    'heading',
    'horizontalRule',
    'imageSection',
    'linkBlock',
    'listItem',
    'orderedList',
    'paragraph',
    'pdfSection',
    'tableBlock'
  ]

  return useTiptapEditor({
    extensions: [
      BasicRichtextExtension.configure({
        imageSection: { prepareFileUpload, fetchUnsplashImages, getImageUrl },
        pdfSection: { prepareFileUpload, getAttachmentUrl },
        tableBlock: { useDatabaseRows },
        linkBlock: { fetchWebsiteMeta, prepareFileUpload, getAttachmentUrl },
        formula: { formulaContextActions }
      }),
      EventHandlerExtension,
      SlashCommandsExtension,
      MentionCommandsExtension.configure({
        getCollaborators,
        getPages
      }),
      UserBlockExtension,
      PageLinkBlockExtension,
      PlaceholderExtension,
      brickListExtension,
      UniqueID.configure({
        attributeName: 'uuid',
        types: typesWithUuid
      }),
      SyncExtension.configure({ onSave, types: typesWithUuid })
    ],
    autofocus: true,
    editable,
    ...restOptions
  })
}
