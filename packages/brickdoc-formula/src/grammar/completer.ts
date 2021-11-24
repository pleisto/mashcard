import { Context, FunctionClause } from '..'

export interface CompleteInput {
  readonly input: string
  readonly functionClauses: FunctionClause[]
  readonly context: Context
}

export interface CompleteResult {
  readonly type: 'function'
  readonly title: string
  readonly description: string
  readonly text: string
  readonly index: number
}

// TODO: https://github.com/Chevrotain/chevrotain/blob/master/examples/parser/content_assist/content_assist_complex.js
export const complete = ({ input }: CompleteInput): CompleteResult[] => {
  return [
    {
      type: 'function',
      title: 'PI',
      description: 'Returns the value of pi.',
      text: 'PI()',
      index: 4
    },
    {
      type: 'function',
      title: 'POWER',
      description: 'Returns the value of a number raised to a power.',
      text: 'POWER(number, power)',
      index: 7
    }
  ]
}
