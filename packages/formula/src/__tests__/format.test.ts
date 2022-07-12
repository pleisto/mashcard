import { makeContext, splitDefinition$ } from '../tests/testHelper'
import { buildTestCases, TestCaseInput, trackTodo } from '../tests'
import { applyFormat } from '../grammar/format'

const [input, testCases] = buildTestCases<TestCaseInput['formatTestCases'][0]>(['format'])

const SKIP_FLAG = '<SKIP>'

describe('format', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(input.options)
  })

  trackTodo(it, testCases)

  it.each(testCases)('$jestTitle', async args => {
    const [definition, position] = splitDefinition$(args.definition$)
    const newCtx = { ...ctx, meta: ctx.buildMeta({ ...args, definition, position }) }

    const { minify, format, valid } = applyFormat(newCtx)

    if (args.minifyResult$ !== SKIP_FLAG) {
      const [minifyDefinition, minifyPosition] = splitDefinition$(args.minifyResult$ ?? args.definition$)
      // eslint-disable-next-line jest/no-conditional-expect
      expect(['minify', valid, minify]).toEqual([
        'minify',
        valid,
        { definition: minifyDefinition, position: minifyPosition }
      ])
    }

    if (args.formatResult$ !== SKIP_FLAG) {
      const [formatDefinition, formatPosition] = splitDefinition$(args.formatResult$ ?? args.definition$)
      // eslint-disable-next-line jest/no-conditional-expect
      expect(['format', valid, format]).toEqual([
        'format',
        valid,
        { definition: formatDefinition, position: formatPosition }
      ])
    }
  })
})
