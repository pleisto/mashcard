import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { EditorContent } from '@tiptap/react'
import { useTestEditor } from '../../../../test/testEditor'
import { Paragraph, SubPageMenu } from '../../../blocks'
import { KeyboardShortcut } from '../keyboardShortcut'

describe('KeyboardShortcut', () => {
  it('triggers cmd+s keyboard shortcut correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [KeyboardShortcut]
      })
    )

    const editor = result.current

    expect(() => {
      editor!.commands.keyboardShortcut('Mod-s')
    }).not.toThrow()
  })

  it('deletes nothing correctly', () => {
    const content = ``

    const { result } = renderHook(() =>
      useTestEditor({
        content,
        extensions: [SubPageMenu, KeyboardShortcut]
      })
    )

    const editor = result.current

    render(<EditorContent editor={editor} />)

    expect(editor?.state.doc.content.childCount).toEqual(1)

    editor?.commands.keyboardShortcut('Backspace')

    expect(editor?.state.doc.content.childCount).toEqual(1)
  })

  it('deletes content correctly', () => {
    const content = `
    <sub-page-menu-block></sub-page-menu-block>
    <p>p</p>
    `

    const { result } = renderHook(() =>
      useTestEditor({
        content,
        extensions: [SubPageMenu, KeyboardShortcut]
      })
    )

    const editor = result.current

    render(<EditorContent editor={editor} />)

    expect(editor?.state.doc.content.childCount).toEqual(2)

    editor?.commands.keyboardShortcut('Backspace')

    expect(editor?.state.doc.content.childCount).toEqual(1)
  })

  it('deletes unselectable node correctly', () => {
    const content = `
    <sub-page-menu-block></sub-page-menu-block>
    `

    const { result } = renderHook(() =>
      useTestEditor({
        content,
        extensions: [SubPageMenu, KeyboardShortcut]
      })
    )

    const editor = result.current

    render(<EditorContent editor={editor} />)

    expect(editor?.state.doc.content.firstChild?.type.name).toEqual(SubPageMenu.name)

    editor?.commands.keyboardShortcut('Backspace')

    expect(editor?.state.doc.content.firstChild?.type.name).toEqual(Paragraph.name)
  })
})
