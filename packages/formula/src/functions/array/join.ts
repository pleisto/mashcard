import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const arrayJoin = createFunctionClause({
  name: 'Join',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Joins an array of strings',
  group: 'core',
  args: [
    { name: 'array', type: 'Array' },
    { name: 'separator', type: 'string', default: { type: 'string', result: ',' } }
  ],
  examples: [{ input: '=Join([1,2,3])', output: { type: 'string', result: '1,2,3' } }],
  returns: 'string',
  testCases: [
    { input: [[], ';;'], output: { type: 'string', result: '' } },
    {
      input: [
        [
          { type: 'string', result: 'a' },
          { type: 'string', result: 'b' }
        ],
        ';;'
      ],
      output: { type: 'string', result: 'a;;b' }
    },
    {
      input: [
        [
          { type: 'string', result: 'a' },
          { type: 'number', result: 1 }
        ],
        ';;'
      ],
      output: { type: 'Error', result: 'Join expects an array of strings', meta: 'runtime' }
    }
  ],
  chain: true,
  reference: (ctx, { meta, result }, { result: separator }) => {
    if (!['string', 'number', 'void'].includes(meta)) {
      return { type: 'Error', result: 'Join expects an array of strings', meta: 'runtime' }
    }

    return { result: result.map(a => a.result).join(separator), type: 'string' }
  }
})
