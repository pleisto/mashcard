import React from 'react'
import {
  useEditor as useTiptapEditor,
  EditorContent as TiptapEditorContent,
  Editor as TiptapEditor
} from '@tiptap/react'
import { EditorOptions as TiptapEditorOptions } from '@tiptap/core'
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
  IndentExtension,
  TocBlockExtension,
  SubPageMenuBlockExtension,
  PageLinkBlockExtension
} from './extensions'
import './styles.less'
import { useEditorI18n } from './hooks'
import { EditorDataSource, EditorDataSourceContext } from './dataSource/DataSource'
import { EditorContext, EditorContextData } from './context/EditorContext'
import { BubbleMenu, DiscussionList, ExplorerMenu } from './components'
import { theme } from '@brickdoc/design-system'

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
        <TiptapEditorContent id="brickdoc-editor" className="brickdoc" editor={editor} />
        <DiscussionList />
        <ExplorerMenu />
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

  const typesWithUuid = [
    'blockquote',
    'bulletList',
    'codeBlock',
    'embedBlock',
    'formulaBlock',
    'hardBreak',
    'heading',
    'horizontalRule',
    'imageBlock',
    'listItem',
    'orderedList',
    'paragraph',
    'pdfSection',
    'subPageMenuBlock',
    'tableBlock',
    'tocBlock',
    'spreadsheetBlock'
  ]

  const editorDataSource = externalDataSource

  return useTiptapEditor({
    extensions: [
      BasicRichtextExtension.configure({
        gapcursor: false,
        dropcursor: {
          color: theme.colors.primaryDisable.value,
          width: 2
        },
        link: {
          HTMLAttributes: {
            class: 'brickdoc-link'
          },
          autolink: false
        }
      }),
      EventHandlerExtension,
      SlashCommandsExtension,
      SubPageMenuBlockExtension,
      MentionCommandsExtension.configure({
        editorDataSource
      }),
      UserBlockExtension,
      TocBlockExtension,
      PageLinkBlockExtension,
      brickListExtension,
      IndentExtension,
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
