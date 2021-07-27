// ref: https://www.tiptap.dev/experiments/global-drag-handle/#globaldraghandle
import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { createDragHandle } from './dragHandle'

function removeNode(node: Element): void {
  node.parentNode?.removeChild(node)
}

function absoluteRect(node: Element): {
  -readonly [P in keyof DOMRect]: DOMRect[P]
} {
  return { ...node.getBoundingClientRect() }
}

function addMenuItems(menuElement: HTMLElement, editorView: EditorView): void {
  // drag handle
  menuElement.appendChild(createDragHandle(editorView))
}

// TODO: create a popup for block commands menu
function createBlockCommandsMenuElement(editorView: EditorView): HTMLDivElement {
  const element = document.createElement('div')
  element.classList.add('brickdoc-block-commands')
  addMenuItems(element, editorView)
  document.body.appendChild(element)

  return element
}

function getNodeByEvent(view: EditorView, event: MouseEvent): Element | undefined {
  const coords = {
    left: event.clientX,
    top: event.clientY
  }
  const { pos } = view.posAtCoords(coords) ?? {}

  if (!pos) return

  let node = view.domAtPos(pos)?.node

  if (!node) return

  // find the topmost node
  while (node.parentNode) {
    // TODO: need a better solution
    if ((node?.parentNode as Element)?.classList?.contains('ProseMirror')) {
      break
    }
    node = node.parentNode
  }

  if (!(node instanceof Element)) return

  return node
}

function adjustMenuPosition(node: Element, menuElement: HTMLElement): void {
  const style = window.getComputedStyle(node)
  const height = parseInt(style.height, 10)
  const top = 0
  const rect = absoluteRect(node)
  const win = node.ownerDocument.defaultView
  if (!win) throw new Error('Failed to adjust menu position when process dragging.')

  rect.top += win.pageYOffset + (height - 24) / 2 + top
  rect.left += win.pageXOffset

  const menuWidth = parseInt(window.getComputedStyle(menuElement).width, 10)

  menuElement.style.left = `${-menuWidth + rect.left}px`
  menuElement.style.top = `${rect.top}px`
  menuElement.style.display = 'flex'
}

export const BlockCommandsExtension = Extension.create({
  addProseMirrorPlugins() {
    let menuElement: HTMLElement | undefined

    return [
      new Plugin({
        view(editorView) {
          menuElement = createBlockCommandsMenuElement(editorView)

          return {
            destroy() {
              if (!menuElement) return
              removeNode(menuElement)
              menuElement = undefined
            }
          }
        },
        props: {
          handleDOMEvents: {
            mousemove(view, event) {
              const node = getNodeByEvent(view, event)

              if (!node || !menuElement) {
                return false
              }

              adjustMenuPosition(node, menuElement)
              return true
            }
          }
        }
      })
    ]
  }
})
