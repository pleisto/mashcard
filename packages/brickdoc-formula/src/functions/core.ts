import { ContextInterface, BasicFunctionClause, ErrorResult, ReferenceResult, FunctionResult } from '..'

export const Set = (ctx: ContextInterface, { result: name }: ReferenceResult): FunctionResult | ErrorResult => {
  // TODO check reference type
  return { result: [], type: 'Function' }
}

export const CORE_CORE_CLAUSES: Array<BasicFunctionClause<any>> = [
  {
    name: 'Set',
    async: false,
    pure: false,
    lazy: true,
    acceptError: false,
    effect: false,
    examples: [{ input: '=Set(A, A+1)', output: null }],
    description: 'Set variable',
    group: 'core',
    args: [
      {
        name: 'name',
        type: 'string'
      }
    ],
    testCases: [],
    returns: 'Function',
    chain: false,
    reference: Set
  }
]
