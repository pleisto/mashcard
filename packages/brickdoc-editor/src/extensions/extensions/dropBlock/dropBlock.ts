import { Plugin, PluginKey } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { BrickdocEventBus, BlockDropAdd } from '@brickdoc/schema'
import { DropBlockAttributes, DropBlockOptions, meta } from './meta'
import { createExtension } from '../../common'

export class DropBlockView {
  editorView: EditorView

  constructor(editorView: EditorView) {
    this.editorView = editorView

    editorView.dom.addEventListener('drop', this.drop as EventListener)
    editorView.dom.addEventListener('dragover', this.dragover as EventListener)
  }

  drop = (e: DragEvent) => {
    const key = e.dataTransfer?.getData('AddBlockKey')
    if (!this.editorView.editable) return
    const position = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY })
    if (key && position) {
      BrickdocEventBus.dispatch(BlockDropAdd({ key, pos: position.pos }))
    }
    e.preventDefault()
  }

  dragover = (e: DragEvent) => {
    e.preventDefault()
  }

  destroy(): void {
    this.editorView.dom.removeEventListener('drop', this.drop as EventListener)
    this.editorView.dom.removeEventListener('dragover', this.dragover as EventListener)
  }
}

export const DropBlock = createExtension<DropBlockOptions, DropBlockAttributes>({
  name: meta.name,

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(meta.name),
        view(editorView: EditorView) {
          return new DropBlockView(editorView)
        }
      })
    ]
  }
})
