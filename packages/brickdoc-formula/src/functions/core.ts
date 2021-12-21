import { ContextInterface, BasicFunctionClause, ErrorResult, ReferenceResult, FunctionResult, CstResult } from '..'

export const Set = (ctx: ContextInterface, ref: ReferenceResult, cst: CstResult): FunctionResult | ErrorResult => {
  // TODO check ref as constant
  return { type: 'Function', result: { name: 'Set', args: [ref, cst] } }
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
        type: 'Reference'
      },
      {
        name: 'body',
        type: 'Cst'
      }
    ],
    testCases: [],
    returns: 'Function',
    chain: false,
    reference: Set
  }
]
