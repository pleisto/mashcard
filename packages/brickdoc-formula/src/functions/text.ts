import { ContextInterface, BasicFunctionClause, NumberResult, StringResult } from '..'

export const LEN = (ctx: ContextInterface, str: StringResult): NumberResult => ({
  result: str.result.length,
  type: 'number'
})

export const TRIM = (ctx: ContextInterface, str: StringResult): StringResult => ({
  result: str.result.trim(),
  type: 'string'
})

export const CORE_TEXT_CLAUSES: Array<BasicFunctionClause<any>> = [
  {
    name: 'LEN',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the length of the string.',
    group: 'core',
    args: [
      {
        name: 'str',
        type: 'string'
      }
    ],
    returns: 'number',
    testCases: [
      {
        input: [{ type: 'string', result: 'abc' }],
        output: 3
      }
    ],
    examples: [{ input: '=LEN("foo")', output: { type: 'number', result: 3 } }],
    chain: false,
    reference: LEN
  },
  {
    name: 'TRIM',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the string with leading and trailing whitespace removed.',
    group: 'core',
    examples: [{ input: '=TRIM("  foo  ")', output: { type: 'string', result: 'foo' } }],
    args: [
      {
        name: 'str',
        type: 'string'
      }
    ],
    returns: 'string',
    testCases: [
      {
        input: [{ type: 'string', result: ' abc ' }],
        output: 'abc'
      }
    ],
    chain: false,
    reference: TRIM
  }
]
