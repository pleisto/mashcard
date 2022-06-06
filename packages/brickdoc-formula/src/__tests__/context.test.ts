import { makeContext } from '../tests/testHelper'

describe('context', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext({ pages: [] })
    jest.clearAllTimers()
  })

  it('invoke', async () => {
    const result = await ctx.formulaContext.invoke(
      'ABS',
      { ...ctx, meta: ctx.buildMeta({ definition: '' }) },
      { type: 'number', result: -1 }
    )
    expect(result).toEqual({ type: 'number', result: 1 })

    const result2 = await ctx.formulaContext.invoke(
      'core::ABS',
      { ...ctx, meta: ctx.buildMeta({ definition: '' }) },
      { type: 'number', result: -1 }
    )
    expect(result2).toEqual({
      errorKind: 'fatal',
      result: 'Function core::ABS not found',
      type: 'Error'
    })
  })
})
