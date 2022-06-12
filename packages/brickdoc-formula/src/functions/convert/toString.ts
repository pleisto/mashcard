import { AnyTypeResult, createFunctionClause, FunctionContext, StringResult } from '../../types'

const globalToString = (ctx: FunctionContext, obj: AnyTypeResult): StringResult => {
  if (obj.type === 'Array') {
    return {
      result: `[${obj.result.map(item => globalToString(ctx, item).result).join(', ')}]`,
      type: 'string'
    }
  }

  if (obj.type === 'Cell') {
    return { type: 'string', result: obj.result.value }
  }

  return {
    result: JSON.stringify(obj.result),
    type: 'string'
  }
}

export const convertToString = createFunctionClause({
  name: 'toString',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Converts to a string',
  group: 'core',
  chain: true,
  returns: 'string',
  args: [{ name: 'input', type: ['number', 'Array', 'Cell', 'boolean'] }],
  examples: [{ input: '=toString([])', output: { type: 'string', result: '[]' } }],
  testCases: [
    { input: [[]], output: { type: 'string', result: '[]' } },
    { input: [123], output: { type: 'string', result: '123' } }
  ],
  reference: globalToString
})
