import { AnyTypeResult, BooleanResult, BaseFunctionClause, FunctionContext } from '../types'

export const IF = (
  ctx: FunctionContext,
  condition: BooleanResult,
  ifTrue: AnyTypeResult,
  ifFalse: AnyTypeResult
): AnyTypeResult => (condition.result ? ifTrue : ifFalse)

const IF_CLAUSE: BaseFunctionClause<any> = {
  name: 'IF',
  async: false,
  pure: true,
  persist: false,
  lazy: false,
  acceptError: false,
  effect: false,
  description: 'Returns the first argument if the condition is true, otherwise the second argument.',
  group: 'core',
  args: [
    {
      name: 'condition',
      type: 'boolean'
    },
    {
      name: 'ifTrue',
      type: 'any'
    },
    {
      name: 'ifFalse',
      type: 'any'
    }
  ],
  examples: [{ input: '=IF(true, 1, 2)', output: { type: 'number', result: 2 } }],
  returns: 'any',
  testCases: [],
  chain: false,
  reference: IF
}

export const CORE_LOGIC_CLAUSES: Array<BaseFunctionClause<'boolean' | any>> = [IF_CLAUSE]
