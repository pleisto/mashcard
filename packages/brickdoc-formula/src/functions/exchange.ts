import axios from 'axios'
import { castData } from '../grammar'
import { BaseFunctionClause, ErrorResult, FunctionContext, RecordResult, StringResult } from '../types'

export const EXCHANGE = async (
  ctx: FunctionContext,
  { result: code }: StringResult
): Promise<RecordResult | ErrorResult> => {
  if (!code) return { type: 'Error', result: 'CODE is blank', errorKind: 'runtime' }
  // TODO config secret
  const { data } = await axios.get(`https://v6.exchangerate-api.com/v6/3648761394fd50008e3c3e31/latest/${code}`)
  return castData(data.conversion_rates) as RecordResult
}

export const CORE_EXCHANGE_CLAUSES: Array<BaseFunctionClause<'Record'>> = [
  {
    name: 'EXCHANGE',
    async: true,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=EXCHANGE(10)', output: { type: 'Record', subType: 'any', result: {} } }],
    description: 'EXCHANGE',
    group: 'core',
    args: [
      {
        type: 'string',
        name: 'url'
      }
    ],
    testCases: [],
    returns: 'Record',
    chain: false,
    reference: EXCHANGE
  }
]
