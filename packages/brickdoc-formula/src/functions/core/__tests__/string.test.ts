import { FormulaContext } from '../../../context'
import { START_WITH } from '../string'

const ctx = new FormulaContext()

describe('object', () => {
  it('START_WITH', () => {
    expect(START_WITH(ctx, 'foo', 'bar')).toBe(false)
    expect(START_WITH(ctx, 'foo', 'foo')).toBe(true)
  })
})
