import { FormulaContext } from '../../context'
import { AVERAGE } from '../statistical'

const ctx = new FormulaContext()

describe('statistical', () => {
  it('AVERAGE', () => {
    expect(AVERAGE(ctx).result).toBe(NaN)
    expect(AVERAGE(ctx, 1, 2, 3).result).toBe(2)
  })
})
