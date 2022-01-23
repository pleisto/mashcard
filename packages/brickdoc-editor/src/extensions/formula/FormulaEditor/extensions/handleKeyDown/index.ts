import { Extension } from '@tiptap/core'
import { EditorView } from 'prosemirror-view'
import { Plugin, PluginKey } from 'prosemirror-state'
import { BrickdocEventBus, FormulaKeyboardEventTrigger } from '@brickdoc/schema'

export type KeyDownHandlerType = (view: EditorView<any>, event: KeyboardEvent) => boolean
export type HandleKeyDownType = ({
  formulaId,
  rootId
}: {
  formulaId: string | undefined
  rootId: string | undefined
}) => Extension<any, any>

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
        BrickdocEventBus.dispatch(FormulaKeyboardEventTrigger({ key, formulaId, rootId }))
      }
      return true
    }

    return false
  }
}

export const HandleKeyDownExtension: HandleKeyDownType = ({ formulaId, rootId }) => {
  return Extension.create({
    name: 'handleKeyDown',

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('handleKeyDown'),
          props: {
            handleKeyDown: formulaHandleKeyDown({ formulaId, rootId })
          }
        })
      ]
    }
  })
}
