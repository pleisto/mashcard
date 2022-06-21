import { Editor } from '@tiptap/core'
import { EditorView } from 'prosemirror-view'
import { Plugin, PluginKey } from 'prosemirror-state'
import { MashcardEventBus, FormulaEditorHoverEventTrigger, FormulaKeyboardEventTrigger } from '@mashcard/schema'
import { CodeFragment } from '@mashcard/formula'
import { meta } from './meta'
import { createExtension } from '../../common'

export type KeyDownHandlerType = (view: EditorView<any>, event: KeyboardEvent) => boolean

const formulaHandleKeyDown: ({
  formulaId,
  rootId
}: {
  formulaId: string | undefined
  rootId: string | undefined
}) => KeyDownHandlerType = ({ formulaId, rootId }) => {
  return (view, event) => {
    const key = event.key

    if (['Enter', 'Tab', 'ArrowUp', 'ArrowDown'].includes(key)) {
      if (rootId && formulaId) {
        MashcardEventBus.dispatch(
          FormulaKeyboardEventTrigger({ key, formulaId, rootId, isEditor: true, completionIndex: -1 })
        )
      }
      return true
    }

    return false
  }
}

const gapHoverHandler = ({
  view,
  position,
  formulaId,
  rootId
}: {
  editor: Editor
  view: EditorView
  position: number
  event: MouseEvent
  formulaId: string | undefined
  rootId: string | undefined
}): void => {
  if (!formulaId || !rootId) return
  // if (!(event.target as HTMLElement)?.classList.contains('ProseMirror')) {
  //   return
  // }

  if (position - 1 < 0) {
    // MashcardEventBus.dispatch(FormulaEditorHoverEventTrigger({ attrs: undefined, formulaId, rootId }))
    return
  }
  const node = view.state.doc.nodeAt(position)
  if (!node) {
    MashcardEventBus.dispatch(FormulaEditorHoverEventTrigger({ attrs: undefined, formulaId, rootId }))
    return
  }

  const mark = node.marks[0]

  if (!mark) return

  if (mark.type.name !== 'FormulaType') return

  const { attrs } = mark.attrs as CodeFragment
  // if (!['Spreadsheet', 'Column', 'Variable', 'Block'].includes(code)) return

  MashcardEventBus.dispatch(FormulaEditorHoverEventTrigger({ attrs, formulaId, rootId }))
}

export interface FormulaHandleKeyDownOptions {
  formulaId: string | undefined
  rootId: string | undefined
}
export interface FormulaHandleKeyDownAttributes {}

export const FormulaHandleKeyDown = createExtension<FormulaHandleKeyDownOptions, FormulaHandleKeyDownAttributes>({
  name: meta.name,

  addProseMirrorPlugins() {
    const {
      options: { formulaId, rootId },
      editor
    } = this

    return [
      new Plugin({
        key: new PluginKey(meta.name),
        props: {
          handleKeyDown: formulaHandleKeyDown({ formulaId, rootId }),
          handleClick(view, position, event) {
            gapHoverHandler({ editor, view, position, event, formulaId, rootId })
            return false
          },
          handleDOMEvents: {
            mouseover(view, event) {
              const position = view.posAtDOM(event.target as Node, 0)
              // console.log({ view, event, position })
              // TODO num1 + 1 bug
              gapHoverHandler({ editor, view, position, event, formulaId, rootId })
              return false
            },
            mouseleave(view, event) {
              if (formulaId && rootId) {
                MashcardEventBus.dispatch(FormulaEditorHoverEventTrigger({ attrs: undefined, formulaId, rootId }))
              }
              return false
            }
          }
        }
      })
    ]
  }
})
