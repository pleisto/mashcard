import { ContextInterface, FunctionClause } from '../..'

export const ABS = (ctx: ContextInterface, number: number): number => Math.abs(number)

export const INT = (ctx: ContextInterface, number: number): number => Math.floor(number)

export const LOG10 = (ctx: ContextInterface, number: number): number => Math.log10(number)

export const PI = (ctx: ContextInterface): number => Math.PI

export const POWER = (ctx: ContextInterface, number: number, power: number): number => Math.pow(number, power)

export const RAND = (ctx: ContextInterface): number => Math.random()

export const RANDBETWEEN = (ctx: ContextInterface, min: number, max: number): number => Math.random() * (max - min) + min

export const SQRT = (ctx: ContextInterface, number: number): number => Math.sqrt(number)

export const SQRTPI = (ctx: ContextInterface, number: number): number => Math.sqrt(number * Math.PI)

export const TRUNC = (ctx: ContextInterface, number: number): number => Math.trunc(number)

export const LN = (ctx: ContextInterface, number: number): number => Math.log(number)

export const MATH_CLAUSES: FunctionClause[] = [
  {
    name: 'ABS',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the absolute value of a number.',
    group: 'excel',
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
    group: 'excel',
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
    group: 'excel',
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
    group: 'excel',
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
    group: 'excel',
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
    group: 'excel',
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
    group: 'excel',
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
    group: 'excel',
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
    reference: TRUNC
  },
  {
    name: 'LN',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the natural logarithm of a number.',
    group: 'excel',
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
