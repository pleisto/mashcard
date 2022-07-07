import { AnyTypeResult } from '@mashcard/formula'
import { render } from '@testing-library/react'
import { FormulaButton } from '../..'

describe('FormulaButton', () => {
  it('renders FormulaButton correctly', () => {
    const result: Partial<AnyTypeResult<'Button'>['result']> = { name: 'name' }
    const buttonResult: AnyTypeResult<'Button'> = {
      type: 'Button',
      result: result as AnyTypeResult<'Button'>['result']
    }
    const { container } = render(<FormulaButton formulaType="normal" result={buttonResult} />)

    expect(container).toMatchSnapshot()
  })
})
