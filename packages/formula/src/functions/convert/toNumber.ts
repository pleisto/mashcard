import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const convertToNumber = createFunctionClause({
  name: 'toNumber',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Convert to a number',
  group: 'core',
  returns: 'number',
  chain: true,
  args: [{ name: 'string', type: ['string', 'Cell'] }],
  examples: [
    { input: '=toNumber("123")', output: { type: 'number', result: 123 } },
    { input: '=toNumber("foo")', output: { type: 'Error', result: { message: 'Not a number', type: 'runtime' } } }
  ],
  testCases: [
    { input: ['123'], output: { type: 'number', result: 123 } },
    { input: ['foo'], output: { type: 'Error', result: { message: 'Not a number', type: 'runtime' } } }
  ],
  reference: (ctx, obj) => {
    const number = Number(obj.type === 'Cell' ? obj.result.getValue() : obj.result)

    if (isNaN(number)) {
      return { type: 'Error', result: { message: 'Not a number', type: 'runtime' } }
    }

    return { type: 'number', result: number }
  }
})
