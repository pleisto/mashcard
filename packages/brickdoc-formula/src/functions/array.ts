import { ArrayResult, BasicFunctionClause, ErrorResult, FunctionContext, StringResult } from '..'

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

export const CORE_ARRAY_CLAUSES: Array<BasicFunctionClause<'string'>> = [
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
  }
]
