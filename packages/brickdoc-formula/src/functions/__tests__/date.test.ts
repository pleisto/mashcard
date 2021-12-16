import { FormulaContext } from '../../context'
import { NOW } from '../date'

const ctx = new FormulaContext({})

describe('date', () => {
  it('DATE', () => {
    expect(typeof NOW(ctx).result).toBe('object')
  })
})
