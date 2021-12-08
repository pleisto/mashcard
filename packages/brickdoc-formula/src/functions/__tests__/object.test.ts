import { FormulaContext } from '../../context'
import { T, TYPE, WITH_TYPE } from '../object'

const ctx = new FormulaContext()

describe('object', () => {
  it('T', () => {
    expect(T(ctx, false).result).toBe(false)
    expect(T(ctx, []).result).toStrictEqual([])
  })

  it('TYPE', () => {
    expect(TYPE(ctx, 1).result).toBe('number')
    expect(TYPE(ctx, []).result).toBe('object')
  })

  it('WITH_TYPE', () => {
    expect(WITH_TYPE(ctx, 1).result).toStrictEqual({ type: 'number', obj: 1 })
    expect(WITH_TYPE(ctx, '123').result).toStrictEqual({ type: 'string', obj: '123' })
  })
})
