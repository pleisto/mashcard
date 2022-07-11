import { Editor } from '@tiptap/core'
import { EditorView } from 'prosemirror-view'
import { Plugin, PluginKey } from 'prosemirror-state'
import { MashcardEventBus, FormulaEditorHoverEventTrigger, FormulaKeyboardEventTrigger } from '@mashcard/schema'
import { CodeFragment } from '@mashcard/formula'
import { meta } from './meta'
import { createExtension } from '../../common'

export type KeyDownHandlerType = (view: EditorView, event: KeyboardEvent) => boolean

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
  maxScreen: boolean | undefined
}
export interface FormulaHandleKeyDownAttributes {}

export const FormulaHandleKeyDown = createExtension<FormulaHandleKeyDownOptions, FormulaHandleKeyDownAttributes>({
  name: meta.name,

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(meta.name),
        props: {
          handleKeyDown: (view, event) => {
            const { key, altKey, ctrlKey, metaKey } = event
            const {
              options: { formulaId, rootId, maxScreen }
            } = this

            if (!rootId || !formulaId) return false

            if (!['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'Escape'].includes(key)) return false

            if (!altKey && !ctrlKey && !metaKey && maxScreen) {
              return false
            }

            MashcardEventBus.dispatch(
              FormulaKeyboardEventTrigger({ event, formulaId, rootId, type: 'editor', completionIndex: -1 })
            )
            return true
          },
          handleClick: (view, position, event) => {
            const {
              options: { formulaId, rootId },
              editor
            } = this
            gapHoverHandler({ editor, view, position, event, formulaId, rootId })
            return false
          },
          handleDOMEvents: {
            mouseover: (view, event) => {
              const {
                options: { formulaId, rootId },
                editor
              } = this
              const position = view.posAtDOM(event.target as Node, 0)
              // console.log({ view, event, position })
              // TODO num1 + 1 bug
              gapHoverHandler({ editor, view, position, event, formulaId, rootId })
              return false
            },
            mouseleave: (view, event) => {
              const {
                options: { formulaId, rootId }
              } = this
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
