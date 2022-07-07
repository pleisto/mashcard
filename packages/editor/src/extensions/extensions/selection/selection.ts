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
      mouseSelectionClassName: this.options.nodeSelection?.mouseSelection?.className
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

  addStorage() {
    return {}
  },

  addProseMirrorPlugins() {
    const domEvents = new MultipleNodeSelectionDomEvents(this.editor, {
      mouseSelectionClassName: this.options.nodeSelection?.mouseSelection?.className
    })
    return [
      new Plugin<SelectionState>({
        key: SelectionPluginKey,
        props: {
          handleDOMEvents: {
            mousedown: (view, event) => {
              if (!(event.target instanceof HTMLElement)) return false

              // if click happens on the doc node, assume a Multiple Node Selection will happen.
              // TODO: check ProseMirror className could be invalid someday.
              if (!event.target.classList.contains('ProseMirror')) return false

              return domEvents.mousedown(view, event)
            }
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
