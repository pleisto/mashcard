import { ContextInterface, BasicFunctionClause, NumberResult } from '..'

export const ABS = (ctx: ContextInterface, number: NumberResult): NumberResult => ({
  result: Math.abs(number.result),
  type: 'number'
})

export const INT = (ctx: ContextInterface, number: NumberResult): NumberResult => ({
  result: Math.floor(number.result),
  type: 'number'
})

export const LOG10 = (ctx: ContextInterface, number: NumberResult): NumberResult => ({
  result: Math.log10(number.result),
  type: 'number'
})

export const PI = (ctx: ContextInterface): NumberResult => ({ result: Math.PI, type: 'number' })

export const POWER = (ctx: ContextInterface, number: NumberResult, power: NumberResult): NumberResult => ({
  result: Math.pow(number.result, power.result),
  type: 'number'
})

export const RAND = (ctx: ContextInterface): NumberResult => ({ result: Math.random(), type: 'number' })

export const RANDBETWEEN = (ctx: ContextInterface, min: NumberResult, max: NumberResult): NumberResult => ({
  result: Math.random() * (max.result - min.result) + min.result,
  type: 'number'
})

export const SQRT = (ctx: ContextInterface, number: NumberResult): NumberResult => ({
  result: Math.sqrt(number.result),
  type: 'number'
})

export const SQRTPI = (ctx: ContextInterface, number: NumberResult): NumberResult => ({
  result: Math.sqrt(number.result * Math.PI),
  type: 'number'
})

export const TRUNC = (ctx: ContextInterface, number: NumberResult): NumberResult => ({
  result: Math.trunc(number.result),
  type: 'number'
})
export const LN = (ctx: ContextInterface, number: NumberResult): NumberResult => ({
  result: Math.log(number.result),
  type: 'number'
})

export const ROUND = (ctx: ContextInterface, number: NumberResult): NumberResult => ({
  result: Math.round(number.result),
  type: 'number'
})

export const CORE_MATH_CLAUSES: Array<BasicFunctionClause<'number'>> = [
  {
    name: 'ABS',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the absolute value of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    testCases: [
      {
        input: [-1],
        output: 1
      }
    ],
    examples: [{ input: '=ABS(-1)', output: { type: 'number', result: 1 } }],
    chain: false,
    reference: ABS
  },
  {
    name: 'INT',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the integer part of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    testCases: [
      {
        input: [1.5],
        output: 1
      }
    ],
    examples: [{ input: '=INT(-1.5)', output: { type: 'number', result: -1 } }],
    chain: false,
    reference: INT
  },
  {
    name: 'LOG10',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the base-10 logarithm of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    testCases: [
      {
        input: [100],
        output: 2
      }
    ],
    examples: [{ input: '=LOG10(100)', output: { type: 'number', result: 2 } }],
    chain: false,
    reference: LOG10
  },
  {
    name: 'PI',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the value of pi.',
    group: 'core',
    args: [],
    returns: 'number',
    testCases: [
      {
        input: [],
        output: Math.PI
      }
    ],
    examples: [{ input: '=PI()', output: { type: 'number', result: Math.PI } }],
    chain: false,
    reference: PI
  },
  {
    name: 'POWER',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the value of a number raised to a power.',
    group: 'core',
    args: [
      { name: 'number', type: 'number' },
      { name: 'power', type: 'number' }
    ],
    returns: 'number',
    testCases: [
      {
        input: [2, 3],
        output: 8
      }
    ],
    examples: [{ input: '=POWER(2,3)', output: { type: 'number', result: 8 } }],
    chain: false,
    reference: POWER
  },
  {
    name: 'RAND',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns a random number between 0 and 1.',
    group: 'core',
    args: [],
    examples: [{ input: '=RAND()', output: { type: 'number', result: 0.513 } }],
    returns: 'number',
    testCases: [],
    chain: false,
    reference: RAND
  },
  {
    name: 'RANDBETWEEN',
    async: false,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns a random number between two numbers.',
    group: 'core',
    args: [
      { name: 'min', type: 'number' },
      { name: 'max', type: 'number' }
    ],
    examples: [{ input: '=RANDBETWEEN(1, 10)', output: { type: 'number', result: 5.13 } }],
    returns: 'number',
    testCases: [],
    chain: false,
    reference: RANDBETWEEN
  },
  {
    name: 'SQRT',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the square root of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [{ input: '=SQRT(4)', output: { type: 'number', result: 2 } }],
    testCases: [],
    chain: false,
    reference: SQRT
  },
  {
    name: 'SQRTPI',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the square root of a number multiplied by pi.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [{ input: '=SQRTPI(4)', output: { type: 'number', result: 3.5449077018110318 } }],
    testCases: [],
    chain: false,
    reference: SQRTPI
  },
  {
    name: 'TRUNC',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the integer part of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [{ input: '=TRUNC(1.5)', output: { type: 'number', result: 1 } }],
    testCases: [],
    chain: false,
    reference: TRUNC
  },
  {
    name: 'LN',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the natural logarithm of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [{ input: '=LN(100)', output: { type: 'number', result: 4.605170185988092 } }],
    testCases: [],
    chain: false,
    reference: LN
  },
  {
    name: 'ROUND',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the number rounded to the specified number of decimal places.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [{ input: '=ROUND(1.5)', output: { type: 'number', result: 2 } }],
    testCases: [],
    chain: false,
    reference: ROUND
  }
]
