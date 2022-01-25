import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { pasteImageHandler } from './pasteImageHandler'
// import { backspaceHandler } from './backspaceHandler'
import { gapClickHandler } from './gapClickHandler'

export const EventHandlerExtension = Extension.create({
  name: 'eventHandler',

  addProseMirrorPlugins() {
    const editor = this.editor
    return [
      new Plugin({
        key: new PluginKey('eventHandler'),
        props: {
          handlePaste(view, event, slice): boolean {
            return pasteImageHandler(editor, event)
          },
          // handleKeyDown(view, event): boolean {
          //   if (event.code === 'Backspace') {
          //     return backspaceHandler(editor, view, event)
          //   }

          //   return false
          // },
          handleClick(view, pos, event) {
            gapClickHandler(editor, view, pos, event)
            return false
          }
        }
      })
    ]
  }
})
