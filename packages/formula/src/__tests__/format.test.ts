import { makeContext, splitDefinition$ } from '../tests/testHelper'
import { buildTestCases, trackTodo } from '../tests'
import { applyFormat } from '../grammar/format'

const [testCases] = buildTestCases(['format'])

describe('format', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(testCases.options)
  })

  trackTodo(it, testCases.formatTestCases)

  it.each(testCases.formatTestCases)('$jestTitle', async args => {
    const [definition, position] = splitDefinition$(args.definition$)
    const newCtx = { ...ctx, meta: ctx.buildMeta({ ...args, definition, position }) }

    const { minify, format } = applyFormat(newCtx)
    const [minifyDefinition, minifyPosition] = splitDefinition$(args.minifyResult$ ?? args.definition$)
    const [formatDefinition, formatPosition] = splitDefinition$(args.formatResult$ ?? args.definition$)

    expect(['minify', minify]).toEqual(['minify', { definition: minifyDefinition, position: minifyPosition }])
    expect(['format', format]).toEqual(['format', { definition: formatDefinition, position: formatPosition }])
  })
})
