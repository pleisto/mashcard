import { TextSelection } from 'prosemirror-state'
import { Mappable } from 'prosemirror-transform'
import { renderHook } from '@testing-library/react'
import { useTestEditor } from '../../../../test'
import { MultipleNodeSelection } from '../MultipleNodeSelection'
import { MultipleNodeBookmark } from '../MultipleNodeBookmark'

describe('MultipleNodeSelection', () => {
  it('creates MultipleNodeSelection includes multiple nodes correctly', () => {
    const anchor = 1
    const head = 4
    const text1 = '1'
    const text2 = '2'
    const { result } = renderHook(() =>
      useTestEditor({
        content: `
          <p>${text1}</p>
          <p>${text2}</p>
        `
      })
    )

    const editor = result.current!

    const selection = MultipleNodeSelection.create(editor.state.doc, anchor, head)

    expect(selection.$anchorPos.pos).toEqual(anchor)
    expect(selection.$headPos.pos).toEqual(head)
    expect(selection.ranges.length).toBe(2)
    expect(selection.$anchorPos.node().textContent).toEqual(text1)
    expect(selection.$headPos.node().textContent).toEqual(text2)
  })

  it('equals to another selection included same nodes', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: `
          <p>1</p>
          <p>2</p>
          <p>3</p>
        `
      })
    )

    const editor = result.current!

    const selection1 = MultipleNodeSelection.create(editor.state.doc, 1, 4)
    const selection2 = MultipleNodeSelection.create(editor.state.doc, 1, 5)
    const selection3 = MultipleNodeSelection.create(editor.state.doc, 1, 2)
    const selection4 = MultipleNodeSelection.create(editor.state.doc, 4, 7)
    const selection5 = TextSelection.create(editor.state.doc, 1, 4)

    expect(selection1.eq(selection2)).toBeTruthy()
    expect(selection1.eq(selection3)).toBeFalsy()
    expect(selection1.eq(selection4)).toBeFalsy()
    expect(selection1.eq(selection5)).toBeFalsy()
  })

  it('transforms to JSON object correctly', () => {
    const anchor = 1
    const head = 4
    const { result } = renderHook(() =>
      useTestEditor({
        content: `
          <p>1</p>
          <p>2</p>
        `
      })
    )

    const editor = result.current!

    const selection = MultipleNodeSelection.create(editor.state.doc, anchor, head)

    expect(selection.toJSON()).toMatchObject({
      type: 'multiple-node',
      anchor,
      head
    })
  })

  it('transforms from JSON object correctly', () => {
    const anchor = 1
    const head = 4
    const { result } = renderHook(() =>
      useTestEditor({
        content: `
          <p>1</p>
          <p>2</p>
        `
      })
    )

    const editor = result.current!

    const selection = MultipleNodeSelection.fromJSON(editor.state.doc, {
      type: 'multiple-node',
      anchor,
      head
    })

    expect(selection.$anchorPos.pos).toEqual(anchor)
    expect(selection.$headPos.pos).toEqual(head)
  })

  it('maps to new selection correctly', () => {
    const anchor = 1
    const head = 4
    const { result } = renderHook(() =>
      useTestEditor({
        content: `
          <p>1</p>
          <p>2</p>
        `
      })
    )

    const editor = result.current!

    const selection = MultipleNodeSelection.create(editor.state.doc, anchor, head)

    const mapping: Mappable = {
      map(pos) {
        return pos + 1
      },
      mapResult(pos: number, assoc?: number | undefined) {
        throw new Error('mapResult not implemented.')
      }
    }

    const newSelection = selection.map(editor.state.doc, mapping)

    expect(newSelection.$anchorPos.pos).toEqual(anchor + 1)
    expect(newSelection.$headPos.pos).toEqual(head + 1)
  })

  it('gets a slice of selected contents correctly', () => {
    const anchor = 1
    const head = 4
    const text1 = '1'
    const text2 = '2'
    const { result } = renderHook(() =>
      useTestEditor({
        content: `
          <p>${text1}</p>
          <p>${text2}</p>
        `
      })
    )

    const editor = result.current!

    const selection = MultipleNodeSelection.create(editor.state.doc, anchor, head)

    expect(selection.content().content.childCount).toBe(2)
    expect(selection.content().content.firstChild?.textContent).toEqual(text1)
    expect(selection.content().content.lastChild?.textContent).toEqual(text2)
  })

  it('replaces selection by node correctly', () => {
    const anchor = 1
    const head = 4
    const text1 = '1'
    const text2 = '2'
    const { result } = renderHook(() =>
      useTestEditor({
        content: `
          <p>${text1}</p>
          <p>${text2}</p>
        `
      })
    )

    const editor = result.current!

    const selection = MultipleNodeSelection.create(editor.state.doc, anchor, head)
    const node = selection.ranges[0].$from.node()
    editor.commands.command(({ tr }) => {
      selection.replaceWith(tr, node)
      return true
    })

    expect(editor.state.doc.textContent).toBe(text1)
  })

  it('gets bookmark correctly', () => {
    const anchor = 1
    const head = 4
    const { result } = renderHook(() =>
      useTestEditor({
        content: `
          <p>1</p>
          <p>2</p>
        `
      })
    )

    const editor = result.current!

    const selection = MultipleNodeSelection.create(editor.state.doc, anchor, head)

    expect(selection.getBookmark()).toBeInstanceOf(MultipleNodeBookmark)
  })
})
