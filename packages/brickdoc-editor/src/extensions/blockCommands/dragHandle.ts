// ref: https://www.tiptap.dev/experiments/global-drag-handle/#globaldraghandle
import { NodeSelection, TextSelection } from 'prosemirror-state'
import { EditorView, __serializeForClipboard } from 'prosemirror-view'

function blockPosAtCoords(coords: { left: number; top: number }, view: EditorView): number | undefined {
  const { pos } = view.posAtCoords(coords) ?? {}
  if (pos === undefined) return

  let node = view.domAtPos(pos).node

  // find the topmost node
  while (node?.parentElement) {
    if (node.parentElement?.classList?.contains('ProseMirror')) {
      break
    }

    node = node.parentElement
  }

  if (node && node.nodeType === 1) {
    // See node_modules/prosemirror-view/src/viewdesc.js
    const docView = (view as any).docView
    const desc = docView.nearestDesc(node, true)

    if (!(!desc || desc === docView)) {
      return desc.posBefore
    }
  }
}

function dragStart(e: DragEvent, view: EditorView): void {
  view.composing = true

  if (!e.dataTransfer) {
    return
  }

  const coords = { left: e.clientX + 50, top: e.clientY }
  const pos = blockPosAtCoords(coords, view)

  if (pos !== undefined) {
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)))

    const slice = view.state.selection.content()

    const { dom, text } = __serializeForClipboard(view, slice)

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/html', dom.innerHTML)
    e.dataTransfer.setData('text/plain', text)

    const el = document.querySelector('.ProseMirror-selectednode')
    if (!el) throw new Error('Cannot find .ProseMirror-selectednode when processing dragging')
    e.dataTransfer?.setDragImage(el, 0, 0)

    view.dragging = { slice, move: true }
  }
}

export function createDragHandle(editorView: EditorView): HTMLDivElement {
  // drag handle
  const dragElement = document.createElement('div')
  dragElement.draggable = true
  // TODO: temporary UI
  dragElement.textContent = 'drag'
  dragElement.addEventListener('dragstart', e => dragStart(e, editorView))
  // During dragging, we need select the drag content and proseMirror will add .ProseMirror-hideselection class for hiding selection.
  // We have to remove selection manually after drag done to prevent content from hidden.
  dragElement.addEventListener('dragend', () => {
    // a little tricky here
    // https://discuss.prosemirror.net/t/removing-selection-on-blur/475
    const noneSelection = new TextSelection(editorView.state.doc.resolve(0))
    editorView.dispatch(editorView.state.tr.setSelection(noneSelection))
  })

  return dragElement
}
