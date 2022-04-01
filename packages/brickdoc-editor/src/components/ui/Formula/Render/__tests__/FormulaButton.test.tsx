import { ButtonResult } from '@brickdoc/formula'
import { render } from '@testing-library/react'
import { FormulaButton } from '../..'

describe('FormulaButton', () => {
  it('renders FormulaButton correctly', () => {
    const result: Partial<ButtonResult['result']> = { name: 'name' }
    const buttonResult: ButtonResult = {
      type: 'Button',
      result: result as ButtonResult['result']
    }
    const { container } = render(<FormulaButton formulaType="normal" result={buttonResult} />)

    expect(container).toMatchSnapshot()
  })
})
