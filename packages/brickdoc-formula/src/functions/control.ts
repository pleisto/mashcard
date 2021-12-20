import { ContextInterface, BasicFunctionClause, ErrorResult, ButtonResult, StringResult } from '..'

export const Button = (ctx: ContextInterface, { result: name }: StringResult): ButtonResult | ErrorResult => {
  const button = {
    name,
    disabled: false,
    onClick: () => {
      console.log(`Button ${name} clicked`)
    }
  }
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
      }
    ],
    testCases: [],
    returns: 'Button',
    chain: false,
    reference: Button
  }
]
