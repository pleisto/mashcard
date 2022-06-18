import { makeContext } from '../tests/testHelper'
import { BUILTIN_CLAUSES } from '../functions'
import { castData } from '../grammar'

const testCases = BUILTIN_CLAUSES.flatMap(c =>
  c.testCases.map((t, index) => ({
    title: `${c.group}::${c.name} - [${index}]: ${JSON.stringify(t.input)}`,
    args: c.args,
    reference: c.reference,
    t
  }))
)

describe('functions', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext({ pages: [] })
  })

  it.each(testCases)('$title', async ({ t, title, reference, args }) => {
    const newCtx = { ...ctx, meta: ctx.buildMeta({ definition: '' }) }

    const result = await reference.apply(this, [
      newCtx,
      ...args.map((a, i) => {
        const input = t.input[i]
        if (input !== undefined) return castData(input)
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
