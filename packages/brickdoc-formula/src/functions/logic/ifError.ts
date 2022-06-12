import { createFunctionClause, FORMULA_USED_TYPES } from '../../types'

export const logicIfError = createFunctionClause({
  name: 'IFERROR',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: true,
  effect: false,
  description: 'Returns the first argument if it is not an error, otherwise returns the second argument.',
  group: 'core',
  chain: true,
  examples: [
    { input: '=IFERROR(1, 2)', output: { type: 'number', result: 2 } },
    { input: '=IFERROR(ERROR("foo bar"), "123")', output: { type: 'Error', result: 'foo bar', errorKind: 'runtime' } }
  ],
  args: [
    { name: 'expr1', type: [...FORMULA_USED_TYPES] },
    { name: 'expr2', type: [...FORMULA_USED_TYPES] }
  ],
  testCases: [],
  returns: FORMULA_USED_TYPES,
  reference: (ctx, expr1, expr2) => (expr1.type === 'Error' ? expr2 : expr1)
})
