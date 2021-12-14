import { FormulaContext } from '../../context'
import { AVERAGE } from '../statistical'

const ctx = new FormulaContext({})

describe('statistical', () => {
  it('AVERAGE', () => {
    expect(AVERAGE(ctx).result).toBe(NaN)
    expect(
      AVERAGE(ctx, { result: 1, type: 'number' }, { result: 2, type: 'number' }, { result: 3, type: 'number' }).result
    ).toBe(2)
  })
})
