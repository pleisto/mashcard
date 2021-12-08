import { FormulaContext } from '../../context'
import { IF, TRUE, FALSE, NOT, AND, OR } from '../logic'

const ctx = new FormulaContext()

describe('logic', () => {
  it('IF', () => {
    expect(IF(ctx, false, 1, 2).result).toBe(2)
    expect(IF(ctx, true, 1, 2).result).toBe(1)
  })

  it('TRUE', () => {
    expect(TRUE(ctx).result).toBe(true)
  })

  it('FALSE', () => {
    expect(FALSE(ctx).result).toBe(false)
  })

  it('NOT', () => {
    expect(NOT(ctx, false).result).toBe(true)
    expect(NOT(ctx, true).result).toBe(false)
  })

  it('AND', () => {
    expect(AND(ctx).result).toBe(true)
    expect(AND(ctx, true, true).result).toBe(true)
    expect(AND(ctx, true, false).result).toBe(false)
    expect(AND(ctx, false, true).result).toBe(false)
    expect(AND(ctx, false, false).result).toBe(false)
  })

  it('OR', () => {
    expect(OR(ctx).result).toBe(false)
    expect(OR(ctx, true, true).result).toBe(true)
    expect(OR(ctx, true, false).result).toBe(true)
    expect(OR(ctx, false, true).result).toBe(true)
    expect(OR(ctx, false, false).result).toBe(false)
  })
})
