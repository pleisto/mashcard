import { Plugin, PluginKey } from 'prosemirror-state'
import { Editor } from '@tiptap/core'
import { EditorView } from 'prosemirror-view'
import { DropBlockAttributes, DropBlockOptions, meta } from './meta'
import { createExtension } from '../../common'
import * as BLOCK from '../../../helpers/block'

export class DropBlockView {
  editor: Editor
  editorView: EditorView

  constructor(editor: Editor, editorView: EditorView) {
    this.editor = editor
    this.editorView = editorView

    editorView.dom.addEventListener('drop', this.drop as EventListener)
    editorView.dom.addEventListener('dragover', this.dragover as EventListener)
  }

  drop = (e: DragEvent): void => {
    const key = e.dataTransfer?.getData('AddBlockKey')
    if (!this.editorView.editable) return
    const position = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY })
    if (key && position) {
      const chain = this.editor.chain()
      const block = Object.values(BLOCK).find(block => block.key === key)
      if (block) block.insertBlockAt(chain, position.pos)
      chain.run()
    }
    e.preventDefault()
  }

  dragover = (e: DragEvent): void => {
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
        view: (editorView: EditorView) => {
          return new DropBlockView(this.editor, editorView)
        }
      })
    ]
  }
})
