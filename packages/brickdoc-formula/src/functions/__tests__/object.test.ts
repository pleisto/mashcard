import { FormulaContext } from '../../context'
import { T, TYPE } from '../object'

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
    input: '=24'
  }
}

describe('object', () => {
  it('T', () => {
    expect(T(ctx, { result: 1, type: 'number' }).result).toBe(1)
    expect(T(ctx, { result: 'Foo', type: 'string' }).result).toBe('Foo')
  })

  it('TYPE', () => {
    expect(TYPE(ctx, { result: 1, type: 'number' }).result).toBe('number')
  })
})
