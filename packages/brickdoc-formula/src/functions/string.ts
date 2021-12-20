import { ContextInterface, BasicFunctionClause, BooleanResult, StringResult } from '..'

export const START_WITH = (ctx: ContextInterface, string: StringResult, prefix: StringResult): BooleanResult => ({
  result: string.result.startsWith(prefix.result),
  type: 'boolean'
})

export const CORE_STRING_CLAUSES: Array<BasicFunctionClause<'boolean'>> = [
  {
    name: 'START_WITH',
    async: false,
    lazy: false,
    acceptError: false,
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
    examples: [
      { input: '=START_WITH("foo", "bar")', output: { type: 'boolean', result: false } },
      { input: '=START_WITH("foobar", "foo")', output: { type: 'boolean', result: true } }
    ],
    returns: 'boolean',
    testCases: [
      {
        input: [
          { type: 'string', result: 'foobar' },
          { type: 'string', result: 'foo' }
        ],
        output: true
      },
      {
        input: [
          { type: 'string', result: '' },
          { type: 'string', result: '' }
        ],
        output: true
      }
    ],
    chain: true,
    reference: START_WITH
  }
]
