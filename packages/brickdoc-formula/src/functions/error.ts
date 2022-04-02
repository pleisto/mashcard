import { AnyTypeResult, BaseFunctionClause, FunctionContext, ErrorResult, StringResult } from '../types'

export const ERROR = (ctx: FunctionContext, reason: StringResult): ErrorResult => ({
  result: reason.result,
  type: 'Error',
  errorKind: 'custom'
})

export const IFERROR = (ctx: FunctionContext, expr1: AnyTypeResult, expr2: AnyTypeResult): AnyTypeResult => {
  if (expr1.type === 'Error') {
    return expr2
  } else {
    return expr1
  }
}

const ERROR_CLAUSE: BaseFunctionClause<'Error'> = {
  name: 'ERROR',
  async: false,
  pure: true,
  persist: false,
  lazy: false,
  acceptError: false,
  effect: false,
  examples: [{ input: '=ERROR("foo bar")', output: { type: 'Error', result: 'foo bar', errorKind: 'custom' } }],
  description: 'Returns an error with the given message.',
  group: 'core',
  args: [{ name: 'reason', type: 'string' }],
  testCases: [],
  returns: 'Error',
  chain: true,
  reference: ERROR
}

const IFERROR_CLAUSE: BaseFunctionClause<any> = {
  name: 'IFERROR',
  async: false,
  pure: true,
  lazy: false,
  persist: false,
  acceptError: true,
  effect: false,
  examples: [
    { input: '=IFERROR(1, "foo bar")', output: { type: 'number', result: 1 } },
    { input: '=IFERROR(ERROR("foo bar"), 123)', output: { type: 'number', result: 123 } }
  ],
  description: 'Returns the first argument if it is not an error, otherwise returns the second argument.',
  group: 'core',
  args: [
    { name: 'expr1', type: 'any' },
    { name: 'expr2', type: 'any' }
  ],
  testCases: [],
  returns: 'any',
  chain: true,
  reference: IFERROR
}

export const CORE_ERROR_CLAUSES: Array<BaseFunctionClause<'Error' | any>> = [ERROR_CLAUSE, IFERROR_CLAUSE]
