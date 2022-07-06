import { Editor } from '@tiptap/core'
import { EditorView } from 'prosemirror-view'
import { SelectionPluginKey, SelectionState } from './selection'

export interface MultipleNodeSelectionDomEventsOptions {
  mouseSelectionClassName?: string
}

export interface MultipleNodeSelectionContainer {
  mouseSelection: {
    id: string
    element: HTMLElement | null
  }
  element: HTMLElement | null
  top: number | undefined
  left: number | undefined
  offset: {
    top: number
    left: number
  }
}

const initialContainer = (): MultipleNodeSelectionContainer => ({
  element: null,
  mouseSelection: {
    id: 'multiple-node-selection-mouse-area',
    element: null
  },
  top: undefined,
  left: undefined,
  offset: {
    top: 0,
    left: 0
  }
})

export class MultipleNodeSelectionDomEvents {
  public editor: Editor
  public options: MultipleNodeSelectionDomEventsOptions
  public container: MultipleNodeSelectionContainer = initialContainer()

  constructor(editor: Editor, options: MultipleNodeSelectionDomEventsOptions) {
    this.editor = editor
    this.options = options
  }

  public mousedown(view: EditorView, event: MouseEvent): boolean {
    const result = view.posAtCoords({ left: event.clientX, top: event.clientY })

    // if click happens outside the doc nodes, assume a Multiple Node Selection will happen.
    // so call blur to avoid Text Selection happen.
    // case: result = null
    // click outside the document
    // case: result.inside === -1
    // click on the doc node
    if (!result || result.inside === -1) {
      view.dispatch(
        view.state.tr.setMeta('updateSelectionAnchor', {
          x: event.clientX,
          y: event.clientY
        })
      )

      const mouseup = (event: MouseEvent): void => {
        this.mouseup(view, event)

        window.removeEventListener('mouseup', mouseup)
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('dragstart', dragstart)
      }

      const mousemove = (event: MouseEvent): void => {
        this.mousemove(view, event)
      }

      const dragstart = (event: DragEvent): void => {
        this.dragstart(view, event)
        window.removeEventListener('mouseup', mouseup)
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('dragstart', dragstart)
      }

      window.addEventListener('mouseup', mouseup)
      window.addEventListener('mousemove', mousemove)
      window.addEventListener('dragstart', dragstart)
    }

    return false
  }

  public mousemove(view: EditorView, event: MouseEvent): boolean {
    const pluginState = SelectionPluginKey.getState(view.state)
    if (pluginState?.multiNodeSelecting) {
      if (!pluginState.multiNodeSelecting.selecting) {
        view.dispatch(view.state.tr.setMeta('multipleNodeSelecting', true))
      }
      const head = { x: event.clientX, y: event.clientY }
      view.dispatch(view.state.tr.setMeta('updateSelectionHead', head))
      this.renderMouseSelection(view, pluginState.multiNodeSelecting.anchor, head)
      this.resolveSelection(view, pluginState, head, this.container.offset)
    }

    return false
  }

  public mouseup = (view: EditorView, event: MouseEvent): boolean => {
    const element = document.getElementById(this.container.mouseSelection.id)
    if (element) document.body.removeChild(element)

    this.container = initialContainer()

    setTimeout(() => {
      view.dispatch(view.state.tr.setMeta('multipleNodeSelectingEnd', true))
    })

    return false
  }

  public dragstart = (view: EditorView, event: DragEvent): boolean => {
    view.dispatch(view.state.tr.setMeta('multipleNodeSelectingEnd', true))
    return false
  }

  public resolveCoordinates(
    anchor: { x: number; y: number },
    head: {
      x: number
      y: number
    },
    docRect: {
      top: number
      left: number
      bottom: number
      right: number
    }
  ): null | {
    anchor: {
      x: number
      y: number
    }
    head: {
      x: number
      y: number
    }
  } {
    if (anchor.y < docRect.top && head.y < docRect.top) return null
    if (anchor.y > docRect.bottom && head.y > docRect.bottom) return null
    if (anchor.x < docRect.left && head.x < docRect.left) return null
    if (anchor.x > docRect.right && head.x > docRect.right) return null

    // calculate the intersection of document area and user mouse selection area
    const y1 = Math.max(Math.min(docRect.bottom, anchor.y), docRect.top)
    const y2 = Math.max(Math.min(docRect.bottom, head.y), docRect.top)
    const x1 = Math.min(Math.max(docRect.left, anchor.x), docRect.right)
    const x2 = Math.min(Math.max(docRect.left, head.x), docRect.right)

    return {
      anchor: {
        x: Math.min(x1, x2),
        y: Math.min(y1, y2)
      },
      head: {
        x: Math.max(x1, x2),
        y: Math.max(y1, y2)
      }
    }
  }

  public resolvePosition(position: number, inside: number, type: 'anchor' | 'head'): number {
    // if inside = -1, means position is not focus on any nodes
    // we need move position to above one
    if (inside === -1) return type === 'anchor' ? position : position - 1

    // if inside is small than position, means the position is at the bottom edge of inside position
    // if inside is bigger than position, means the position is at the top edge of inside position
    return Math.min(position, inside)
  }

  public resolveSelection(
    view: EditorView,
    pluginState: SelectionState,
    headCoords: { x: number; y: number },
    offset: { top: number; left: number }
  ): void {
    if (!pluginState.multiNodeSelecting) return

    const data = pluginState.multiNodeSelecting
    const rect = view.dom.getBoundingClientRect()
    const coordinates = this.resolveCoordinates(
      {
        x: data.anchor.x - offset.left,
        y: data.anchor.y - offset.top
      },
      {
        x: headCoords.x,
        y: headCoords.y
      },
      rect
    )

    if (!coordinates) {
      this.editor.commands.setTextSelection(0)
      return
    }

    const anchor = view.posAtCoords({ left: coordinates.anchor.x, top: coordinates.anchor.y })
    const head = view.posAtCoords({ left: coordinates.head.x, top: coordinates.head.y })

    if (!anchor || !head) {
      this.editor.commands.setTextSelection(0)
      return
    }

    // selection do not include any nodes
    if (anchor.inside === -1 && head.inside === -1 && Math.abs(anchor.pos - head.pos) <= 1) {
      this.editor.commands.setTextSelection(0)
      return
    }

    this.editor.commands.setMultipleNodeSelection(
      this.resolvePosition(anchor.pos, anchor.inside, 'anchor'),
      this.resolvePosition(head.pos, head.inside, 'head')
    )
  }

  public renderMouseSelection(
    view: EditorView,
    anchor: { x: number; y: number },
    head: { x: number; y: number }
  ): void {
    // initialize container information at start
    if (!this.container.element) {
      this.container.element = view.dom.parentElement
    }
    if (!this.container.element) return

    const containerRect = this.container.element.getBoundingClientRect()

    if (this.container.top === undefined) {
      this.container.top = containerRect.top
    }
    if (this.container.left === undefined) {
      this.container.left = containerRect.left
    }

    // create mouse selection element
    if (!this.container.mouseSelection.element) {
      const element = document.createElement('div')
      element.id = this.container.mouseSelection.id
      this.container.mouseSelection.element = element
      document.body.append(element)
      if (this.options.mouseSelectionClassName) {
        this.container.mouseSelection.element.classList.add(this.options.mouseSelectionClassName)
      }
    }

    // calculate offset
    this.container.offset.top = this.container.top - containerRect.top
    this.container.offset.left = this.container.left - containerRect.left

    // calculate mouse selection position
    this.container.mouseSelection.element.style.position = 'absolute'
    this.container.mouseSelection.element.style.left = `${Math.min(anchor.x, head.x)}px`
    this.container.mouseSelection.element.style.top = `${Math.min(anchor.y - this.container.offset.top, head.y)}px`
    this.container.mouseSelection.element.style.width = `${Math.abs(anchor.x - head.x)}px`
    this.container.mouseSelection.element.style.height = `${Math.abs(anchor.y - this.container.offset.top - head.y)}px`
  }
}
