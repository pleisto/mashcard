import { useMemo, FC, useEffect, DependencyList } from 'react'
import {
  useEditor as useTiptapEditor,
  EditorContent as TiptapEditorContent,
  Editor as TiptapEditor
} from '@tiptap/react'
import { EditorOptions as TiptapEditorOptions } from '@tiptap/core'
import { theme } from '@mashcard/design-system'
import { useEditorI18n } from '../../hooks'
import { EditorContext, EditorContextData, DocumentContext, DocumentContextData } from '../../context'
import { DiscussionList, ExplorerMenu, HistoryList } from '../../components/editorViews'
import { BubbleMenu } from '../../components/extensionViews'
import {
  Blockquote,
  BulletList,
  Callout,
  CodeBlock,
  Embed,
  Formula,
  HardBreak,
  Heading,
  HorizontalRule,
  ListItem,
  OrderedList,
  Paragraph,
  Selection,
  Spreadsheet,
  SubPageMenu,
  TaskItem,
  TaskList,
  Toc
} from '../../extensions'
import { Base, BaseOptions, updateExtensionOptions as updateBaseExtensionOptions } from '../../extensions/base'
import { useDrawerService } from '../../components/ui/Drawer'
import { useUndo } from '../../helpers'
import {
  documentEditorStyles,
  globalStyles,
  h1FontSize,
  h1LienHeight,
  h2FontSize,
  h2LienHeight,
  h3FontSize,
  h3LienHeight,
  h4FontSize,
  h4LienHeight,
  h5FontSize,
  h5LienHeight,
  nodeSelectionClassName,
  nodeSelectionMouseSelectionClassName,
  paragraphFontSize,
  paragraphLineHeight,
  textSelectionClassName
} from './documentEditor.style'
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

export const EditorContent: FC<EditorContentProps> = ({ editor, editable, rootId, ...props }) => {
  globalStyles()
  const editorContext = useMemo<EditorContextData>(() => ({ editor, documentEditable: editable }), [editable, editor])
  const documentContext = useMemo<DocumentContextData>(() => ({ docId: rootId }), [rootId])
  useDrawerService()
  useUndo(editor)

  const enableSelection =
    !editable || !editor?.extensionManager.extensions.find(extension => extension.name === Selection.name)
  const documentEditorClassName = documentEditorStyles({ enableSelection })

  return (
    <DocumentContext.Provider value={documentContext}>
      <EditorContext.Provider value={editorContext}>
        <BubbleMenu editor={editor} />
        <TiptapEditorContent className={documentEditorClassName} editor={editor} />
        <DiscussionList />
        <HistoryList docId={rootId!} domain={props.domain!} historyId={props.historyId} navigate={props.navigate} />
        <ExplorerMenu editor={editor} />
      </EditorContext.Provider>
    </DocumentContext.Provider>
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
  const [t] = useEditorI18n()
  const editorOptions = useMemo<Partial<TiptapEditorOptions>>(() => {
    const { editable, extensions, base, ...restOptions } = options
    const selectionPaddingVar = '--selection-padding'
    const backgroundColorPaddingVar = '--bgColor-padding'

    return {
      extensions: [
        ...(extensions ?? []),
        Base.configure(
          merge<Partial<BaseOptions>, Partial<BaseOptions> | undefined>(
            {
              anchor: true,
              blockquote: true,
              bold: true,
              brickList: true,
              bubbleMenu: true,
              bulletList: true,
              callout: true,
              code: true,
              codeBlock: true,
              commandHelper: true,
              document: true,
              discussion: true,
              dropcursor: {
                color: theme.colors.primaryDisable.value,
                width: 2
              },
              embed: true,
              eventHandler: true,
              fontColor: true,
              fontBgColor: {
                HTMLAttributes: {
                  // make bgColor mark as high as parent element
                  style: `padding: var(${backgroundColorPaddingVar}) 0;`
                }
              },
              formula: true,
              gapcursor: false,
              hardBreak: true,
              heading: {
                HTMLAttributes: attrs => {
                  // 1. make selection as high as heading
                  // 2. make bgColor mark as high as heading
                  switch (attrs.level) {
                    case 1:
                      return {
                        style: {
                          [selectionPaddingVar]: `calc((${h1LienHeight.value} - ${h1FontSize.value}) / 2)`,
                          [backgroundColorPaddingVar]: `calc((${h1LienHeight.value} - ${h1FontSize.value}) / 2)`
                        }
                      }
                    case 2:
                      return {
                        style: {
                          [selectionPaddingVar]: `calc((${h2LienHeight.value} - ${h2FontSize.value}) / 2)`,
                          [backgroundColorPaddingVar]: `calc((${h2LienHeight.value} - ${h2FontSize.value}) / 2)`
                        }
                      }
                    case 3:
                      return {
                        style: {
                          [selectionPaddingVar]: `calc((${h3LienHeight.value} - ${h3FontSize.value}) / 2)`,
                          [backgroundColorPaddingVar]: `calc((${h3LienHeight.value} - ${h3FontSize.value}) / 2)`
                        }
                      }
                    case 4:
                      return {
                        style: {
                          [selectionPaddingVar]: `calc((${h4LienHeight.value} - ${h4FontSize.value}) / 2)`,
                          [backgroundColorPaddingVar]: `calc((${h4LienHeight.value} - ${h4FontSize.value}) / 2)`
                        }
                      }
                    case 5:
                    case 6:
                      return {
                        style: {
                          [selectionPaddingVar]: `calc((${h5LienHeight.value} - ${h5FontSize.value}) / 2)`,
                          [backgroundColorPaddingVar]: `calc((${h5LienHeight.value} - ${h5FontSize.value}) / 2)`
                        }
                      }
                    default:
                      return {}
                  }
                }
              },
              history: true,
              horizontalRule: true,
              indent: true,
              italic: true,
              keyboardShortcut: true,
              link: {
                autolink: false
              },
              listItem: true,
              mentionCommands: true,
              orderedList: true,
              pageLink: true,
              paragraph: {
                HTMLAttributes: {
                  style: {
                    // make selection as high as paragraph
                    [selectionPaddingVar]: `calc((${paragraphLineHeight} - ${paragraphFontSize}) / 2)`,
                    // make bgColor mark as high as paragraph
                    [backgroundColorPaddingVar]: `calc((${paragraphLineHeight} - ${paragraphFontSize}) / 2)`
                  }
                }
              },
              placeholder: {
                placeholder: ({ wrapperNode }) => {
                  switch (wrapperNode?.type.name) {
                    case Blockquote.name:
                      return t(`placeholder.blockquote`)
                    case ListItem.name:
                      return t(`placeholder.listItem`)
                    case TaskItem.name:
                      return t(`placeholder.taskItem`)
                    case Callout.name:
                      return t(`placeholder.callout`)
                    default:
                      return t(`placeholder.default`)
                  }
                }
              },
              selection: {
                nodeSelection: {
                  mouseSelection: {
                    className: nodeSelectionMouseSelectionClassName
                  },
                  className: nodeSelectionClassName
                },
                textSelection: {
                  className: textSelectionClassName,
                  // make selection as high as parent element
                  style: `padding: var(${selectionPaddingVar}) 0`
                }
              },
              slashCommands: true,
              spreadsheet: true,
              strike: true,
              subPageMenu: true,
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
  }, [options, t])

  const editor = useTiptapEditor(editorOptions, deps)

  useEffect(() => {
    if (!editor || !options.base) return
    updateBaseExtensionOptions(editor.extensionManager.extensions, options.base)
  }, [options.base, editor])

  return editor
}
