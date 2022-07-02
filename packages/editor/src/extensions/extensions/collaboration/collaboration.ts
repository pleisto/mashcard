import { Collaboration as TiptapCollaboration } from '@tiptap/extension-collaboration'
import { ySyncPlugin, yUndoPlugin, ySyncPluginKey, yUndoPluginKey } from 'y-prosemirror'
import { EditorView } from 'prosemirror-view'

export type { CollaborationOptions } from '@tiptap/extension-collaboration'

interface StackItem {
  meta: Map<any, any>
  type: 'undo' | 'redo'
}

export const Collaboration = TiptapCollaboration.extend({
  addProseMirrorPlugins() {
    const fragment = this.options.fragment
      ? this.options.fragment
      : this.options.document.getXmlFragment(this.options.field)

    const yUndoPluginInst = yUndoPlugin()

    yUndoPluginInst.spec.view = (view: EditorView) => {
      const ystate = ySyncPluginKey.getState(view.state)
      const undoManager = yUndoPluginKey.getState(view.state).undoManager
      undoManager.on('stack-item-added', ({ stackItem }: { stackItem: StackItem }) => {
        const binding = ystate.binding
        if (binding) {
          stackItem.meta.set(binding, yUndoPluginKey.getState(view.state).prevSel)
        }
      })
      undoManager.on('stack-item-popped', ({ stackItem }: { stackItem: StackItem }) => {
        const binding = ystate.binding
        if (binding) {
          binding.beforeTransactionSelection = stackItem.meta.get(binding) || binding.beforeTransactionSelection
        }
      })
      return {
        destroy: () => {}
      }
    }

    return [ySyncPlugin(fragment), yUndoPluginInst]
  }
})
