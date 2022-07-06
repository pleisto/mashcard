import { Plugin, PluginKey, EditorState } from 'prosemirror-state'
import { createExtension } from '../../common'
import { meta, SelectAttributes, SelectionOptions } from './meta'
import { MultipleNodeSelection } from './MultipleNodeSelection'
import { nodeSelectionDecoration, textSelectionDecoration } from './decorations'
import { normalizeSelection } from './normalizeSelection'
import { MultipleNodeSelectionDomEvents } from './domEvents'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    multipleNodeSelection: {
      /**
       * Set a multiple node selection
       */
      setMultipleNodeSelection: (anchor: number, head: number) => ReturnType
      /**
       * start select nodes
       */
      startMultipleNodeSelection: (event: MouseEvent) => ReturnType
    }
  }
}

export interface SelectionState {
  multiNodeSelecting:
    | false
    | {
        selecting: boolean
        anchor: {
          x: number
          y: number
          position: number
        }
        head?: {
          x: number
          y: number
        }
      }
}

export const SelectionPluginKey = new PluginKey<SelectionState>(meta.name)

export const Selection = createExtension<SelectionOptions, SelectAttributes>({
  name: meta.name,

  addCommands() {
    const domEvents = new MultipleNodeSelectionDomEvents(this.editor, {
      mouseSelectionClassName: this.options.nodeSelection.mouseSelection?.className
    })

    return {
      setMultipleNodeSelection:
        (anchor, head) =>
        ({ dispatch, tr }) => {
          if (dispatch) {
            const { doc } = tr
            const minPos = 0
            const maxPos = MultipleNodeSelection.atEnd(doc).to

            const resolvedAnchor = Math.max(Math.min(anchor, maxPos), minPos)
            const resolvedHead = Math.max(Math.min(head, maxPos), minPos)
            const selection = MultipleNodeSelection.create(doc, resolvedAnchor, resolvedHead)

            tr.setSelection(selection)
          }

          return true
        },
      startMultipleNodeSelection:
        event =>
        ({ view }) => {
          domEvents.mousedown(view, event)
          return true
        }
    }
  },

  addProseMirrorPlugins() {
    const domEvents = new MultipleNodeSelectionDomEvents(this.editor, {
      mouseSelectionClassName: this.options.nodeSelection.mouseSelection?.className
    })
    return [
      new Plugin<SelectionState>({
        key: SelectionPluginKey,
        state: {
          init() {
            return {
              multiNodeSelecting: false
            }
          },
          apply(tr, value, oldState, newState) {
            const anchor = tr.getMeta('updateSelectionAnchor')
            if (anchor) {
              return { ...value, multiNodeSelecting: { anchor, selecting: false } }
            }

            const head = tr.getMeta('updateSelectionHead')

            if (head && value.multiNodeSelecting) {
              return { ...value, multiNodeSelecting: { ...value.multiNodeSelecting, head } }
            }

            if (tr.getMeta('multipleNodeSelecting') && value.multiNodeSelecting) {
              return { ...value, multiNodeSelecting: { ...value.multiNodeSelecting, selecting: true } }
            }

            if (tr.getMeta('multipleNodeSelectingEnd')) {
              return { ...value, multiNodeSelecting: false }
            }

            return { ...value }
          }
        },
        props: {
          handleDOMEvents: {
            mousedown: (view, event) => domEvents.mousedown(view, event)
          },
          decorations: (state: EditorState) => {
            const textDecorationSet = textSelectionDecoration(this.editor, this.options, state)

            if (textDecorationSet) return textDecorationSet

            return nodeSelectionDecoration(this.editor, this.options, state)
          },
          createSelectionBetween: (view, $anchor, $head) => {
            return normalizeSelection(this.editor, view, $anchor, $head)
          }
        }
      })
    ]
  }
})
