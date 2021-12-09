import { Extension } from '@tiptap/core'
import { EditorView } from 'prosemirror-view'
import { Plugin, PluginKey } from 'prosemirror-state'

export type KeyDownHandlerType = (view: EditorView<any>, event: KeyboardEvent) => boolean

const handleKeyDownDisableNewLine: KeyDownHandlerType = (view, event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    return true
  }

  return false
}

export const HandleKeyDownExtension = (keyDownHandler?: KeyDownHandlerType): Extension<unknown> => {
  return Extension.create({
    name: 'handleKeyDown',

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('handleKeyDown'),
          props: {
            handleKeyDown: keyDownHandler ?? handleKeyDownDisableNewLine
          }
        })
      ]
    }
  })
}
