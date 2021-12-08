import { ContextInterface, BaseFunctionClause, NumberResult } from '..'

export const ABS = (ctx: ContextInterface, number: number): NumberResult => ({ result: Math.abs(number), type: 'number' })

export const INT = (ctx: ContextInterface, number: number): NumberResult => ({ result: Math.floor(number), type: 'number' })

export const LOG10 = (ctx: ContextInterface, number: number): NumberResult => ({ result: Math.log10(number), type: 'number' })

export const PI = (ctx: ContextInterface): NumberResult => ({ result: Math.PI, type: 'number' })

export const POWER = (ctx: ContextInterface, number: number, power: number): NumberResult => ({
  result: Math.pow(number, power),
  type: 'number'
})

export const RAND = (ctx: ContextInterface): NumberResult => ({ result: Math.random(), type: 'number' })

export const RANDBETWEEN = (ctx: ContextInterface, min: number, max: number): NumberResult => ({
  result: Math.random() * (max - min) + min,
  type: 'number'
})

export const SQRT = (ctx: ContextInterface, number: number): NumberResult => ({ result: Math.sqrt(number), type: 'number' })

export const SQRTPI = (ctx: ContextInterface, number: number): NumberResult => ({ result: Math.sqrt(number * Math.PI), type: 'number' })

export const TRUNC = (ctx: ContextInterface, number: number): NumberResult => ({ result: Math.trunc(number), type: 'number' })
export const LN = (ctx: ContextInterface, number: number): NumberResult => ({ result: Math.log(number), type: 'number' })

export const CORE_MATH_CLAUSES: Array<BaseFunctionClause<'number'>> = [
  {
    name: 'ABS',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the absolute value of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [
      {
        input: [-1],
        output: 1
      }
    ],
    chain: false,
    reference: ABS
  },
  {
    name: 'INT',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the integer part of a number.',
    group: 'excel',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [
      {
        input: [1.5],
        output: 1
      }
    ],
    chain: false,
    reference: INT
  },
  {
    name: 'LOG10',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the base-10 logarithm of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [
      {
        input: [100],
        output: 2
      }
    ],
    chain: false,
    reference: LOG10
  },
  {
    name: 'PI',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the value of pi.',
    group: 'core',
    args: [],
    returns: 'number',
    examples: [
      {
        input: [],
        output: Math.PI
      }
    ],
    chain: false,
    reference: PI
  },
  {
    name: 'POWER',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the value of a number raised to a power.',
    group: 'core',
    args: [
      { name: 'number', type: 'number' },
      { name: 'power', type: 'number' }
    ],
    returns: 'number',
    examples: [
      {
        input: [2, 3],
        output: 8
      }
    ],
    chain: false,
    reference: POWER
  },
  {
    name: 'RAND',
    async: false,
    pure: false,
    effect: false,
    description: 'Returns a random number between 0 and 1.',
    group: 'core',
    args: [],
    returns: 'number',
    examples: [],
    chain: false,
    reference: RAND
  },
  {
    name: 'RANDBETWEEN',
    async: false,
    pure: false,
    effect: false,
    description: 'Returns a random number between two numbers.',
    group: 'core',
    args: [
      { name: 'min', type: 'number' },
      { name: 'max', type: 'number' }
    ],
    returns: 'number',
    examples: [],
    chain: false,
    reference: RANDBETWEEN
  },
  {
    name: 'SQRT',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the square root of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [
      {
        input: [4],
        output: 2
      }
    ],
    chain: false,
    reference: SQRT
  },
  {
    name: 'SQRTPI',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the square root of a number multiplied by pi.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [
      {
        input: [4],
        output: 3.5449077018110318
      }
    ],
    chain: false,
    reference: SQRTPI
  },
  {
    name: 'TRUNC',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the integer part of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [
      {
        input: [1.5],
        output: 1
      }
    ],
    chain: false,
    reference: TRUNC
  },
  {
    name: 'LN',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the natural logarithm of a number.',
    group: 'core',
    args: [{ name: 'number', type: 'number' }],
    returns: 'number',
    examples: [
      {
        input: [100],
        output: 4.605170185988092
      }
    ],
    chain: false,
    reference: LN
  }
]
