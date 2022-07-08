import { createFunctionClause } from '../../type'

/**
 * @source
 */
export const spreadsheetRow = createFunctionClause({
  name: 'Row',
  async: false,
  pure: true,
  persist: false,
  lazy: false,
  acceptError: false,
  effect: false,
  description: 'Returns line number.',
  group: 'core',
  returns: 'number',
  chain: true,
  examples: [{ input: '=123', output: null }],
  args: [{ name: 'input', type: ['Cell', 'Row'] }],
  testCases: [],
  reference: (ctx, { result }) => {
    return { type: 'number', result: result.rowIndex + 1 }
  }
})
