import { ContextInterface, FunctionClause } from '../..'

export const START_WITH = (ctx: ContextInterface, string: string, prefix: string): boolean => string.startsWith(prefix)

export const STRING_CLAUSES: FunctionClause[] = [
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
