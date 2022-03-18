import { FunctionContext, BaseFunctionClause, BooleanResult, StringResult, ArrayResult } from '../types'

export const START_WITH = (ctx: FunctionContext, string: StringResult, prefix: StringResult): BooleanResult => ({
  result: string.result.startsWith(prefix.result),
  type: 'boolean'
})

export const Split = (ctx: FunctionContext, string: StringResult, separator: StringResult): ArrayResult => ({
  result: string.result.split(separator.result).map(s => ({ result: s, type: 'string' })),
  subType: 'string',
  type: 'Array'
})

export const CORE_STRING_CLAUSES: Array<BaseFunctionClause<'boolean' | 'Array'>> = [
  {
    name: 'START_WITH',
    async: false,
    lazy: false,
    persist: true,
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
  },
  {
    name: 'Split',
    async: false,
    lazy: false,
    acceptError: false,
    pure: true,
    persist: true,
    effect: false,
    description: 'Returns an array of strings that result from splitting the string at the given separator.',
    group: 'core',
    args: [
      {
        name: 'string',
        type: 'string'
      },
      {
        name: 'separator',
        type: 'string',
        default: { type: 'string', result: '' }
      }
    ],
    examples: [
      {
        input: '=Split("foo", ",")',
        output: { type: 'Array', subType: 'string', result: [{ type: 'string', result: 'foo' }] }
      }
    ],
    returns: 'Array',
    testCases: [],
    chain: true,
    reference: Split
  }
]
