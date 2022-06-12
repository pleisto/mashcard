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
      // eslint-disable-next-line max-nested-callbacks
      editor?.view.someProp('handleKeyDown', f => f(editor.view, { key: 'Enter' }))
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
      // eslint-disable-next-line max-nested-callbacks
      editor?.view.someProp('handleClick', f => f(editor.view, 1, { key: 'Enter' }))
    }).not.toThrow()
  })
})
