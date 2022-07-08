import { AnyTypeResult } from '@mashcard/formula'
import { render } from '@testing-library/react'
import { FormulaLiteral } from '../FormulaLiteral'

describe('FormulaLiteral', () => {
  it('renders string type result correctly', () => {
    const stringResult: AnyTypeResult<'literal'> = {
      type: 'literal',
      result: 'result'
    }
    const { container } = render(<FormulaLiteral formulaType="normal" result={stringResult} />)

    expect(container).toMatchSnapshot()
  })

  it('renders number type result correctly', () => {
    const numberResult: AnyTypeResult<'literal'> = {
      type: 'literal',
      result: '1'
    }
    const { container } = render(<FormulaLiteral formulaType="normal" result={numberResult} />)

    expect(container).toMatchSnapshot()
  })
})
