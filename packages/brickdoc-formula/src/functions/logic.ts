import { ContextInterface, BaseFunctionClause, AnyResult, BooleanResult } from '..'

export const IF = (ctx: ContextInterface, condition: boolean, ifTrue: any, ifFalse: any): AnyResult => ({
  result: condition ? ifTrue : ifFalse,
  type: 'any'
})

export const TRUE = (ctx: ContextInterface): BooleanResult => ({ type: 'boolean', result: true })

export const FALSE = (ctx: ContextInterface): BooleanResult => ({ type: 'boolean', result: false })

export const AND = (ctx: ContextInterface, ...conditions: boolean[]): BooleanResult => ({
  type: 'boolean',
  result: conditions.reduce((acc, condition) => acc && condition, true)
})

export const OR = (ctx: ContextInterface, ...conditions: boolean[]): BooleanResult => ({
  result: conditions.reduce((acc, condition) => acc || condition, false),
  type: 'boolean'
})

export const NOT = (ctx: ContextInterface, term: boolean): BooleanResult => ({ type: 'boolean', result: !term })

export const CORE_LOGIC_CLAUSES: Array<BaseFunctionClause<any>> = [
  {
    name: 'IF',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the first argument if the condition is true, otherwise the second argument.',
    group: 'core',
    args: [
      {
        name: 'condition',
        type: 'boolean'
      },
      {
        name: 'ifTrue',
        type: 'any'
      },
      {
        name: 'ifFalse',
        type: 'any'
      }
    ],
    returns: 'any',
    examples: [{ input: [true, 'yes', 'no'], output: 'yes' }],
    chain: false,
    reference: IF
  },
  {
    name: 'TRUE',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns true.',
    group: 'core',
    args: [],
    returns: 'boolean',
    examples: [{ input: [], output: true }],
    chain: false,
    reference: TRUE
  },
  {
    name: 'FALSE',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns false.',
    group: 'core',
    args: [],
    returns: 'boolean',
    examples: [{ input: [], output: false }],
    chain: false,
    reference: FALSE
  },
  {
    name: 'NOT',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns the opposite of the argument.',
    group: 'core',
    args: [
      {
        name: 'term',
        type: 'boolean'
      }
    ],
    returns: 'boolean',
    examples: [{ input: [true], output: false }],
    chain: false,
    reference: NOT
  },
  {
    name: 'AND',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns true if all the arguments are true.',
    group: 'core',
    args: [
      {
        name: 'conditions',
        type: 'boolean',
        spread: true
      }
    ],
    returns: 'boolean',
    examples: [{ input: [true, true, true], output: true }],
    chain: false,
    reference: AND
  },
  {
    name: 'OR',
    async: false,
    pure: true,
    effect: false,
    description: 'Returns true if any of the arguments are true.',
    group: 'core',
    args: [
      {
        name: 'conditions',
        type: 'boolean',
        spread: true
      }
    ],
    returns: 'boolean',
    examples: [{ input: [true, false, true], output: true }],
    chain: false,
    reference: OR
  }
]
