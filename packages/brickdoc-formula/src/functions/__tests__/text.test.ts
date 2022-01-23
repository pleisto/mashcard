import { FormulaContext } from '../../context'
import { FormulaSourceType } from '../../types'
import { LEN, TRIM } from '../text'

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
    type: 'normal' as FormulaSourceType
  }
}

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
