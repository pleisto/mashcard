import { FormulaContext } from '../../../context'
import { LEN, T, TRIM } from '../text'
const ctx = new FormulaContext()

describe('text', () => {
  it('LEN', () => {
    expect(LEN(ctx, '')).toBe(0)
    expect(LEN(ctx, '12345 12345')).toBe(11)
  })

  it('T', () => {
    expect(T(ctx, '')).toBe('')
    expect(T(ctx, 'foobar')).toBe('foobar')
    expect(T(ctx, true)).toBe('')
    expect(T(ctx, 1)).toBe('')
  })

  it('TRIM', () => {
    expect(TRIM(ctx, '')).toBe('')
    expect(TRIM(ctx, '  foobar')).toBe('foobar')
    expect(TRIM(ctx, ' foo ')).toBe('foo')
    expect(TRIM(ctx, ' foo bar ')).toBe('foo bar')
  })
})
