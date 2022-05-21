import { useMemo, FC } from 'react'
import {
  useEditor as useTiptapEditor,
  EditorContent as TiptapEditorContent,
  Editor as TiptapEditor
} from '@tiptap/react'
import { EditorOptions as TiptapEditorOptions } from '@tiptap/core'
import * as Y from 'yjs'
import { theme } from '@brickdoc/design-system'
import { useEditorI18n } from '../../hooks'
import { EditorContext, EditorContextData } from '../../context/EditorContext'
import { DiscussionList, ExplorerMenu } from '../../components/editorViews'
import { BubbleMenu } from '../../components/extensionViews'
import { SyncOptions } from '../../extensions'
import { Base } from '../../extensions/base'
import { useDrawerService } from '../../components/ui/Drawer'
import { useDropBlock, useUndo } from '../../helpers'
import { documentEditorStyles, brickdocCls } from './styles'
import { EditorProps, useEditorPropsEffect } from '../../context'

export interface EditorContentProps extends EditorProps {
  editor: TiptapEditor | null
}

export const EditorContent: FC<EditorContentProps> = ({ editor, ...props }) => {
  const [t] = useEditorI18n()
  const editorContext = useMemo<EditorContextData>(() => ({ editor, t }), [editor, t])
  useDrawerService()
  useDropBlock(editor)
  useUndo(editor)
  useEditorPropsEffect(props)

  return (
    <EditorContext.Provider value={editorContext}>
      <BubbleMenu editor={editor} />
        <TiptapEditorContent className={brickdocCls} editor={editor} />
        <DiscussionList />
        <ExplorerMenu editor={editor} />
    </EditorContext.Provider>
  )
}

export interface EditorOptions extends Partial<TiptapEditorOptions> {
  props: EditorProps
  onSave: SyncOptions['onSave']
  ydoc?: Y.Doc
}

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
  'subPageMenuBlock',
  'tocBlock',
  'spreadsheetBlock'
]

export function useEditor(options: EditorOptions): TiptapEditor | null {
  documentEditorStyles()
  const { onSave, editable, props, ydoc, ...restOptions } = options

  return useTiptapEditor(
    {
      extensions: [
        Base.configure({
          anchor: true,
          blockquote: true,
          bold: true,
          brickList: true,
          bulletList: true,
          commandHelper: true,
          code: true,
          codeBlock: true,
          document: true,
          discussion: true,
          dropcursor: {
            color: theme.colors.primaryDisable.value,
            width: 2
          },
          embed: true,
          eventHandler: true,
          fontColor: true,
          formula: true,
          gapcursor: false,
          hardBreak: true,
          heading: true,
          history: true,
          horizontalRule: true,
          indent: true,
          image: true,
          italic: true,
          keyboardShortcut: true,
          link: {
            autolink: false
          },
          listItem: true,
          mentionCommands: {
            editorProps: props
          },
          orderedList: true,
          pageLink: true,
          paragraph: true,
          slashCommands: true,
          spreadsheet: true,
          strike: true,
          subPageMenu: true,
          sync: {
            onSave,
            types: typesWithUuid
          },
          text: true,
          textStyle: true,
          toc: true,
          underline: true,
          uniqueID: {
            attributeName: 'uuid',
            types: typesWithUuid
          },
          user: true,
          collaboration: ydoc
            ? {
                document: ydoc
              }
            : false,
          dropBlock: true
        })
      ],
      autofocus: true,
      editable,
      ...restOptions
    },
    [ydoc]
  )
}
