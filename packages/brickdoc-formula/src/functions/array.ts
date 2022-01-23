import { ArrayResult, BasicFunctionClause, CstResult, ErrorResult, FunctionContext, StringResult } from '../types'
import { interpret } from '../grammar/core'
import { extractSubType } from '../grammar/util'

export const Join = (
  ctx: FunctionContext,
  { subType, result }: ArrayResult,
  { result: separator }: StringResult
): StringResult | ErrorResult => {
  if (!['string', 'number', 'void'].includes(subType)) {
    return { type: 'Error', result: 'Join expects an array of strings', errorKind: 'runtime' }
  }

  return { result: result.map(a => a.result).join(separator), type: 'string' }
}

export const Map = async (
  ctx: FunctionContext,
  { result: array }: ArrayResult,
  { result: cst }: CstResult
): Promise<ArrayResult | ErrorResult> => {
  const interpretContexts = array.map(a => ({ ctx: ctx.interpretContext.ctx, arguments: [a] }))

  const newResult = await Promise.all(
    interpretContexts.map(async interpretContext => {
      const { variableValue } = await interpret({
        parseResult: { cst, kind: 'expression' },
        ctx: { ...ctx, interpretContext }
      })
      return variableValue.result
    })
  )

  // console.log({ interpretContexts, newResult })

  return { type: 'Array', result: newResult, subType: extractSubType(newResult) }
}

export const CORE_ARRAY_CLAUSES: Array<BasicFunctionClause<'string' | 'Array'>> = [
  {
    name: 'Join',
    async: false,
    lazy: false,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Joins an array of strings',
    group: 'core',
    args: [
      {
        name: 'array',
        type: 'Array'
      },
      {
        name: 'separator',
        type: 'string',
        default: { type: 'string', result: ',' }
      }
    ],
    examples: [{ input: '=Join([1,2,3])', output: { type: 'string', result: '1,2,3' } }],
    returns: 'string',
    testCases: [],
    chain: true,
    reference: Join
  },
  {
    name: 'Map',
    async: false,
    lazy: true,
    acceptError: false,
    pure: true,
    effect: false,
    description: 'Maps an array of values',
    group: 'core',
    args: [
      {
        name: 'array',
        type: 'Array'
      },
      {
        name: 'value',
        type: 'Cst'
      }
    ],
    examples: [
      {
        input: '=Map([1,2], "hello")',
        output: {
          type: 'Array',
          subType: 'string',
          result: [
            { type: 'string', result: 'hello' },
            { type: 'string', result: 'hello' }
          ]
        }
      }
    ],
    returns: 'Array',
    testCases: [],
    chain: true,
    reference: Map
  }
]
