import { createFunctionClause } from '../../types'

export const stringToQrcode = createFunctionClause({
  name: 'toQrcode',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Converts a string to a qrcode',
  group: 'core',
  args: [{ name: 'string', type: 'string' }],
  examples: [{ input: '=toQrcode("123")', output: { type: 'string', result: '123' } }],
  returns: 'string',
  testCases: [],
  chain: true,
  reference: (ctx, { result }) => {
    return { type: 'string', result, view: { type: 'qrcode', attrs: {} } }
  }
})
