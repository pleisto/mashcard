import { renderHook } from '@testing-library/react-hooks'
import { useTestEditor } from '../../../../test/testEditor'
import { FormulaHandleKeyDown } from '../handleKeyDown'

describe('formulaHandleKeyDown', () => {
  it('triggers handleKeyDown correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [
          FormulaHandleKeyDown.configure({
            formulaId: 'formulaId',
            rootId: 'rootId'
          })
        ]
      })
    )

    const editor = result.current

    expect(() => {
      editor?.view.someProp('handleKeyDown', f => f(editor.view, new KeyboardEvent('keydown', { key: 'Enter' })))
    }).not.toThrow()
  })

  it('triggers click correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [
          FormulaHandleKeyDown.configure({
            formulaId: 'formulaId',
            rootId: 'rootId'
          })
        ]
      })
    )

    const editor = result.current

    expect(() => {
      editor?.view.someProp('handleClick', f => f(editor.view, 1, new MouseEvent('click', { bubbles: true })))
    }).not.toThrow()
  })
})
