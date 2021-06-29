// ref: https://www.tiptap.dev/experiments/global-drag-handle/#globaldraghandle
import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { createDragHandle } from './dragHandle'

function removeNode(node: Element) {
  node.parentNode.removeChild(node)
}

function absoluteRect(node: Element) {
  const data = node.getBoundingClientRect()

  return {
    top: data.top,
    left: data.left,
    width: data.width
  }
}

function addMenuItems(menuElement: HTMLElement, editorView: EditorView) {
  // drag handle
  menuElement.appendChild(createDragHandle(editorView))
}

// TODO: create a popup for block commands menu
function createBlockCommandsMenuElement(editorView: EditorView) {
  const element = document.createElement('div')
  element.classList.add('brickdoc-block-commands')
  addMenuItems(element, editorView)
  document.body.appendChild(element)

  return element
}

function getNodeByEvent(view: EditorView, event: MouseEvent) {
  const coords = {
    left: event.clientX,
    top: event.clientY
  }
  const pos = view.posAtCoords(coords)

  if (!pos) {
    return null
  }

  let node = view.domAtPos(pos?.pos)?.node

  if (!node) {
    return null
  }

  // find the topmost node
  while (node.parentNode) {
    // TODO: need a better solution
    if ((node?.parentNode as Element)?.classList?.contains('ProseMirror')) {
      break
    }
    node = node.parentNode
  }

  if (!(node instanceof Element)) {
    return null
  }

  return node
}

function adjustMenuPosition(node: Element, menuElement: HTMLElement) {
  const style = window.getComputedStyle(node)
  const height = parseInt(style.height, 10)
  const top = 0
  const rect = absoluteRect(node)
  const win = node.ownerDocument.defaultView

  rect.top += win.pageYOffset + (height - 24) / 2 + top
  rect.left += win.pageXOffset

  const menuWidth = parseInt(window.getComputedStyle(menuElement).width, 10)

  menuElement.style.left = `${-menuWidth + rect.left}px`
  menuElement.style.top = `${rect.top}px`
  menuElement.style.display = 'flex'
}

const BlockCommandsExtension = Extension.create({
  addProseMirrorPlugins() {
    let menuElement: HTMLElement

    return [
      new Plugin({
        view(editorView) {
          menuElement = createBlockCommandsMenuElement(editorView)

          return {
            destroy() {
              removeNode(menuElement)
              menuElement = null
            }
          }
        },
        props: {
          handleDOMEvents: {
            mousemove(view, event) {
              const node = getNodeByEvent(view, event)

              if (!node) {
                return false
              }

              adjustMenuPosition(node, menuElement)
              return true
            },
          }
        }
      })
    ]
  }
})

export { BlockCommandsExtension }

export default BlockCommandsExtension
