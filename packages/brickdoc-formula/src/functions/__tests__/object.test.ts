import { FormulaContext } from '../../context'
import { T, TYPE, WITH_TYPE } from '../object'

const ctx = new FormulaContext({})

describe('object', () => {
  it('T', () => {
    expect(T(ctx, { result: 1, type: 'number' }).result).toBe(1)
    expect(T(ctx, { result: 'Foo', type: 'string' }).result).toBe('Foo')
  })

  it('TYPE', () => {
    expect(TYPE(ctx, { result: 1, type: 'number' }).result).toBe('number')
  })

  it('WITH_TYPE', () => {
    expect(WITH_TYPE(ctx, { result: 1, type: 'number' }).result).toStrictEqual({ result: 1, type: 'number' })
  })
})
