import { AnyTypeResult, BooleanResult, BasicFunctionClause, FunctionContext } from '..'

export const IF = (
  ctx: FunctionContext,
  condition: BooleanResult,
  ifTrue: AnyTypeResult,
  ifFalse: AnyTypeResult
): AnyTypeResult => (condition.result ? ifTrue : ifFalse)

export const AND = (ctx: FunctionContext, ...conditions: BooleanResult[]): BooleanResult => ({
  type: 'boolean',
  result: conditions.map(c => c.result).reduce((acc, condition) => acc && condition, true)
})

export const OR = (ctx: FunctionContext, ...conditions: BooleanResult[]): BooleanResult => ({
  result: conditions.map(c => c.result).reduce((acc, condition) => acc || condition, false),
  type: 'boolean'
})

export const NOT = (ctx: FunctionContext, term: BooleanResult): BooleanResult => ({
  type: 'boolean',
  result: !term.result
})

// TODO: add any type validate
const IF_CLAUSE: BasicFunctionClause<any> = {
  name: 'IF',
  async: false,
  pure: true,
  lazy: false,
  acceptError: false,
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
  examples: [{ input: '=IF(true, 1, 2)', output: { type: 'number', result: 2 } }],
  returns: 'any',
  testCases: [],
  chain: false,
  reference: IF
}

const BOOLEAN_CLAUSES: Array<BasicFunctionClause<'boolean'>> = [
  {
    name: 'NOT',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    description: 'Returns the opposite of the argument.',
    group: 'core',
    args: [
      {
        name: 'term',
        type: 'boolean'
      }
    ],
    examples: [{ input: '=NOT(true)', output: { type: 'boolean', result: false } }],
    returns: 'boolean',
    testCases: [],
    chain: false,
    reference: NOT
  },
  {
    name: 'AND',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
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
    examples: [{ input: '=AND(TRUE(), FALSE())', output: { type: 'boolean', result: false } }],
    returns: 'boolean',
    testCases: [],
    chain: false,
    reference: AND
  },
  {
    name: 'OR',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=OR(FALSE(), TRUE(), FALSE())', output: { type: 'boolean', result: true } }],
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
    testCases: [],
    chain: false,
    reference: OR
  }
]

export const CORE_LOGIC_CLAUSES = [IF_CLAUSE, ...BOOLEAN_CLAUSES]
