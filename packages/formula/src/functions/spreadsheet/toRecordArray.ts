import { createFunctionClause, RecordResult } from '../../type'

/**
 * @source
 */
export const spreadsheetToRecordArray = createFunctionClause({
  name: 'toRecordArray',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=123', output: { type: 'Array', result: [], meta: 'void' } }],
  description: 'Converts the spreadsheet to a record.',
  group: 'core',
  args: [{ name: 'spreadsheet', type: 'Spreadsheet' }],
  returns: 'Array',
  testCases: [],
  chain: true,
  reference: (ctx, { result: spreadsheet }) => {
    return {
      type: 'Array',
      meta: 'Record',
      result: spreadsheet.toRecord().map<RecordResult>(row => ({ type: 'Record', meta: 'string', result: row }))
    }
  }
})
