import { createFunctionClause } from '../../types'

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
    { input: '=toNumber("foo")', output: { type: 'Error', result: 'Not a number', errorKind: 'runtime' } }
  ],
  testCases: [
    { input: ['123'], output: { type: 'number', result: 123 } },
    { input: ['foo'], output: { type: 'Error', result: 'Not a number', errorKind: 'runtime' } }
  ],
  reference: (ctx, { result, type }) => {
    const number = Number(type === 'Cell' ? result.value : result)

    if (isNaN(number)) {
      return { type: 'Error', result: 'Not a number', errorKind: 'runtime' }
    }

    return { type: 'number', result: number }
  }
})
