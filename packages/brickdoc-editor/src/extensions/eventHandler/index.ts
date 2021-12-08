import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { pasteImageHandler } from './pasteImageHandler'
import { backspaceHandler } from './backspaceHandler'

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
          handleKeyDown(view, event): boolean {
            if (event.code === 'Backspace') {
              return backspaceHandler(editor, view, event)
            }

            return false
          }
        }
        // filterTransaction(transaction, state) {
        //   return transaction.steps.every((step: any) => {
        //     if (!step.slice) return true
        //     const newContent = step.slice.content.content
        //     for (let pos = step.from ?? 0; pos <= step.to ?? 0; pos++) {
        //       const node = state.doc.nodeAt(pos)

        //       if (node?.type.name === 'imageSection') {
        //         const valid = !!newContent.find((content: any) => {
        //           if (content.type.name !== node.type.name) return false
        //           if (!node.attrs.uuid && content.attrs.uuid) return true
        //           if (node.attrs.uuid === content.attrs.uuid) return true
        //           return false
        //         })
        //         console.log(valid, node, newContent)
        //         if (!valid) return false
        //       }
        //     }

        //     return true
        //   })
        // }
      })
    ]
  }
})
