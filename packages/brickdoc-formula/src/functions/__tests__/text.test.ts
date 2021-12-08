import { FormulaContext } from '../../context'
import { LEN, T, TRIM } from '../text'
const ctx = new FormulaContext()

describe('text', () => {
  it('LEN', () => {
    expect(LEN(ctx, '').result).toBe(0)
    expect(LEN(ctx, '12345 12345').result).toBe(11)
  })

  it('T', () => {
    expect(T(ctx, '').result).toBe('')
    expect(T(ctx, 'foobar').result).toBe('foobar')
    expect(T(ctx, true).result).toBe('')
    expect(T(ctx, 1).result).toBe('')
  })

  it('TRIM', () => {
    expect(TRIM(ctx, '').result).toBe('')
    expect(TRIM(ctx, '  foobar').result).toBe('foobar')
    expect(TRIM(ctx, ' foo ').result).toBe('foo')
    expect(TRIM(ctx, ' foo bar ').result).toBe('foo bar')
  })
})
