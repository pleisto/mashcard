import { useMemo, FC, useEffect, DependencyList } from 'react'
import {
  useEditor as useTiptapEditor,
  EditorContent as TiptapEditorContent,
  Editor as TiptapEditor
} from '@tiptap/react'
import { EditorOptions as TiptapEditorOptions } from '@tiptap/core'
import { theme } from '@brickdoc/design-system'
import { useEditorI18n } from '../../hooks'
import { EditorContext, EditorContextData } from '../../context/EditorContext'
import { DiscussionList, ExplorerMenu, HistoryList } from '../../components/editorViews'
import { BubbleMenu } from '../../components/extensionViews'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  Embed,
  Formula,
  HardBreak,
  Heading,
  HorizontalRule,
  ListItem,
  OrderedList,
  Paragraph,
  Spreadsheet,
  SubPageMenu,
  TaskItem,
  TaskList,
  Toc
} from '../../extensions'
import { Base, BaseOptions, updateExtensionOptions as updateBaseExtensionOptions } from '../../extensions/base'
import { useDrawerService } from '../../components/ui/Drawer'
import { useDropBlock, useUndo } from '../../helpers'
import { documentEditorStyles } from './documentEditor.style'
import { merge } from 'lodash'
import { To, NavigateOptions } from 'react-router-dom'

export interface EditorContentProps {
  editor: TiptapEditor | null
  editable: boolean
  // TODO: remove these props
  rootId?: string
  domain?: string
  historyId?: string
  navigate: (to: To, options?: NavigateOptions) => void
}

export const EditorContent: FC<EditorContentProps> = ({ editor, editable, ...props }) => {
  documentEditorStyles()

  const editorContext = useMemo<EditorContextData>(() => ({ editor, documentEditable: editable }), [editable, editor])
  useEditorI18n()
  useDrawerService()
  useDropBlock(editor)
  useUndo(editor)

  return (
    <EditorContext.Provider value={editorContext}>
      <BubbleMenu editor={editor} />
      <TiptapEditorContent className="brickdoc" editor={editor} />
      <DiscussionList />
      <HistoryList docId={props.rootId!} domain={props.domain!} historyId={props.historyId} navigate={props.navigate} />
      <ExplorerMenu editor={editor} />
    </EditorContext.Provider>
  )
}

export interface EditorOptions extends Partial<TiptapEditorOptions> {
  base?: Partial<BaseOptions>
}

const typesWithUuid = [
  Blockquote.name,
  BulletList.name,
  CodeBlock.name,
  Embed.name,
  Formula.name,
  HardBreak.name,
  Heading.name,
  HorizontalRule.name,
  Image.name,
  ListItem.name,
  TaskItem.name,
  TaskList.name,
  OrderedList.name,
  Paragraph.name,
  SubPageMenu.name,
  Toc.name,
  Spreadsheet.name
]

export function useEditor(options: EditorOptions, deps?: DependencyList): TiptapEditor | null {
  const editorOptions = useMemo<Partial<TiptapEditorOptions>>(() => {
    const { editable, extensions, base, ...restOptions } = options
    return {
      extensions: [
        ...(extensions ?? []),
        Base.configure(
          merge(
            {
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
              fontBgColor: true,
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
              mentionCommands: true,
              orderedList: true,
              pageLink: true,
              paragraph: true,
              slashCommands: true,
              spreadsheet: true,
              strike: true,
              subPageMenu: true,
              sync: {
                types: typesWithUuid
              },
              taskItem: {
                nested: true
              },
              taskList: true,
              text: true,
              textStyle: true,
              toc: true,
              underline: true,
              uniqueID: {
                attributeName: 'uuid',
                types: typesWithUuid
              },
              user: true,
              dropBlock: true
            },
            base
          )
        )
      ],
      autofocus: true,
      editable,
      ...restOptions
    }
  }, [options])

  const editor = useTiptapEditor(editorOptions, deps)

  useEffect(() => {
    if (!editor || !options.base) return
    updateBaseExtensionOptions(editor.extensionManager.extensions, options.base)
  }, [options.base, editor])

  return editor
}
