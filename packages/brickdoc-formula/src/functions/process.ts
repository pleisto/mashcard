import { BaseFunctionClause, FunctionContext, NumberResult } from '../types'

const sleep = async (delay: number) => await new Promise(resolve => setTimeout(resolve, delay))

export const SLEEP = async (ctx: FunctionContext, number: NumberResult): Promise<NumberResult> => {
  await sleep(number.result)
  return number
}

export const CORE_PROCESS_CLAUSES: Array<BaseFunctionClause<'number'>> = [
  {
    name: 'SLEEP',
    async: true,
    pure: false,
    lazy: false,
    acceptError: false,
    effect: false,
    examples: [{ input: '=SLEEP(10)', output: { type: 'number', result: 10 } }],
    description: 'Sleep for a given number of milliseconds',
    group: 'core',
    args: [
      {
        type: 'number',
        name: 'number'
      }
    ],
    testCases: [],
    returns: 'number',
    chain: false,
    reference: SLEEP
  }
]
