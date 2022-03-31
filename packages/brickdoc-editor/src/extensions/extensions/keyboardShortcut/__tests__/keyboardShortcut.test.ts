import { renderHook } from '@testing-library/react-hooks'
import { useTestEditor } from '../../../../test/testEditor'
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
})
