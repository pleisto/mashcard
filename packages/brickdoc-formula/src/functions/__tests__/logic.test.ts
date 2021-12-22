import { FormulaContext } from '../../context'
import { IF, NOT, AND, OR } from '../logic'

const ctx = {
  ctx: new FormulaContext({}),
  interpretContext: {},
  meta: {
    namespaceId: '57622108-1337-4edd-833a-2557835bcfe0',
    variableId: '481b6dd1-e668-4477-9e47-cfe5cb1239d0',
    name: 'v',
    input: '=24'
  }
}

describe('logic', () => {
  it('IF', () => {
    expect(
      IF(ctx, { result: false, type: 'boolean' }, { result: 1, type: 'number' }, { result: 2, type: 'number' }).result
    ).toBe(2)
    expect(
      IF(ctx, { result: true, type: 'boolean' }, { result: 1, type: 'number' }, { result: 2, type: 'number' }).result
    ).toBe(1)
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
