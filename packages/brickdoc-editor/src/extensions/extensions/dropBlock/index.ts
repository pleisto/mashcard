import { Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Extension } from '@tiptap/core'
import { BrickdocEventBus, BlockDropAdd } from '@brickdoc/schema'

class DropBlock {
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

  destroy() {
    this.editorView.dom.removeEventListener('drop', this.drop as EventListener)
    this.editorView.dom.removeEventListener('dragover', this.dragover as EventListener)
  }
}

export const dropBlock = Extension.create({
  name: 'dropBlock',

  addOptions() {
    return {
      color: 'currentColor',
      width: 1,
      class: null
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        view(editorView: EditorView) {
          return new DropBlock(editorView)
        }
      })
    ]
  }
})
