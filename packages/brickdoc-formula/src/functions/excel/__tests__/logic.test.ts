import { FormulaContext } from '../../../context'
import { IF, TRUE, FALSE, NOT, AND, OR } from '../logic'

const ctx = new FormulaContext()

describe('logic', () => {
  it('IF', () => {
    expect(IF(ctx, false, 1, 2)).toBe(2)
    expect(IF(ctx, true, 1, 2)).toBe(1)
  })

  it('TRUE', () => {
    expect(TRUE(ctx)).toBe(true)
  })

  it('FALSE', () => {
    expect(FALSE(ctx)).toBe(false)
  })

  it('NOT', () => {
    expect(NOT(ctx, false)).toBe(true)
    expect(NOT(ctx, true)).toBe(false)
  })

  it('AND', () => {
    expect(AND(ctx)).toBe(true)
    expect(AND(ctx, true, true)).toBe(true)
    expect(AND(ctx, true, false)).toBe(false)
    expect(AND(ctx, false, true)).toBe(false)
    expect(AND(ctx, false, false)).toBe(false)
  })

  it('OR', () => {
    expect(OR(ctx)).toBe(false)
    expect(OR(ctx, true, true)).toBe(true)
    expect(OR(ctx, true, false)).toBe(true)
    expect(OR(ctx, false, true)).toBe(true)
    expect(OR(ctx, false, false)).toBe(false)
  })
})
