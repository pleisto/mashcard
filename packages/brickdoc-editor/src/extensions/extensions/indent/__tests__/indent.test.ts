import { renderHook } from '@testing-library/react-hooks'
import { useTestEditor } from '../../../../test/testEditor'
import { BulletList, OrderedList } from '../../../blocks'
import { Indent } from '../indent'

describe('Indent', () => {
  it('triggers indent correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [BulletList, OrderedList, Indent]
      })
    )

    const editor = result.current

    expect(() => {
      editor!.commands.indent()
    }).not.toThrow()
  })

  it('triggers indent through keyboard shortcut correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [BulletList, OrderedList, Indent]
      })
    )

    const editor = result.current

    expect(() => {
      editor!.commands.keyboardShortcut('Tab')
    }).not.toThrow()
  })

  it('triggers indent in list type content correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: '<ul><li>item 1</li></ul>',
        extensions: [BulletList, OrderedList, Indent]
      })
    )

    const editor = result.current

    expect(() => {
      editor!.commands.indent()
    }).not.toThrow()
  })

  it('triggers deindent correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [BulletList, OrderedList, Indent]
      })
    )

    const editor = result.current

    expect(() => {
      editor!.commands.deindent()
    }).not.toThrow()
  })

  it('triggers deindent through keyboard shortcut correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [BulletList, OrderedList, Indent]
      })
    )

    const editor = result.current

    expect(() => {
      editor!.commands.keyboardShortcut('Shift-Tab')
    }).not.toThrow()
  })

  it('triggers deindent in list type content correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: '<ul><li>item 1</li></ul>',
        extensions: [BulletList, OrderedList, Indent]
      })
    )

    const editor = result.current

    expect(() => {
      editor!.commands.deindent()
    }).not.toThrow()
  })
})
