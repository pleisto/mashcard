import { InputResult } from '@brickdoc/formula'
import { render } from '@testing-library/react'
import { FormulaInput } from '../FormulaInput'

describe('FormulaInput', () => {
  it('renders FormulaInput correctly', () => {
    const value = 'value'
    const result: Partial<InputResult['result']> = { disabled: false, value }
    const inputResult: InputResult = {
      type: 'Input',
      result: result as InputResult['result']
    }
    const { container } = render(<FormulaInput formulaType="normal" result={inputResult} />)

    expect(container).toMatchSnapshot()
  })
})
