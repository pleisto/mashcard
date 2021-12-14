import { FormulaContext } from '../../context'
import { LEN, TRIM } from '../text'
const ctx = new FormulaContext({})

describe('text', () => {
  it('LEN', () => {
    expect(LEN(ctx, { result: '', type: 'string' }).result).toBe(0)
    expect(LEN(ctx, { result: '12345 12345', type: 'string' }).result).toBe(11)
  })

  it('TRIM', () => {
    expect(TRIM(ctx, { result: '', type: 'string' }).result).toBe('')
    expect(TRIM(ctx, { result: ' foobar', type: 'string' }).result).toBe('foobar')
    expect(TRIM(ctx, { result: ' foo ', type: 'string' }).result).toBe('foo')
    expect(TRIM(ctx, { result: ' foo bar ', type: 'string' }).result).toBe('foo bar')
  })
})
