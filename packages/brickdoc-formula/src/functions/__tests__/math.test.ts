import { FormulaContext } from '../../context'
import { ABS, INT, LOG10, PI, POWER, RAND, RANDBETWEEN, SQRT, SQRTPI, TRUNC, LN } from '../math'

const ctx = new FormulaContext()

describe('math', () => {
  it('ABS', () => {
    expect(ABS(ctx, 0).result).toBe(0)
    expect(ABS(ctx, 1).result).toBe(1)
    expect(ABS(ctx, -1).result).toBe(1)
  })

  it('INT', () => {
    expect(INT(ctx, 0).result).toBe(0)
    expect(INT(ctx, 1).result).toBe(1)
    expect(INT(ctx, -1).result).toBe(-1)
    expect(INT(ctx, 1.1).result).toBe(1)
    expect(INT(ctx, 1.5).result).toBe(1)
  })

  it('LOG10', () => {
    expect(LOG10(ctx, 1).result).toBe(0)
    expect(LOG10(ctx, 10).result).toBe(1)
    expect(LOG10(ctx, 100).result).toBe(2)
    expect(LOG10(ctx, 1000).result).toBe(3)
  })

  it('PI', () => {
    expect(PI(ctx).result).toBe(3.141592653589793)
  })

  it('POWER', () => {
    expect(POWER(ctx, 2, 3).result).toBe(8)
    expect(POWER(ctx, 2, 0).result).toBe(1)
    expect(POWER(ctx, 2, -3).result).toBe(0.125)
  })

  it('RAND', () => {
    expect(RAND(ctx).result).toBeGreaterThanOrEqual(0)
    expect(RAND(ctx).result).toBeLessThanOrEqual(1)
  })

  it('RANDBETWEEN', () => {
    expect(RANDBETWEEN(ctx, 1, 2).result).toBeGreaterThanOrEqual(1)
    expect(RANDBETWEEN(ctx, 1, 2).result).toBeLessThanOrEqual(2)
  })

  it('SQRT', () => {
    expect(SQRT(ctx, 4).result).toBe(2)
    expect(SQRT(ctx, 9).result).toBe(3)
    expect(SQRT(ctx, 16).result).toBe(4)
  })

  it('SQRTPI', () => {
    expect(Math.round(SQRTPI(ctx, 1).result)).toBe(2)
    expect(Math.round(SQRTPI(ctx, 2).result)).toBe(3)
    expect(Math.round(SQRTPI(ctx, 3).result)).toBe(3)
  })

  it('TRUNC', () => {
    expect(TRUNC(ctx, 1.1).result).toBe(1)
    expect(TRUNC(ctx, 1.9).result).toBe(1)
    expect(TRUNC(ctx, 1.5).result).toBe(1)
    expect(TRUNC(ctx, 1.0).result).toBe(1)
    expect(TRUNC(ctx, 0.1).result).toBe(0)
    expect(TRUNC(ctx, 0.9).result).toBe(0)
    expect(TRUNC(ctx, 0.5).result).toBe(0)
    expect(TRUNC(ctx, 0.0).result).toBe(0)
  })

  it('LN', () => {
    expect(LN(ctx, 1).result).toBe(0)
  })
})
