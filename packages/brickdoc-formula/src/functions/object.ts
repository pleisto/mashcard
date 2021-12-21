import { ContextInterface, StringResult, RecordResult, BasicFunctionClause, AnyTypeResult } from '..'

export const T = (ctx: ContextInterface, obj: AnyTypeResult): AnyTypeResult => obj

export const TYPE = (ctx: ContextInterface, obj: AnyTypeResult): StringResult => ({ result: obj.type, type: 'string' })

export const WITH_TYPE = (ctx: ContextInterface, obj: AnyTypeResult): RecordResult => ({
  result: obj,
  type: 'Record'
})

export const toString = (ctx: ContextInterface, obj: AnyTypeResult): StringResult => {
  if (obj.type === 'Array') {
    return {
      result: `[${obj.result.map(item => toString(ctx, item).result).join(', ')}]`,
      type: 'string'
    }
  }

  return {
    result: JSON.stringify(obj.result),
    type: 'string'
  }
}

// TODO validate any type
export const CORE_OBJECT_CLAUSES: Array<BasicFunctionClause<any>> = [
  {
    name: 'T',
    async: false,
    pure: true,
    lazy: false,
    acceptError: true,
    effect: false,
    description: 'Returns current object',
    group: 'core',
    args: [
      {
        name: 'obj',
        type: 'any'
      }
    ],
    returns: 'any',
    testCases: [],
    examples: [
      { input: '=T(100)', output: { type: 'number', result: 100 } },
      { input: '=T("foo")', output: { type: 'string', result: 'foo' } }
    ],
    chain: true,
    reference: T
  },
  {
    name: 'TYPE',
    async: false,
    pure: true,
    lazy: false,
    acceptError: true,
    effect: false,
    description: 'Returns type of current object',
    group: 'core',
    args: [
      {
        name: 'obj',
        type: 'any'
      }
    ],
    returns: 'string',
    testCases: [],
    examples: [
      { input: '=TYPE(100)', output: { type: 'string', result: 'number' } },
      { input: '=TYPE("foo")', output: { type: 'string', result: 'string' } }
    ],
    chain: true,
    reference: TYPE
  },
  {
    name: 'toString',
    async: false,
    pure: true,
    lazy: false,
    acceptError: true,
    effect: false,
    description: 'Returns string representation of current object',
    group: 'core',
    args: [
      {
        name: 'obj',
        type: 'any'
      }
    ],
    returns: 'string',
    testCases: [],
    examples: [
      { input: '=toString(100)', output: { type: 'string', result: '100' } },
      { input: '=toString("foo")', output: { type: 'string', result: 'foo' } }
    ],
    chain: true,
    reference: toString
  },
  {
    name: 'WITH_TYPE',
    async: false,
    pure: true,
    lazy: false,
    acceptError: true,
    effect: false,
    description: 'Returns object with type',
    group: 'core',
    args: [
      {
        name: 'obj',
        type: 'any'
      }
    ],
    examples: [
      { input: '=WITH_TYPE(100)', output: { type: 'Object', result: {} } },
      { input: '=WITH_TYPE("foo")', output: { type: 'Object', result: {} } }
    ],
    returns: 'Object',
    testCases: [],
    chain: true,
    reference: WITH_TYPE
  }
]
