import { FormulaContext } from '../../context'
import { IF, TRUE, FALSE, NOT, AND, OR } from '../logic'

const ctx = new FormulaContext({})

describe('logic', () => {
  it('IF', () => {
    expect(
      IF(ctx, { result: false, type: 'boolean' }, { result: 1, type: 'number' }, { result: 2, type: 'number' }).result
    ).toBe(2)
    expect(
      IF(ctx, { result: true, type: 'boolean' }, { result: 1, type: 'number' }, { result: 2, type: 'number' }).result
    ).toBe(1)
  })

  it('TRUE', () => {
    expect(TRUE(ctx).result).toBe(true)
  })

  it('FALSE', () => {
    expect(FALSE(ctx).result).toBe(false)
  })

  it('NOT', () => {
    expect(NOT(ctx, { result: false, type: 'boolean' }).result).toBe(true)
    expect(NOT(ctx, { result: true, type: 'boolean' }).result).toBe(false)
  })

  it('AND', () => {
    expect(AND(ctx).result).toBe(true)
    expect(AND(ctx, { result: true, type: 'boolean' }, { result: true, type: 'boolean' }).result).toBe(true)
    expect(AND(ctx, { result: true, type: 'boolean' }, { result: false, type: 'boolean' }).result).toBe(false)
    expect(AND(ctx, { result: false, type: 'boolean' }, { result: true, type: 'boolean' }).result).toBe(false)
    expect(AND(ctx, { result: false, type: 'boolean' }, { result: false, type: 'boolean' }).result).toBe(false)
  })

  it('OR', () => {
    expect(OR(ctx).result).toBe(false)
    expect(OR(ctx, { result: true, type: 'boolean' }, { result: true, type: 'boolean' }).result).toBe(true)
    expect(OR(ctx, { result: true, type: 'boolean' }, { result: false, type: 'boolean' }).result).toBe(true)
    expect(OR(ctx, { result: false, type: 'boolean' }, { result: true, type: 'boolean' }).result).toBe(true)
    expect(OR(ctx, { result: false, type: 'boolean' }, { result: false, type: 'boolean' }).result).toBe(false)
  })
})
