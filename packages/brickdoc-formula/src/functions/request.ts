import axios from 'axios'
import { BaseFunctionClause, ErrorResult, FunctionContext, RecordResult, StringResult } from '../types'
import { castData } from '../grammar'

export const REQUEST_GET = async (
  ctx: FunctionContext,
  { result: url }: StringResult
): Promise<RecordResult | ErrorResult> => {
  if (!url) return { type: 'Error', result: 'URL is blank', errorKind: 'runtime' }
  const response = await axios.get(url)
  return castData(response) as RecordResult
}

export const CORE_REQUEST_CLAUSES: Array<BaseFunctionClause<'Record'>> = [
  {
    name: 'REQUEST_GET',
    async: true,
    pure: false,
    lazy: false,
    persist: false,
    acceptError: false,
    effect: true,
    examples: [{ input: '=REQUEST_GET(10)', output: { type: 'Record', subType: 'any', result: {} } }],
    description: 'request get',
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
    reference: REQUEST_GET
  }
]
