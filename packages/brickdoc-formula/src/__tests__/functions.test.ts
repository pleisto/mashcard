import { makeContext } from '../tests/testHelper'
import { BUILTIN_CLAUSES } from '../functions'

const testCases = BUILTIN_CLAUSES.flatMap(c =>
  c.testCases.map((t, index) => ({
    title: `${c.group}::${c.name} - [${index}]: ${t.input}`,
    args: c.args,
    reference: c.reference,
    t
  }))
)

describe('functions', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext({ pages: [] })
    jest.clearAllTimers()
  })

  it.each(testCases)('$title', async ({ t, title, reference, args }) => {
    const newCtx = { ...ctx, meta: ctx.buildMeta({ definition: '' }) }

    const result = await reference.apply(this, [
      newCtx,
      ...args.map((a, i) => {
        const input = t.input[i]
        if (input !== undefined) return { type: a.type, result: input }
        if (a.default) return a.default
        throw new Error(`No input for ${title} [${a.name} - ${i}]`)
      })
    ])
    if (Array.isArray(result.type)) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.type.includes(t.output.type)).toBeTruthy()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.result).toEqual(t.output.result)
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result).toEqual(t.output)
    }
  })
})
