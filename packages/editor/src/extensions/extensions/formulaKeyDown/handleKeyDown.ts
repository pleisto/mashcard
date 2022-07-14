import { Editor } from '@tiptap/core'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { EditorView } from 'prosemirror-view'
import { Plugin, PluginKey } from 'prosemirror-state'
import { MashcardEventBus, FormulaEditorHoverEventTrigger, FormulaKeyboardEventTrigger } from '@mashcard/schema'
import { CodeFragment } from '@mashcard/formula'
import { meta } from './meta'
import { createExtension } from '../../common'

const ACTIVE_CLASS_NAME = 'mashcard-formula-mark-active'

let formulaMarkActiveCheckTimer: NodeJS.Timeout
let activeHTMLElement: HTMLElement | null

const getHTMLElement = (node: Node | undefined): HTMLElement | null => {
  if (node?.nodeType === Node.TEXT_NODE) {
    return node.parentElement
  } else if (node?.nodeType === Node.ELEMENT_NODE) {
    return node as HTMLElement
  }
  return null
}

const addActiveMark = (node: Node): void => {
  removeActiveMark()
  activeHTMLElement = getHTMLElement(node)
  // console.log('add active mark', activeHTMLElement, node)
  activeHTMLElement?.classList.add(ACTIVE_CLASS_NAME)
}
const removeActiveMark = (): void => {
  // console.log('remove active mark', activeHTMLElement)
  activeHTMLElement?.classList.remove(ACTIVE_CLASS_NAME)
}

const node2codeFragment = (node: ProsemirrorNode | null): CodeFragment | undefined => {
  if (!node) return undefined
  const mark = node.marks[0]

  if (!mark) return undefined

  if (mark.type.name !== 'FormulaType') return undefined

  const attrs = mark.attrs as CodeFragment

  return attrs
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
  formulaId: string | undefined
  rootId: string | undefined
}): void => {
  if (!formulaId || !rootId) return
  if (position - 1 < 0) {
    removeActiveMark()
    return
  }

  const node = view.state.doc.nodeAt(position)
  const attrs = node2codeFragment(node)
  if (!attrs) {
    removeActiveMark()
    MashcardEventBus.dispatch(FormulaEditorHoverEventTrigger({ attrs: undefined, formulaId, rootId }))
    return
  }

  const dom = view.domAtPos(position).node

  clearTimeout(formulaMarkActiveCheckTimer)
  formulaMarkActiveCheckTimer = setTimeout(() => {
    addActiveMark(dom)
  }, 20)

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

  onSelectionUpdate() {
    const {
      editor,
      options: { formulaId, rootId }
    } = this
    const position = editor.state.selection.anchor
    gapHoverHandler({ editor, view: editor.view, position, formulaId, rootId })
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(meta.name),
        props: {
          handleKeyDown: (view, event) => {
            const { key, altKey, ctrlKey, metaKey } = event
            const {
              options: { formulaId, rootId, maxScreen },
              editor
            } = this
            if (!rootId || !formulaId) return false

            const position = editor.state.selection.anchor
            const node = view.state.doc.nodeAt(position - 1)
            const attrs = node2codeFragment(node)

            if (attrs && attrs.code === 'Variable' && key === 'Backspace') {
              console.log('position and attrs', position, attrs)
              return true
            }

            if (key !== 'Enter' && key !== 'Tab' && key !== 'ArrowUp' && key !== 'ArrowDown' && key !== 'Escape') {
              return false
            }

            if (!altKey && !ctrlKey && !metaKey && maxScreen) {
              return false
            }

            MashcardEventBus.dispatch(
              FormulaKeyboardEventTrigger({
                event: { ...event, key },
                formulaId,
                rootId,
                type: 'editor',
                completionIndex: -1
              })
            )
            return true
          }
        }
      })
    ]
  }
})
