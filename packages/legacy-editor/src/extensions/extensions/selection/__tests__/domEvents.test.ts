import { mockEditor } from '../../../../test'
import { MultipleNodeSelectionDomEvents } from '../domEvents'
import { MultipleNodeSelection } from '../MultipleNodeSelection'

describe('DomEvents', () => {
  it('calls mousedown correctly', () => {
    const x = 1
    const y = 1
    const editor = mockEditor({})
    const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

    const event: Partial<MouseEvent> = {
      button: 0,
      clientX: x,
      clientY: y
    }

    expect(domEvents.mousedown(editor.view, event as MouseEvent)).toBeFalsy()
    expect(domEvents.container.mouseSelection.anchor).toMatchObject({
      x,
      y
    })
  })

  it('calls mousemove correctly', () => {
    const x = 1
    const y = 1
    const dom = document.createElement('div')

    // @ts-expect-error
    const editor = mockEditor({
      view: {
        dom
      }
    })
    const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

    const event: Partial<MouseEvent> = {
      clientX: x,
      clientY: y
    }

    domEvents.container.mouseSelection = {
      id: '',
      element: dom,
      selecting: false,
      anchor: {
        x: 0,
        y: 0
      }
    }

    expect(domEvents.mousemove(editor.view, event as MouseEvent)).toBeFalsy()
    expect(domEvents.container.mouseSelection.selecting).toBeTruthy()
  })

  it('calls mouseup correctly', () => {
    const x = 1
    const y = 1
    const dom = document.createElement('div')
    const mockFocus = jest.fn()
    const editor = mockEditor({
      view: {
        dom,
        state: {
          selection: Object.create(MultipleNodeSelection.prototype)
        }
      },
      commands: {
        focus: mockFocus
      }
    })
    const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

    domEvents.container.mouseSelection = {
      id: '',
      element: dom,
      selecting: true,
      anchor: {
        x: 0,
        y: 0
      }
    }

    const event: Partial<MouseEvent> = {
      clientX: x,
      clientY: y
    }

    expect(domEvents.mouseup(editor.view, event as MouseEvent)).toBeFalsy()
    expect(domEvents.container.mouseSelection.selecting).toBeFalsy()
    expect(mockFocus).toBeCalled()
  })

  it('calls dragstart correctly', () => {
    const x = 1
    const y = 1
    const dom = document.createElement('div')
    const editor = mockEditor({})
    const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

    domEvents.container.mouseSelection = {
      id: '',
      element: dom,
      selecting: true,
      anchor: {
        x: 0,
        y: 0
      }
    }

    const event: Partial<DragEvent> = {
      clientX: x,
      clientY: y
    }

    expect(domEvents.dragstart(editor.view, event as any)).toBeFalsy()
    expect(domEvents.container.mouseSelection.selecting).toBeFalsy()
  })

  it('resolves position correctly', () => {
    const editor = mockEditor()
    const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

    expect(domEvents.resolvePosition(1, 2, 'anchor')).toBe(1)
    expect(domEvents.resolvePosition(1, -1, 'anchor')).toBe(1)
    expect(domEvents.resolvePosition(1, 2, 'head')).toBe(1)
    expect(domEvents.resolvePosition(1, -1, 'head')).toBe(0)
  })

  describe('resolveCoordinates', () => {
    it('resolves null if outside the document area correctly', () => {
      const editor = mockEditor()
      const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

      expect(
        domEvents.resolveCoordinates({ x: 1, y: 1 }, { x: 10, y: 1 }, { top: 2, left: 2, bottom: 4, right: 4 })
      ).toBeNull()

      expect(
        domEvents.resolveCoordinates({ x: 1, y: 10 }, { x: 10, y: 10 }, { top: 2, left: 2, bottom: 4, right: 4 })
      ).toBeNull()

      expect(
        domEvents.resolveCoordinates({ x: 1, y: 3 }, { x: 1, y: 10 }, { top: 2, left: 2, bottom: 4, right: 4 })
      ).toBeNull()

      expect(
        domEvents.resolveCoordinates({ x: 10, y: 3 }, { x: 10, y: 10 }, { top: 2, left: 2, bottom: 4, right: 4 })
      ).toBeNull()
    })

    it('resolves coordinates correctly', () => {
      const editor = mockEditor()
      const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

      expect(
        domEvents.resolveCoordinates({ x: 1, y: 3 }, { x: 10, y: 3 }, { top: 2, left: 2, bottom: 4, right: 4 })
      ).toMatchObject({
        anchor: {
          x: 2,
          y: 3
        },
        head: {
          x: 4,
          y: 3
        }
      })
    })

    it('renders mouse selection correctly', () => {
      const editor = mockEditor()
      const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

      domEvents.options = {
        mouseSelectionClassName: 'mouseSelection'
      }

      domEvents.container.element = {
        top: 1,
        left: 2,
        style: {},
        getBoundingClientRect() {
          return {
            top: 1,
            left: 2,
            right: 3,
            bottom: 4
          }
        }
      } as any

      domEvents.renderMouseSelection(editor.view, { x: 1, y: 2 }, { x: 3, y: 4 })

      expect(domEvents.container.offset.top).toBe(0)
      expect(domEvents.container.offset.left).toBe(0)
      expect(domEvents.container.mouseSelection.element!.style.position).toBe('absolute')
      expect(domEvents.container.mouseSelection.element!.style.left).toBe('1px')
      expect(domEvents.container.mouseSelection.element!.style.top).toBe('2px')
      expect(domEvents.container.mouseSelection.element!.style.width).toBe('2px')
      expect(domEvents.container.mouseSelection.element!.style.height).toBe('2px')
    })
  })
})
