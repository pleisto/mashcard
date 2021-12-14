import { FormulaContext } from '../../context'
import { START_WITH } from '../string'

const ctx = new FormulaContext({})

describe('object', () => {
  it('START_WITH', () => {
    expect(START_WITH(ctx, { result: 'foo', type: 'string' }, { result: 'bar', type: 'string' }).result).toBe(false)
    expect(START_WITH(ctx, { result: 'foo', type: 'string' }, { result: 'foo', type: 'string' }).result).toBe(true)
  })
})
