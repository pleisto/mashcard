import { FormulaContext } from '../../../context'
import { T, TYPE, WITH_TYPE } from '../object'

const ctx = new FormulaContext()

describe('object', () => {
  it('T', () => {
    expect(T(ctx, false)).toBe(false)
    expect(T(ctx, [])).toStrictEqual([])
  })

  it('TYPE', () => {
    expect(TYPE(ctx, 1)).toBe('number')
    expect(TYPE(ctx, [])).toBe('object')
  })

  it('WITH_TYPE', () => {
    expect(WITH_TYPE(ctx, 1)).toStrictEqual({ type: 'number', obj: 1 })
    expect(WITH_TYPE(ctx, '123')).toStrictEqual({ type: 'string', obj: '123' })
  })
})
