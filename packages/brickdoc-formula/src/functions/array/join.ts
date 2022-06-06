import { createFunctionClause } from '../../types'

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
  testCases: [],
  chain: true,
  reference: (ctx, { subType, result }, { result: separator }) => {
    if (!['string', 'number', 'void'].includes(subType)) {
      return { type: 'Error', result: 'Join expects an array of strings', errorKind: 'runtime' }
    }

    return { result: result.map(a => a.result).join(separator), type: 'string' }
  }
})
