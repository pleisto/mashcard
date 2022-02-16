import { FormulaContext } from '../../context'
import { FormulaSourceType } from '../../types'
import { ABS, INT, LOG10, PI, POWER, RAND, RANDBETWEEN, SQRT, SQRTPI, TRUNC, LN } from '../math'

const ctx = {
  formulaContext: new FormulaContext({}),
  interpretContext: {
    ctx: {},
    arguments: []
  },
  meta: {
    namespaceId: '57622108-1337-4edd-833a-2557835bcfe0',
    variableId: '481b6dd1-e668-4477-9e47-cfe5cb1239d0',
    name: 'v',
    input: '=24',
    position: 0,
    type: 'normal' as FormulaSourceType
  }
}

describe('math', () => {
  it('ABS', () => {
    expect(ABS(ctx, { result: 0, type: 'number' }).result).toBe(0)
    expect(ABS(ctx, { result: 1, type: 'number' }).result).toBe(1)
    expect(ABS(ctx, { result: -1, type: 'number' }).result).toBe(1)
  })

  it('INT', () => {
    expect(INT(ctx, { result: 0, type: 'number' }).result).toBe(0)
    expect(INT(ctx, { result: 1, type: 'number' }).result).toBe(1)
    expect(INT(ctx, { result: -1, type: 'number' }).result).toBe(-1)
    expect(INT(ctx, { result: 1.1, type: 'number' }).result).toBe(1)
    expect(INT(ctx, { result: 1.5, type: 'number' }).result).toBe(1)
  })

  it('LOG10', () => {
    expect(LOG10(ctx, { result: 1, type: 'number' }).result).toBe(0)
    expect(LOG10(ctx, { result: 10, type: 'number' }).result).toBe(1)
    expect(LOG10(ctx, { result: 100, type: 'number' }).result).toBe(2)
    expect(LOG10(ctx, { result: 1000, type: 'number' }).result).toBe(3)
  })

  it('PI', () => {
    expect(PI(ctx).result).toBe(3.141592653589793)
  })

  it('POWER', () => {
    expect(POWER(ctx, { result: 2, type: 'number' }, { result: 3, type: 'number' }).result).toBe(8)
    expect(POWER(ctx, { result: 2, type: 'number' }, { result: 0, type: 'number' }).result).toBe(1)
    expect(POWER(ctx, { result: 2, type: 'number' }, { result: -3, type: 'number' }).result).toBe(0.125)
  })

  it('RAND', () => {
    expect(RAND(ctx).result).toBeGreaterThanOrEqual(0)
    expect(RAND(ctx).result).toBeLessThanOrEqual(1)
  })

  it('RANDBETWEEN', () => {
    expect(
      RANDBETWEEN(ctx, { result: 1, type: 'number' }, { result: 2, type: 'number' }).result
    ).toBeGreaterThanOrEqual(1)
    expect(RANDBETWEEN(ctx, { result: 1, type: 'number' }, { result: 2, type: 'number' }).result).toBeLessThanOrEqual(2)
  })

  it('SQRT', () => {
    expect(SQRT(ctx, { result: 4, type: 'number' }).result).toBe(2)
    expect(SQRT(ctx, { result: 9, type: 'number' }).result).toBe(3)
    expect(SQRT(ctx, { result: 16, type: 'number' }).result).toBe(4)
  })

  it('SQRTPI', () => {
    expect(Math.round(SQRTPI(ctx, { result: 1, type: 'number' }).result)).toBe(2)
    expect(Math.round(SQRTPI(ctx, { result: 2, type: 'number' }).result)).toBe(3)
    expect(Math.round(SQRTPI(ctx, { result: 3, type: 'number' }).result)).toBe(3)
  })

  it('TRUNC', () => {
    expect(TRUNC(ctx, { result: 1.1, type: 'number' }).result).toBe(1)
    expect(TRUNC(ctx, { result: 1.9, type: 'number' }).result).toBe(1)
    expect(TRUNC(ctx, { result: 1.5, type: 'number' }).result).toBe(1)
    expect(TRUNC(ctx, { result: 1.0, type: 'number' }).result).toBe(1)
    expect(TRUNC(ctx, { result: 0.1, type: 'number' }).result).toBe(0)
    expect(TRUNC(ctx, { result: 0.9, type: 'number' }).result).toBe(0)
    expect(TRUNC(ctx, { result: 0.5, type: 'number' }).result).toBe(0)
    expect(TRUNC(ctx, { result: 0.0, type: 'number' }).result).toBe(0)
  })

  it('LN', () => {
    expect(LN(ctx, { result: 1, type: 'number' }).result).toBe(0)
  })
})
