import React from 'react'
import {
  useEditor as useTiptapEditor,
  EditorContent as TiptapEditorContent,
  Editor as TiptapEditor
} from '@tiptap/react'
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
  EventHandlerExtension,
  UserBlockExtension,
  PageLinkBlockExtension
} from './extensions'
import './styles.less'
import { useEditorI18n } from './hooks'
import { EditorDataSource, EditorDataSourceContext } from './dataSource/DataSource'
import { EditorContext, EditorContextData } from './context/EditorContext'
import { BubbleMenu } from './components'

export { useEditorI18n }

export interface EditorContentProps {
  editor: TiptapEditor | null
  editorDataSource: EditorDataSource
}

export const EditorContent: React.FC<EditorContentProps> = ({ editor, editorDataSource }) => {
  const [t] = useEditorI18n()
  const editorContext = React.useMemo<EditorContextData>(() => ({ editor, t }), [editor, t])
  return (
    <EditorContext.Provider value={editorContext}>
      <EditorDataSourceContext.Provider value={editorDataSource}>
        <BubbleMenu editor={editor} />
        <TiptapEditorContent className="brickdoc" editor={editor} />
      </EditorDataSourceContext.Provider>
    </EditorContext.Provider>
  )
}

export interface EditorOptions extends Partial<TiptapEditorOptions> {
  externalDataSource: EditorDataSource
  onSave: SyncExtensionOptions['onSave']
}

export function useEditor(options: EditorOptions): TiptapEditor | null {
  const { onSave, editable, externalDataSource, ...restOptions } = options
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
    'imageBlock',
    'embedBlock',
    'listItem',
    'orderedList',
    'paragraph',
    'pdfSection',
    'tableBlock'
  ]

  const editorDataSource = externalDataSource

  return useTiptapEditor({
    extensions: [
      BasicRichtextExtension.configure({
        gapcursor: false,
        link: {
          autolink: false
        }
      }),
      EventHandlerExtension,
      SlashCommandsExtension,
      MentionCommandsExtension.configure({
        editorDataSource
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
