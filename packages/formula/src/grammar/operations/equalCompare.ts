import { tokenMatcher } from 'chevrotain'
import { Equal, Equal2, NotEqual, NotEqual2 } from '../lexer'
import { OperatorType } from '../operator'

export const equalCompareOperator: OperatorType = {
  name: 'combine',
  expressionType: 'boolean',
  lhsType: 'any',
  rhsType: 'any',
  interpret: async ({ lhs, rhs, operator }) => {
    const lhsResult = lhs.result
    const rhsResult = rhs!.result

    if (tokenMatcher(operator, Equal) || tokenMatcher(operator, Equal2)) {
      return { result: lhsResult === rhsResult, type: 'boolean' }
    } else if (tokenMatcher(operator, NotEqual) || tokenMatcher(operator, NotEqual2)) {
      return { result: lhsResult !== rhsResult, type: 'boolean' }
    } else {
      throw new Error(`Unexpected operator ${operator.image}`)
    }
  },
  testCases: {
    successTestCases: [
      { definition: '=1 == 1', result: true },
      { definition: '=1 != 1', result: false },
      { definition: '=1 == 2', result: false },
      { definition: '=2 * 2 = 4', result: true },
      { definition: '=4 = 2 * 2', result: true },
      { definition: '=1 != 2', result: true },
      { definition: '=1 <> 2', result: true },
      { definition: '=1 = 1', result: true },
      { definition: '=1 = 1 > 3', label: 'compare chain 1', result: false },
      { definition: '=1 > 1 = 3', label: 'compare chain 2', result: false },
      { definition: '= 1 <> "a"', result: true },
      { definition: '= 4 > 3 = true', result: true },
      { definition: '= 2 * 2 > 3 != false', result: true },
      {
        definition: '= 3 = 1/0',
        result: { message: 'errors.interpret.runtime.division_by_zero', type: 'runtime' }
      }
    ],
    errorTestCases: [
      {
        definition: '= (1 = 1) > 3',
        errorType: 'type',
        errorMessage: ['errors.parse.mismatch.type', { expected: 'number', got: 'boolean' }]
      }
    ]
  }
}
