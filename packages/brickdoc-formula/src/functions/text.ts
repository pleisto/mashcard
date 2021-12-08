import { ContextInterface, BaseFunctionClause, NumberResult, StringResult } from '..'

export const LEN = (ctx: ContextInterface, str: string): NumberResult => ({ result: str.length, type: 'number' })

export const T = (ctx: ContextInterface, input: any): StringResult => ({ result: typeof input === 'string' ? input : '', type: 'string' })

export const TRIM = (ctx: ContextInterface, str: string): StringResult => ({ result: str.trim(), type: 'string' })

export const CORE_TEXT_CLAUSES: Array<BaseFunctionClause<any>> = [
  {
    name: 'LEN',
    async: false,
    pure: true,
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
    examples: [
      {
        input: ['abc'],
        output: 3
      }
    ],
    chain: false,
    reference: LEN
  },
  {
    name: 'T',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the input as a string.',
    group: 'core',
    args: [
      {
        name: 'input',
        type: 'any'
      }
    ],
    returns: 'string',
    examples: [
      {
        input: ['abc'],
        output: 'abc'
      },
      {
        input: [123],
        output: ''
      }
    ],
    chain: false,
    reference: T
  },
  {
    name: 'TRIM',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the string with leading and trailing whitespace removed.',
    group: 'core',
    args: [
      {
        name: 'str',
        type: 'string'
      }
    ],
    returns: 'string',
    examples: [
      {
        input: [' abc '],
        output: 'abc'
      }
    ],
    chain: false,
    reference: TRIM
  }
]
