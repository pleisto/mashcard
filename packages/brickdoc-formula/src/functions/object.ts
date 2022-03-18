import { FunctionContext, StringResult, BaseFunctionClause, AnyTypeResult } from '../types'

export const T = (ctx: FunctionContext, obj: AnyTypeResult): AnyTypeResult => obj

export const TYPE = (ctx: FunctionContext, obj: AnyTypeResult): StringResult => ({ result: obj.type, type: 'string' })

export const toString = (ctx: FunctionContext, obj: AnyTypeResult): StringResult => {
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

export const CORE_OBJECT_CLAUSES: Array<BaseFunctionClause<any>> = [
  {
    name: 'T',
    async: false,
    pure: true,
    lazy: false,
    acceptError: true,
    effect: false,
    persist: true,
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
    persist: true,
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
    persist: true,
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
  }
]
