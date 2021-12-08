import { FormulaContext } from '../../context'
import { TODAY } from '../date'

const ctx = new FormulaContext()

describe('date', () => {
  it('DATE', () => {
    expect(typeof TODAY(ctx).result).toBe('object')
  })
})
