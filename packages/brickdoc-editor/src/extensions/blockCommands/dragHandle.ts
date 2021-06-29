// ref: https://www.tiptap.dev/experiments/global-drag-handle/#globaldraghandle
import { NodeSelection, TextSelection } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { serializeForClipboard } from 'prosemirror-view/src/clipboard'

function blockPosAtCoords(coords: { left: number; top: number }, view: EditorView) {
  const pos = view.posAtCoords(coords)
  let node = view.domAtPos(pos.pos).node

  // find the topmost node
  while (node?.parentNode) {
    if ((node.parentNode as Element)?.classList?.contains('ProseMirror')) {
      break
    }

    node = node.parentNode
  }

  if (node && node.nodeType === 1) {
    const docView = (view as any).docView
    const desc = docView.nearestDesc(node, true)

    if (!(!desc || desc === docView)) {
      return desc.posBefore
    }
  }
  return null
}

function dragStart(e: DragEvent, view: EditorView) {
  view.composing = true

  if (!e.dataTransfer) {
    return
  }

  const coords = { left: e.clientX + 50, top: e.clientY }
  const pos = blockPosAtCoords(coords, view)

  if (pos != null) {
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)))

    const slice = view.state.selection.content()

    const { dom, text } = serializeForClipboard(view, slice)

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/html', dom.innerHTML)
    e.dataTransfer.setData('text/plain', text)

    const el = document.querySelector('.ProseMirror-selectednode')
    e.dataTransfer?.setDragImage(el, 0, 0)

    view.dragging = { slice, move: true }
  }
}

export function createDragHandle(editorView: EditorView) {
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