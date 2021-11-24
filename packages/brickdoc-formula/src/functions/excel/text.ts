import { ContextInterface, FunctionClause } from '../..'

export const LEN = (ctx: ContextInterface, str: string): number => str.length

export const T = (ctx: ContextInterface, input: any): string => (typeof input === 'string' ? input : '')

export const TRIM = (ctx: ContextInterface, str: string): string => str.trim()

export const TEXT_CLAUSES: FunctionClause[] = [
  {
    name: 'LEN',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the length of the string.',
    group: 'excel',
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
    group: 'excel',
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
    group: 'excel',
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
