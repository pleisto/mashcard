import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export const DisableNewLineExtension = Extension.create({
  name: 'disableNewLine',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('disableNewLine'),
        props: {
          handleKeyDown(view, event): boolean {
            if (event.key === 'Enter' && !event.shiftKey) {
              return true
            }

            return false
          }
        }
      })
    ]
  }
})
