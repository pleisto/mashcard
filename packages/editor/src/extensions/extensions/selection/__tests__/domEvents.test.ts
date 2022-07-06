import { mockEditor } from '../../../../test'
import { MultipleNodeSelectionDomEvents } from '../domEvents'
import { SelectionPluginKey } from '../selection'

jest.useFakeTimers()

describe('DomEvents', () => {
  it('calls mousedown correctly', () => {
    const mockSetMeta = jest.fn()
    const x = 1
    const y = 1
    const editor = mockEditor({
      view: {
        posAtCoords: () => ({
          inside: -1
        }),
        state: {
          tr: {
            setMeta: mockSetMeta
          }
        }
      }
    })
    const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

    const event: Partial<MouseEvent> = {
      clientX: x,
      clientY: y
    }

    expect(domEvents.mousedown(editor.view, event as MouseEvent)).toBeFalsy()
    expect(mockSetMeta).toBeCalledWith('updateSelectionAnchor', {
      x,
      y
    })
  })

  it('calls mousemove correctly', () => {
    const mockSetMeta = jest.fn()
    const x = 1
    const y = 1
    const dom = document.createElement('div')

    // @ts-expect-error
    const editor = mockEditor({
      view: {
        dom,
        posAtCoords: () => ({
          inside: -1
        }),
        state: {
          [(SelectionPluginKey as any).key]: {
            multiNodeSelecting: {
              selecting: false,
              anchor: {
                x,
                y
              }
            }
          },
          tr: {
            setMeta: mockSetMeta
          }
        }
      }
    })
    const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

    const event: Partial<MouseEvent> = {
      clientX: x,
      clientY: y
    }

    expect(domEvents.mousemove(editor.view, event as MouseEvent)).toBeFalsy()
    expect(mockSetMeta).toBeCalledTimes(2)
  })

  it('calls mouseup correctly', () => {
    const mockSetMeta = jest.fn()
    const x = 1
    const y = 1
    const dom = document.createElement('div')
    const editor = mockEditor({
      view: {
        dom,
        posAtCoords: () => ({
          inside: -1
        }),
        state: {
          [(SelectionPluginKey as any).key]: {
            multiNodeSelecting: {
              selecting: false,
              anchor: {
                x,
                y
              }
            }
          },
          tr: {
            setMeta: mockSetMeta
          }
        }
      }
    })
    const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

    const event: Partial<MouseEvent> = {
      clientX: x,
      clientY: y
    }

    expect(domEvents.mouseup(editor.view, event as MouseEvent)).toBeFalsy()
    jest.runAllTimers()
    expect(mockSetMeta).toBeCalledWith('multipleNodeSelectingEnd', true)
  })

  it('calls dragstart correctly', () => {
    const mockSetMeta = jest.fn()
    const x = 1
    const y = 1
    const dom = document.createElement('div')
    const editor = mockEditor({
      view: {
        dom,
        posAtCoords: () => ({
          inside: -1
        }),
        state: {
          [(SelectionPluginKey as any).key]: {
            multiNodeSelecting: {
              selecting: false,
              anchor: {
                x,
                y
              }
            }
          },
          tr: {
            setMeta: mockSetMeta
          }
        }
      }
    })
    const domEvents = new MultipleNodeSelectionDomEvents(editor, {})

    const event: Partial<DragEvent> = {
      clientX: x,
      clientY: y
    }

    expect(domEvents.dragstart(editor.view, event as any)).toBeFalsy()
    expect(mockSetMeta).toBeCalledWith('multipleNodeSelectingEnd', true)
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
  })
})
