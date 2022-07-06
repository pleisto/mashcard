import { AnyTypeResult, createFunctionClause, FunctionContext, StringResult } from '../../type'

const globalToString = (ctx: FunctionContext, obj: AnyTypeResult): StringResult => {
  if (obj.type === 'Array') {
    return {
      result: `[${obj.result.map(item => globalToString(ctx, item).result).join(', ')}]`,
      type: 'string'
    }
  }

  if (obj.type === 'Cell') {
    return { type: 'string', result: obj.result.getValue() }
  }

  return {
    result: JSON.stringify(obj.result),
    type: 'string'
  }
}

/**
 * @source
 */
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
  args: [{ name: 'input', type: ['number', 'Array', 'Cell', 'boolean', 'null'] }],
  examples: [{ input: '=toString([])', output: { type: 'string', result: '[]' } }],
  testCases: [
    { input: [[]], output: { type: 'string', result: '[]' } },
    {
      input: [
        [
          { type: 'number', result: 1 },
          { type: 'string', result: 'foo' }
        ]
      ],
      output: { type: 'string', result: '[1, "foo"]' }
    },
    { input: [true], output: { type: 'string', result: 'true' } },
    { input: [null], output: { type: 'string', result: 'null' } },
    { input: [123], output: { type: 'string', result: '123' } }
  ],
  reference: globalToString
})
