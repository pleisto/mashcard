import { TextSelection } from 'prosemirror-state'
import { mockEditor } from '../../../../test'
import { MultipleNodeSelectionDomEvents } from '../domEvents'
import { normalizeSelection } from '../normalizeSelection'
import * as helpers from '../../../../helpers/selection'
import { NodeRange } from '@tiptap/core'

jest.mock('../../../../helpers/selection.ts')

describe('normalizeSelection', () => {
  it('returns null if editor is not editable', () => {
    const editor = mockEditor({
      isEditable: false
    })
    const $anchor = { pos: 1 }
    const $head = { pos: 2 }

    const selection = normalizeSelection(editor, editor.view, $anchor as any, $head as any)

    expect(selection).toBeNull()
  })

  it('returns current selection if multiple node selection is selecting', () => {
    const editor = mockEditor({
      isEditable: true,
      view: {
        state: {
          selection: {}
        }
      }
    })
    const $anchor = { pos: 1 }
    const $head = { pos: 2 }

    MultipleNodeSelectionDomEvents.selecting = true

    const selection = normalizeSelection(editor, editor.view, $anchor as any, $head as any)

    expect(selection).toBe(editor.view.state.selection)
  })

  it('returns null if selection has no length', () => {
    const editor = mockEditor({
      isEditable: true,
      view: {
        state: {
          selection: {}
        }
      }
    })
    const $anchor = { pos: 1 }
    const $head = { pos: 1 }

    MultipleNodeSelectionDomEvents.selecting = false

    const selection = normalizeSelection(editor, editor.view, $anchor as any, $head as any)

    expect(selection).toBeNull()
  })

  it('returns null if current selection is TextSelection', () => {
    const editor = mockEditor({
      isEditable: true
    })
    const $anchor = { pos: 1 }
    const $head = { pos: 2 }

    MultipleNodeSelectionDomEvents.selecting = false

    const selection = normalizeSelection(editor, editor.view, $anchor as any, $head as any)

    expect(selection).toBeNull()
  })

  it('filters empty nodes in text selection tail', () => {
    const nodeRanges: NodeRange[] = [
      {
        node: {} as any,
        from: 0,
        to: 5
      },
      {
        node: {} as any,
        from: 5,
        to: 10
      },
      {
        node: {} as any,
        from: 10,
        to: 11
      }
    ]
    jest.spyOn(helpers, 'findNodesInSelection').mockImplementation(() => nodeRanges)
    const createTextSelection = jest.fn()
    jest.spyOn(TextSelection, 'create').mockImplementation(createTextSelection)

    const currentSelection = Object.create(TextSelection.prototype)
    const editor = mockEditor({
      isEditable: true,
      view: {
        state: {
          selection: currentSelection
        }
      }
    })
    const $anchor = { pos: 1 }
    const $head = { pos: 2 }

    MultipleNodeSelectionDomEvents.selecting = false

    normalizeSelection(editor, editor.view, $anchor as any, $head as any)

    expect(createTextSelection).toBeCalled()
  })

  it('returns null if all nodes in text selection is empty', () => {
    const nodeRanges: NodeRange[] = [
      {
        node: {} as any,
        from: 0,
        to: 1
      },
      {
        node: {} as any,
        from: 1,
        to: 2
      },
      {
        node: {} as any,
        from: 2,
        to: 3
      }
    ]
    jest.spyOn(helpers, 'findNodesInSelection').mockImplementation(() => nodeRanges)

    const currentSelection = Object.create(TextSelection.prototype)
    const editor = mockEditor({
      isEditable: true,
      view: {
        state: {
          selection: currentSelection
        }
      }
    })
    const $anchor = { pos: 1 }
    const $head = { pos: 2 }

    MultipleNodeSelectionDomEvents.selecting = false

    const selection = normalizeSelection(editor, editor.view, $anchor as any, $head as any)

    expect(selection).toBeNull()
  })
})
