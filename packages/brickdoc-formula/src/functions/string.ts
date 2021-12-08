import { ContextInterface, BaseFunctionClause, BooleanResult } from '..'

export const START_WITH = (ctx: ContextInterface, string: string, prefix: string): BooleanResult => ({
  result: string.startsWith(prefix),
  type: 'boolean'
})

export const CORE_STRING_CLAUSES: Array<BaseFunctionClause<'boolean'>> = [
  {
    name: 'START_WITH',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns true if the sequence of elements of searchString converted to a String',
    group: 'core',
    args: [
      {
        name: 'string',
        type: 'string'
      },
      {
        name: 'prefix',
        type: 'string'
      }
    ],
    returns: 'boolean',
    examples: [
      { input: ['foobar', 'foo'], output: true },
      { input: ['', ''], output: true }
    ],
    chain: true,
    reference: START_WITH
  }
]
