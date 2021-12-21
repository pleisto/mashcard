import { ContextInterface, BasicFunctionClause, ErrorResult, ButtonResult, StringResult, FunctionResult } from '..'
import { ButtonClass } from '../controls/button'

export const Button = (
  ctx: ContextInterface,
  { result: name }: StringResult,
  fn: FunctionResult
): ButtonResult | ErrorResult => {
  const button = new ButtonClass(ctx, { name, fn })
  return { result: button, type: 'Button' }
}

export const CORE_CONTROL_CLAUSES: Array<BasicFunctionClause<any>> = [
  {
    name: 'Button',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=Button("name")', output: null }],
    description: 'Build button',
    group: 'core',
    args: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'onClick',
        type: 'Function'
      }
    ],
    testCases: [],
    returns: 'Button',
    chain: false,
    reference: Button
  }
]
